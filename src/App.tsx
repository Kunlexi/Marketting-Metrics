import React, { useState } from "react";
import CampaignForm from "./components/CampaignForm";
import MetricsDisplay from "./components/MetricsDisplay";
import { CampaignData } from "./components/CampaignForm";
import axios from "axios";
import "./App.css";

function App() {
  const [campaignData, setCampaignData] = useState<CampaignData | null>(null);
  const [ctr, setCTR] = useState(0);
  const [cr, setCR] = useState(0);
  const [cpc, setCPC] = useState(0);
  const [cpa, setCPA] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: CampaignData) => {
    if (!data.campaignName) {
      console.log(data);
      setError("Campaign name cannot be empty.");
      return;
    } else if (data.clicks < 1) {
      setError("Clicks should be grather than 1");
      return;
    } else if (data.conversions < 1) {
      setError("Conversion must be greather than 1");
      return;
    } else if (data.impressions < 1) {
      setError("impression must be greater than 1");
      return;
    } else if (data.spend < 1) {
      setError("You cannot spend less than 1");
      return;
    }

    setError("");

    setCampaignData(data);
    console.log("Data", data);
    try {
      const response = await axios.post(
        "https://markettig-metrics.onrender.com/metrics",
        data
      );
      console.log("response", response);
      return response;
    } catch (error) {
      console.log("Data not submitted");
    }
  };

  const handleRetrieve = () => {
    let campaignName = campaignData?.campaignName;
    axios
      .get(`https://markettig-metrics.onrender.com/metrics/${campaignName}`)
      .then((data) => {
        console.log(data);
        calculateMetrics(data.data.metrics);
      })
      .catch((error) => {
        setError("Error retrieving data from the server.");
      });
  };

  const calculateMetrics = (data: any) => {
    setCTR(Math.round(data.clicks / data.impressions) * 100);
    setCR(Math.round(data.conversions / data.clicks) * 100);
    setCPC(Math.round(data.spend / data.clicks));
    setCPA(Math.round(data.spend / data.conversions));
  };

  return (
    <div className="App">
      <h1>Marketing Metrics Storage & Retrieval</h1>
      <CampaignForm submitData={handleSubmit} onRetrieve={handleRetrieve} />
      <div>
        <p className="error">{error}</p>
      </div>

      {campaignData && (
        <MetricsDisplay
          data={campaignData}
          ctr={ctr}
          cr={cr}
          cpc={cpc}
          cpa={cpa}
          error=""
        />
      )}
    </div>
  );
}

export default App;
