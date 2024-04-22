"use client";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  function handleLogin() {
    router.replace("/login");
  }
  function handleRegister() {
    router.replace("/register");
  }
  function isRegistered() {
  // 如果本地保存的key不为空，则表示已注册过账号
  // 否则表示未注册过账号
  const result = localStorage.getItem('mpc_key_local');
  return Boolean(result);
}
  return (
    <div className="container h-full bg-[url(/imgs/home-bg.png)] bg-cover">
      <div className="main p-8 mb-32">
        <img className="w-40 mb-16" src="/imgs/home-logo.png" alt="" />
        <img className="w-44 mb-6" src="/imgs/home-text1.png" alt="" />
        <img className="w-56" src="/imgs/home-text2.png" alt="" />
      </div>
      <div className="flex px-8 opacity-80">
        <div className="flex-1 text-center text-xs">
          <img
            className="inline-block w-9 h-9"
            src="/imgs/home-demand.png"
            alt=""
          />
          <div>Demand</div>
          <div>Abstraction</div>
        </div>
        <div className="flex-1 text-center text-xs">
          <img
            className="inline-block w-9 h-9"
            src="/imgs/home-demand.png"
            alt=""
          />
          <div>Account</div>
          <div>Abstraction</div>
        </div>
        <div className="flex-1 text-center text-xs">
          <img
            className="inline-block w-9 h-9"
            src="/imgs/home-demand.png"
            alt=""
          />
          <div>Automated</div>
          <div>AI trading bot</div>
        </div>
      </div>
      <div className="p-8 text-xs">
        {isRegistered()?
        <Button
          fullWidth
          size="lg"
          onClick={handleLogin}
          className="text-xs bg-white rounded-3xl text-black font-semibold mb-5 "
        >
          Login
        </Button>:null}
        <Button
          fullWidth
          size="lg"
          onClick={handleRegister}
          className="text-xs bg-[#819DF5] rounded-3xl font-semibold"
        >
          Register
        </Button>
      </div>
    </div>
  );
};
export default Home;
