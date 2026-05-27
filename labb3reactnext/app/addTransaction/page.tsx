"use client";
import { useEffect, useState } from "react";

interface responseData {
	ok: boolean;
	message: string;
}

export default function AddTransaction({}) {
	const [data, setData] = useState<responseData | null>(null);

	async function getData() {
		const response = await fetch("/api/public/save_post");
		const res: responseData = await response.json();
		setData(res);
		console.log(res.message);
	}

	useEffect(() => {
		getData();
	}, []);

	return (
		<div>
			Bästa sidan ever
			{<p>{data && data.message}</p>}
		</div>
	);
}
