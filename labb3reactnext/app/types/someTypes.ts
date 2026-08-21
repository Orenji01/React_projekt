import { ObjectId } from "mongodb";

export interface sourceItem {
	_id: string;
	name: string;
	amount: number;
	date?: string;
}

export interface withId {
	_id: ObjectId;
}

export interface dataResponse<items> {
	ok: boolean;
	message: string;
	data?: items;
}
export interface savingsItem {
	_id: ObjectId;
	id: number;
	name: string;
	amount: number;
	perMonth: number;
	interest: number;
	inflation: number;
	targetDate: string;
	startDate: string;
}
export interface loanItem {
	_id?: ObjectId;
	id: number;
	name: string;
	amount: number | null;
	perMonth: number | null;
	interest: number | null;
	inflation: boolean;
	deductions: boolean;
	targetDate: string;
	startDate: string;
}
export interface cashFlowItem {
	_id: ObjectId;
	id: number;
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
