export enum EMessage {
	MSG = 'msg',
	TRANSFER = 'transferAbstraction',
	CROSSCHAIN = 'crossChainAbstraction'
}

export interface IConversations {
	content: string;
	msgType?: EMessage;
	response?: IResult;
}

export interface MessageItemProps extends IConversations {
	handleConfirmTx: () => void;
	handleConfirmCrossChain: () => void;
}
interface IOps {
	type: string;
	source_chain: string;
	token: string;
	amount: string;
	receiver: string;
	target_chain: string;
}
export interface IResult {
	// category: EMessage;
	category: String;
	detail: {
		reply: string;
		ops: IOps[];
	};
}
export enum Ecategory {
	CROSSCHAIN = 'crossChainAbstraction'
}
