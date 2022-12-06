import { useNavigate } from "react-router-dom";
import AllowAccessToPage from "../../store/AllowAccessToPage";

const StHomePage = () => {
  const navigate = useNavigate();
  if (!AllowAccessToPage("st")) {
    navigate("/st/signin");
  }
  return (
    <div className="row-center-content">
      <h1 style={{ fontSize: "3vw", marginTop: "20vh" }}>
        Please choose an action from the navigation bar
      </h1>
    </div>
  );
};

export default StHomePage;
