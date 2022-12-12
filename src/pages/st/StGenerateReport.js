import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import AuthContext from "../../store/authContext";
import TextInput from "./../../UI/form/TextInput";
import OrdersList from "../../components/orders/OrdersList";
import Loading from "../../components/media/Loading";
import { useEffect } from "react";

const StGenerateReport = () => {
  const [report, setReport] = useState({
    // to do: change
    totalRevenue: 100,
    numOfOrders: 5,
    mostSoldProduct: "flag",
    highestPurchaser: "a@a.com",
  });
  const [isLoading, setIsLoading] = useState(true);
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const content = (isLoading, report) => {
    if (isLoading) {
      return (
        <div class="row-center-content">
          <Loading />
        </div>
      );
    }
    return (
      <div className="generate-report">
        <div className="top">
          <div className="grid">
            <div className="report-card">
              <p style={{ fontWeight: "bold" }}>Weekly Revenue:</p>
              <p>{report.totalRevenue}</p>
            </div>
            <div className="report-card">
              <p style={{ fontWeight: "bold" }}>Weekly Number of Orders:</p>
              <p>{report.numOfOrders}</p>
            </div>
            <div className="report-card">
              <p style={{ fontWeight: "bold" }}>Most Sold Product This Week:</p>
              <p>{report.mostSoldProduct}</p>
            </div>
            <div className="report-card">
              <p style={{ fontWeight: "bold" }}>Highest Purchase This Week:</p>
              <p>{report.highestPurchaser}</p>
            </div>
          </div>
        </div>

        <div className="bottom"></div>
      </div>
    );
  };

  useEffect(() => {
    const fetchAbortController = new AbortController();
    const fetchSignal = fetchAbortController.signal;

    const fetchReport = async () => {
      try {
        // send an HTTP GET request to the get report route we defined in our Express REST API
        const response = await fetch(
          "https://processly101.herokuapp.com/bmanagment/report", // fetches today's report
          {
            signal: fetchSignal,
          }
        );
        // parse the response content to JSON and store it into data variable
        const data = await response.json();
        await sleep(1000);
        // If there is an HTTP error (the response is NOT ok), throw the error message we get from the REST API.
        if (!response.ok) {
          // remember, in our REST API we return an error message in our response that has the key 'error'.
          throw Error(data.error);
        }

        // we now need to set our component state to the report we fetched
        setReport(data);

        // after we set the report' state, let's set the loading state to false
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    // fetchReport(); // to do: uncomment and remove line below
    setIsLoading(false);
    return () => {
      fetchAbortController.abort();
    };
  }, []);

  return <div>{content(isLoading, report)}</div>;
};

export default StGenerateReport;
