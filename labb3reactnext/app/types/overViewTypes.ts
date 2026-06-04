export interface sourceResponse {
	ok: boolean;
	message: string;
	data: sourceItem[] | undefined;
}
export interface sourceItem {
	_id: string;
	name: string;
	amount: number;
	date?: string;
}
