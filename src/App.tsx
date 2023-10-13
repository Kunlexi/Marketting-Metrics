// src/App.tsx
import React, { useState } from "react";
import CampaignForm from "./components/CampaignForm";
import MetricsDisplay from "./components/MetricsDisplay";
import { CampaignData } from "./components/CampaignForm";
import axios from "axios";
import "./App.css";

// axios.defaults.withCredentials = true;

function App() {
  const [campaignData, setCampaignData] = useState<CampaignData | null>(null);
  const [ctr, setCTR] = useState(0);
  const [cr, setCR] = useState(0);
  const [cpc, setCPC] = useState(0);
  const [cpa, setCPA] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: CampaignData) => {
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
        setError("Error storing data on the server.");
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
      <CampaignForm onSubmit={handleSubmit} onRetrieve={handleRetrieve} />
      {campaignData && (
        <MetricsDisplay
          data={campaignData}
          ctr={ctr}
          cr={cr}
          cpc={cpc}
          cpa={cpa}
          error={error}
        />
      )}
    </div>
  );
}

export default App;
