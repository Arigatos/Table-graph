import { Button } from "reactstrap";
import excel from "../assets/images/excel.png";

const ExcelExportButton = ({ onClick }) => {
  return (
    <Button className="excel-export-button" onClick={onClick}>
      Export .xlsx
      <img src={excel} alt="arrowDown" width="16px" height="16px" />
    </Button>
  );
};

export default ExcelExportButton;
