import {
	cashFlowItem,
	sourceItem,
	sourceResponse,
} from "@/app/types/overViewTypes";
import { cashflowResponse } from "@/app/types/overViewTypes";

export async function getOverviewData(
	source: string,
): Promise<cashFlowItem[] | sourceItem[] | undefined> {
	if (source === "income" || source === "expense") {
		const response = await fetch("./api/public/overview-data/get-cashflow");
		const res: cashflowResponse = await response.json();

		if (!res.ok) {
			console.log(res.message);
		}
		if (res.ok) {
			return res.data;
		}
	}

	const response = await fetch(`./api/public/overview-data/get-${source}`);

	console.log("status", response.status);

	const res: sourceResponse = await response.json();

	console.log("response on fetch", res.message);

	if (!res.ok) {
		console.log(res.message);
	}

	if (res.ok) {
		return res.data;
	}
}
