import { Config } from '@/server/config/Config';
import { HttpUtils } from '@/server/utils/HttpUtils';
import { CtxBalanceReq, IChatRes } from '@/api/types/demand';

const HOST = 'https://da-dev.web3idea.xyz';
const MODEL = 'v1';
const CIDNAME = 'X-Smartwallet-Cid';

// 老版的 暂时使用
// https://documenter.getpostman.com/view/27842833/2s9YC4WDPv
export function balanceApi(chainId: string, address: string) {
	return HttpUtils.post(`${HOST}/api/v1/balance`, {
		chainId,
		address
	});
}

// init会获取一个 cid
// chatApi
export function chatInitApi(): Promise<{
	status: number;
	body?: { cid: string };
}> {
	return HttpUtils.post(`${HOST}/v1/chat`, {
		model: MODEL
	});
}

// 每次请求之前需要调用 验证
export function vertifyWalletBalanceApi(param: CtxBalanceReq, header: { [CIDNAME]: string }) {
	return HttpUtils.postWithHeader(`${HOST}/v1/ctx`, param, header);
}

// header 添加 cid
export function chatApi(
	demand: string,
	header: { [CIDNAME]: string }
): Promise<{
	status: number;
	body?: IChatRes;
}> {
	return HttpUtils.postWithHeader(
		`${HOST}/v1/chat`,
		{
			model: MODEL,
			demand
		},
		header
	);
}
