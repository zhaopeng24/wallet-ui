export enum EMessage {
	MSG = 'msg',
	SWAP = 'swap',
	TRANSFER = 'chain-internal-transfer',
	CROSSCHAIN = 'crossChainAbstraction'
}

export interface IConversations {
	content: string;
	msgType?: EMessage;
	response?: IResult["detail"];
}

export interface MessageItemProps extends IConversations {
	handleConfirmTx: (response: IResult["detail"]) => void;
	handleConfirmCrossChain: (response: IResult["detail"]) => void;
}
interface IOps {
	type: string;
	raw_response: string;
	source_chain: string;
	token: string;
	amount: string;
	receiver: string;
	target_chain: string;
}
export interface IResult {
	// category: EMessage;
	category: String;
	summary: String;
	detail: {
		reply: string;
		ops: IOps[];
	};
}
export enum Ecategory {
	CROSSCHAIN = 'crossChainAbstraction'
}
