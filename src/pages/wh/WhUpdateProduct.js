import { useNavigate } from "react-router-dom";
import AllowAccessToPage from "../../store/AllowAccessToPage";

const WhUpdateProduct = () => {
  const navigate = useNavigate();
  if (AllowAccessToPage("wh")) {
    navigate("/wh/signin");
  }
  // your-logic-here

  return <></>;
};

export default WhUpdateProduct;
