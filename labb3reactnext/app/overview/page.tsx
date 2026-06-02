import "./page.css";
import Overviewbox from "../components/overviewbox";

export default function Overview({}) {
	return (
		<div id="overview-page">
			<Overviewbox type="savings" />
			<Overviewbox type="loans" />
			<Overviewbox type="income" />
			<Overviewbox type="expenses" />
			<div className="apibox">APIDATA</div>
		</div>
	);
}
