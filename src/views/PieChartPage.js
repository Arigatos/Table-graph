import PageTitle from "../components/sidebar/PageTitle";
import Pie from "../components/sidebar/Pie";

const PieChartPage = () => {
  return (
    <div className="pie-chart-age">
      <PageTitle title="Pie Chart Page" />

      <Pie />
    </div>
  );
};

export default PieChartPage;
