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

export interface savingsResponse {
	ok: boolean;
	message: string;
	data: savingsItem[] | [];
}

export interface savingsItem {
	_id: string;
	name: string;
	amount: number;
	perMonth: number;
	interest: number;
	inflation: number;
	targetDate: string;
	startDate: string;
}

export interface loansResponse {
	ok: boolean;
	message: string;
	data: loanItem[] | [];
}

export interface loanItem {
	id: number;
	name: string;
	amount: string;
	repayAmount: string;
	interest: string | 0;
	useInflation: boolean;
	useDeductions: boolean;
	targetDate: string;
	startDate: string;
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
