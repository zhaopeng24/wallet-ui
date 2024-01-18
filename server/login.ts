
import { Config } from '@/server/config/Config';
import { HttpUtils } from '@/server/utils/HttpUtils';


export function Login (email: string, code: string) {
    return HttpUtils.post(`${Config.BACKEND_API}/sw/user/login`, {
        email,
        code
    })
}