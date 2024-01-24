import { Config } from "@/server/config/Config";
import { HttpUtils } from "@/server/utils/HttpUtils";

export function Register(email: string, code: string) {
  return HttpUtils.post(Config.BACKEND_API + "/sw/user/register", {
    email,
    code,
  });
}

// 给邮箱发送验证码
export function SendEmailCode(email: string) {
  // https://documenter.getpostman.com/view/27842833/2s9YC4WDUC
  return HttpUtils.post(`${Config.BACKEND_API}/sw/user/email-code`, {
    email: email,
  });
}
