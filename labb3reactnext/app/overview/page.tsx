import "./page.module.css";
import Overviewbox from "../components/overviewbox";

const cats = ["savings", "loans", "income", "expense"];

export default function Overview({}) {
	return (
		<div id="overview-page">
			{cats.map((item, index) => {
				return <Overviewbox key={index} type={item} />;
			})}
			<div className="apibox">APIDATA</div>
		</div>
	);
}
