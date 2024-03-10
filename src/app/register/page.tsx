"use client";
import Header from "@/components/Header";
import PasswordInput from "@/components/PasswordInput";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useContext, useEffect, useRef, useState } from "react";
import { LoadingContext } from "@/app/providers";
import EmailInput from "@/components/EmailInput";
import { EmailPattern } from "@/consts/pattern";
import { Global } from "@/server/Global";
import { Register as makeRegister, SendEmailCode } from "@/api/auth";
import { JSONBigInt } from "@/server/js/common_utils";
import { parseNumbers } from "@/server/js/mpc_wasm_utils";
import { useRouter } from "next/navigation";
import Toast from "@/utils/toast";

const CountdownTime = 60;

const Register = () => {
  const router = useRouter();

  const [password, setPasswork] = useState("");
  const [surePassword, setSurePasswork] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const [countdownTime, setCountdownTime] = useState(CountdownTime);
  const canSend = countdownTime === CountdownTime;
  const timer = useRef<any>();

  const { setLoading } = useContext(LoadingContext);

  function handleRegisterBtnClick() {
    if (Global.keyManage.existLocalStorageKey()) {
      Toast("You have already signed up please login directly.");
      return;
    }
    if (password !== surePassword) {
      Toast("The two passwords are inconsistent");
      return;
    }
    if (!email) {
      Toast("Please enter your email address");
      return;
    }
    if (!code) {
      Toast("Please enter code");
      return;
    }
    signUp();
  }

  function handleLogin() {
    router.replace("/login");
  }

  const signUp = async () => {
    // 1.拿到密码，邮箱，调用注册接口
    setLoading(true, "registering...");
    const _password = password.trim();
    const _email = email.trim();
    const res = await makeRegister(_email, code);
    if (res.body["code"] != 200) {
      Toast(res.body["message"] || "Register error");
      setLoading(false);
      return;
    }
    Global.authorization = res.body.result;
    // 2.初始化私钥
    setLoading(true, "initialize private key...");
    const keys = await Global.account.generateKeys();
    if (keys == null || keys === "") {
      Toast("Generate MPC keys error");
      setLoading(false);
      return;
    }
    const key1 = JSONBigInt.stringify(parseNumbers(keys["p1JsonData"]));
    const key2 = JSONBigInt.stringify(parseNumbers(keys["p2JsonData"]));
    const key3 = JSONBigInt.stringify(parseNumbers(keys["p3JsonData"]));
    Global.tempLocalPassword = _password;
    // 3.key1保存到本地
    if (
      !Global.keyManage.saveKey2LocalStorage(key1, Global.tempLocalPassword)
    ) {
      Toast("Save key to local storage error");
      setLoading(false);
      return;
    }
    // 4.key3保存到IPFS，拿到hash
    const save2IPFS = await Global.keyManage.saveKey2DecentralizeStorage(
      Global.authorization,
      key3,
      Global.tempLocalPassword
    );
    if (save2IPFS.status != 200) {
      Toast("Save key to decentralize storage error");
      setLoading(false);
      return;
    }
    // 5.拿到hash + key2给到后端服务器
    const save2Server = await Global.keyManage.saveKey2WalletServer(
      Global.authorization,
      key2,
      save2IPFS.body["result"]["result"]
    );
    if (save2Server.body["code"] != 200) {
      Toast(
        "Save MPC key to wallet server error. Details: " +
          save2Server.body["message"]
      );
      setLoading(false);
      return;
    }
    setLoading(false);
    // 8.跳转到创建成功页面
    router.replace("/register/success");
    // todo 创建成功
  };

  async function handleSendCode() {
    if (!email) {
      // 邮箱不能为空
      Toast("Please enter your email address");
      return;
    }
    if (email.match(EmailPattern)) {
      setLoading(true, "Sending Code...");
      const res = await SendEmailCode(email);
      setLoading(false);
      if (res.body.code == 200) {
        setCountdownTime(CountdownTime - 1);
        if (timer.current) {
          clearInterval(timer.current);
          timer.current = null;
        }
        timer.current = setInterval(() => {
          setCountdownTime((t) => {
            if (t <= 1) {
              clearInterval(timer.current);
              return CountdownTime;
            }
            return t - 1;
          });
        }, 1000);
      }
    } else {
      Toast("Please enter the correct email address");
      return;
    }
  }

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
    };
  }, []);

  return (
    <div className="h-full bg-[url(/imgs/bg.png)]">
      <Header title="Sign Up" />
      <div className="mian p-8">
        <PasswordInput
          value={password}
          onValueChange={setPasswork}
          className="mb-6"
          label="Password"
        />
        <PasswordInput
          passwordType="comfirm"
          firstPassword={password}
          value={surePassword}
          onValueChange={setSurePasswork}
          className="mb-6"
          label="Confirm Password"
        />
        <EmailInput
          value={email}
          onValueChange={setEmail}
          label="Email"
          onClear={() => setEmail("")}
          className="mb-6"
        />
        <div className="flex items-center">
          <Input
            isClearable
            type="text"
            value={code}
            label="Code"
            variant="bordered"
            onClear={() => setCode("")}
            className="flex-1"
            maxLength={6}
            onValueChange={setCode}
          />
          <Button
            onClick={handleSendCode}
            size="lg"
            className="w-32 text-white p-7 ml-4 bg-[#819DF5]"
            isDisabled={!canSend}
          >
            {countdownTime == CountdownTime ? "Send" : `${countdownTime} s`}
          </Button>
        </div>
      </div>
      <div className="p-8 text-xs">
        <div className="mb-4 text-center opacity-80">
          By proceeding, you agree to our{" "}
          <span className="text-white font-bold">Term and Conditions</span>
        </div>

        <div className="mb-4 text-center">
          <span className="opacity-50">Existing account? </span>
          <span onClick={handleLogin} className="text-white">
            Log In
          </span>
        </div>

        <Button
          fullWidth
          size="lg"
          className="bg-[#819DF5] rounded-3xl"
          onClick={handleRegisterBtnClick}
        >
          Register
        </Button>
      </div>
    </div>
  );
};
export default Register;
