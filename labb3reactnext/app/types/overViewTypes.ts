import { ObjectId } from "mongodb";

export interface sourceResponse {
	ok: boolean;
	message: string;
	data: sourceItem[] | [];
}
export interface sourceItem {
	_id: string;
	name: string;
	amount: number;
	date?: string;
}

// Cash flow types:
export interface cashflowResponse {
	ok: boolean;
	message: string;
	data: cashFlowItem[] | [];
}

export interface cashFlowItem {
	_id: string;
	type: string;
	category: string;
	repeating: boolean;
	name: string;
	amount: number;
	date: string;
	created: string;
}

export interface overViewObject {
	_id: ObjectId;
	name: string;
	amount: number;
}
