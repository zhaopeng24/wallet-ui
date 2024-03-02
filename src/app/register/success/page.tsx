"use client";
import { Button } from "@nextui-org/button";

import { useRouter } from "next/navigation";

const Success = () => {
  const router = useRouter();
  function handleLogin() {
    router.replace("/login");
  }
  return (
    <div className="h-full bg-[url(/imgs/bg.png)]">
      <div className="mian p-8 text-center">
        <img
          className="mt-12 mx-auto w-[229px] h-[251px]"
          src="/imgs/illus.png"
          alt=""
        />
        <img
          className="mt-12 mx-auto w-[249px] h-[26px] mb-2"
          src="/imgs/Register successfully.png"
          alt=""
        />
        <div className="text-xs opacity-50">
          Now you can have registered with both password in your device and
          email in the wallet server and decentralized storage via MPC.
        </div>
      </div>
      <div className="p-8 text-xs">
        <Button
          onClick={handleLogin}
          fullWidth
          size="lg"
          className="bg-[#819DF5] rounded-3xl"
        >
          Login
        </Button>
      </div>
    </div>
  );
};
export default Success;
