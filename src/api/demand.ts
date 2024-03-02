import { Config } from '@/server/config/Config';
import { HttpUtils } from '@/server/utils/HttpUtils';

// https://documenter.getpostman.com/view/27842833/2s9YC4WDPv
export function balanceApi(chainId: string, address: string) {
	return HttpUtils.post(`${Config.BACKEND_API}/api/v1/balance`, {
		chainId,
		address
	});
}

export function demandApi(category: string, demand: string) {
	return HttpUtils.post(`${Config.BACKEND_API}/api/v1/demand`, {
		category,
		demand
	});
}

export function chatApi(modal: string, demand: string) {
	return HttpUtils.post(`${Config.BACKEND_API}/api/v1/chat`, {
		modal,
		demand
	});
}
