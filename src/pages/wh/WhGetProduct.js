import { useNavigate } from "react-router-dom";
import AllowAccessToPage from "../../store/AllowAccessToPage";

const WhGetProduct = () => {
  const navigate = useNavigate();
  if (AllowAccessToPage("wh")) {
    navigate("signin");
  }
  // your-logic-here

  return <></>;
};

export default WhGetProduct;
