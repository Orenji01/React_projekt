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

// Jag hade en tanke om att komprimera savingsItem, loanItem och cashFlowItem till ett interface som inehåller samtliga värden som förekommer och sätta "xx?" på de värden som inte förekommer över alla 3 datastrukturerna, alltså göra dem valfria, men det kändes som ett brott mot mänsklighten att medvetet använda interfaces som inte va avsedda för ändamålet, medveten om att transaktioner aldrig kommer inehålla ränta. I det fallet så hade man ju bara kunnat ha en gigantisk interface med alla eventuella värden som man använder över hela appen och bara göra alla värden valfria. Så här känns det som att DRY får ta ett baksäte.

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
