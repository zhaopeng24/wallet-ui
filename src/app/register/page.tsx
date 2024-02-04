"use client";
import Header from "@/components/Header";
import PasswordInput from "@/components/PasswordInput";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useContext, useEffect, useRef, useState } from "react";
import { LoadingContext } from "@/app/providers";
import EmailInput from "@/components/EmailInput";
import { EmailPattern } from "@/consts/pattern";
import { SendEmailCode } from "@/server/register";
import toast, { Toaster } from "react-hot-toast";
import { Global } from "@/server/Global";
import { Register as makeRegister } from "@/server/register";
import { MPCManageAccount } from "@/server/account/MPCManageAccount";
import { JSONBigInt } from "@/server/js/common_utils";
import { parseNumbers } from "@/server/js/mpc_wasm_utils";

const CountdownTime = 60;

const Register = () => {
  const [password, setPasswork] = useState("");
  const [surePassword, setSurePasswork] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const [countdownTime, setCountdownTime] = useState(CountdownTime);
  const canSend = countdownTime === CountdownTime;
  const timer = useRef<any>();

  const { setLoading } = useContext(LoadingContext);

  function handleRegisterBtnClick() {
    if (Global.account?.existLocalStorageKey()) {
      toast(
        (t) => (
          <span className="text-xs text-[#1C2F04]">
            You have already signed up please login directly.
          </span>
        ),
        { style: { borderRadius: "10px", marginTop: "20px" }, duration: 2000 }
      );
      return;
    }
    // 检查值
    console.log(password, surePassword, email, code);
    if (password !== surePassword) {
      // 两次密码不一致
      return;
    }
    if (!email) {
      // 邮箱不能为空
      toast(
        (t) => (
          <span className="text-xs text-[#1C2F04]">
            Please enter your email address
          </span>
        ),
        { style: { borderRadius: "10px", marginTop: "20px" }, duration: 2000 }
      );
      return;
    }
    if (!code) {
      // 验证码不能为空
      toast(
        (t) => (
          <span className="text-xs text-[#1C2F04]">Please enter code</span>
        ),
        { style: { borderRadius: "10px", marginTop: "20px" }, duration: 2000 }
      );
      return;
    }
    signUp();
    // 分步骤调用接口
  }

  const signUp = async () => {
    console.log(Global.account, "Global.account");
    // 1.拿到密码，邮箱，调用注册接口
    setLoading(true, "registering...");
    const _password = password.trim();
    const _email = email.trim();
    const res = await makeRegister(_email, code);
    console.log("res:", res);
    if (res.body["code"] != 200) {
      // message.error("Register error. Details: " + res.body["message"])
      toast(
        (t) => (
          <span className="text-xs text-[#1C2F04]">{res.body["message"]}</span>
        ),
        { style: { borderRadius: "10px", marginTop: "20px" }, duration: 2000 }
      );
      setLoading(false);
      return;
    }
    Global.authorization = res.body.result;
    // 2.初始化私钥
    setLoading(true, "initialize private key...");
    const mpc = Global.account as MPCManageAccount;
    const keys = await mpc.generateKeys();
    if (keys == null || keys === "") {
      // message.error("Generate MPC keys error");
      setLoading(false);
      return;
    }
    const key1 = JSONBigInt.stringify(parseNumbers(keys["p1JsonData"]));
    const key2 = JSONBigInt.stringify(parseNumbers(keys["p2JsonData"]));
    const key3 = JSONBigInt.stringify(parseNumbers(keys["p3JsonData"]));
    console.log(key1, key2, key3);
    Global.tempLocalPassword = _password;
    // 3.key1保存到本地
    if (!mpc.saveKey2LocalStorage(key1, Global.tempLocalPassword)) {
      // message.error("Save key to local storage error")
      setLoading(false);
      return;
    }
    // 4.key3保存到IPFS，拿到hash
    const save2IPFS = await mpc.saveKey2DecentralizeStorage(
      key3,
      Global.tempLocalPassword
    );
    if (save2IPFS.status != 200) {
      //message.error("Save key to decentralize storage error")
      setLoading(false);
      return;
    }
    // 5.拿到hash + key2给到后端服务器
    const save2Server = await mpc.saveKey2WalletServer(
      key2,
      save2IPFS.body["result"]["result"]
    );
    if (save2Server.body["code"] != 200) {
      // message.error("Save MPC key to wallet server error. Details: " + save2Server.body["message"])
      setLoading(false);
      return;
    }
    // if (!mpc.saveKeyThirdHash2LocalStorage(save2IPFS.body["result"]["result"], Global.tempLocalPassword)) {
    //   // message.error("Save third key hash to local storage error")
    //   // messageApi.destroy();
    //   return;
    // }

    // 6.计算MPC地址
    setLoading(true, "calculate MPC address...");
    // const address = await mpc.getOwnerAddress()
    // let account = ethers.Wallet.createRandom();
    // await Global.account.initAccount(account.privateKey);
    // Global.account.isLoggedIn = true;

    // 7.根据MPC地址计算钱包地址
    await mpc.registerInitMpc();
    // let params = {
    //   "address": address
    // }
    // let tx = await Global.account.createSmartContractWalletAccount(params);
    // await TxUtils.waitForTransactionUntilOnChain(Global.account.ethersProvider, tx.body["result"]);
    setLoading(false);
    // todo 创建成功
  };

  async function handleSendCode() {
    console.log(email);
    if (!email) {
      // 邮箱不能为空
      toast(
        (t) => (
          <span className="text-xs text-[#1C2F04]">
            Please enter your email address
          </span>
        ),
        { style: { borderRadius: "10px", marginTop: "20px" }, duration: 2000 }
      );
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
      // 邮箱格式不正确
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
        <Button
          fullWidth
          size="lg"
          className="bg-[#819DF5] rounded-3xl"
          onClick={handleRegisterBtnClick}
        >
          Register
        </Button>
      </div>
      <Toaster />
    </div>
  );
};
export default Register;
