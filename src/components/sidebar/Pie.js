import { useSelector } from "react-redux";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import HighchartsMore from "highcharts/highcharts-more";
import * as XLSX from "xlsx/xlsx.mjs";
import download from "downloadjs";

import ExcelExportButton from "./ExcelExportButton";
import { selectPieChartData } from "../../store/characters/selectors";

HighchartsMore(Highcharts);

Highcharts.setOptions({
  colors: [
    "#50B432",
    "#ED561B",
    "#DDDF00",
    "#24CBE5",
    "#64E572",
    "#FF9655",
    "#FFF263",
    "#6AF9C4",
  ],
});

const Pie = () => {
  const parsedData = useSelector(selectPieChartData);

  const exportToXlsx = () => {
    // Create an array of objects with 'name', 'y', and 'films' properties
    const formattedData = parsedData.map(({ name, y, films }) => ({
      name,
      y,
      films: films.join(", "),
    }));

    // Create a new worksheet and set header row with styles
    const worksheet = XLSX.utils.aoa_to_sheet([
      ["Name", "Films Participated in", "Films"],
      ...formattedData.map(({ name, y, films }) => [name, y, films]),
    ]);
    XLSX.utils.format_cell(worksheet["A1"], {
      font: { bold: true },
      fill: { bgColor: { indexed: 64 }, fgColor: { rgb: "c1c1c1" } },
    });
    XLSX.utils.format_cell(worksheet["B1"], {
      font: { bold: true },
      fill: { bgColor: { indexed: 64 }, fgColor: { rgb: "c1c1c1" } },
    });
    XLSX.utils.format_cell(worksheet["C1"], {
      font: { bold: true },
      fill: { bgColor: { indexed: 64 }, fgColor: { rgb: "c1c1c1" } },
    });

    worksheet["!cols"] = [{ wpx: 150 }, { wpx: 120 }, { wpx: 200 }];

    // Create a workbook and add the worksheet to it
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Pie Chart Data");

    // Convert the workbook to a binary string and download it as a file
    const file = XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    download(
      file,
      "pie-chart-data.xlsx",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
  };

  const config = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Characters Pie Chart",
    },
    plotOptions: {
      pie: {
        allowPointSelect: false,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.y}",
        },
      },
    },
    tooltip: {
      formatter: function () {
        let films = parsedData.find((d) => d.name === this.point.name).films;
        return (
          "<b>" +
          this.point.name +
          "</b>: " +
          this.point.percentage.toFixed(2) +
          "%<br/>" +
          films.join(", ")
        );
      },
      pointFormat: "<b>{point.name}: {point.percentage:.1f}%</b>",
    },
    series: [
      {
        name: "List of films",
        colorByPoint: true,
        data: parsedData,
      },
    ],
  };

  return (
    <>
      <ExcelExportButton onClick={exportToXlsx} />
      <HighchartsReact highcharts={Highcharts} options={config} />
    </>
  );
};

export default Pie;
