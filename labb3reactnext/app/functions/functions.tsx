import { sourceResponse } from "@/app/types/overViewTypes";

export async function getOverviewData(source: string) {
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
