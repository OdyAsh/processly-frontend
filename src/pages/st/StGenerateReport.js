import { useNavigate } from "react-router-dom";
import AllowAccessToPage from "../../store/AllowAccessToPage";

const StGenerateReport = () => {
  const navigate = useNavigate();
  if (AllowAccessToPage("st")) {
    navigate("signin");
  }

  return <></>;
};

export default StGenerateReport;
