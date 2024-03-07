import { Config } from '@/server/config/Config';
import { HttpUtils } from '@/server/utils/HttpUtils';
import { CtxBalanceReq, IChatRes } from '@/api/types/demand';

const HOST = 'https://demand-dev.web3idea.xyz';
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
	return HttpUtils.post(`${HOST}/api/v1/chat`, {
		modal: MODEL
	});
}

// 每次请求之前需要调用 验证
export function vertifyWalletBalanceApi(param: CtxBalanceReq, header: { cid: string }) {
	return HttpUtils.postWithHeader(`${HOST}/api/v1/ctx`, param, header);
}

// header 添加 cid
export function chatApi(
	demand: string,
	header: { cid: string }
): Promise<{
	status: number;
	body?: IChatRes;
}> {
	return HttpUtils.postWithHeader(
		`${HOST}/api/v1/chat`,
		{
			modal: MODEL,
			demand
		},
		header
	);
}
