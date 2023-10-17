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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const clearSuccessMessage = () => {
    setSuccessMessage(null);
  };

  const handleSubmit = async (data: CampaignData) => {
    if (!data.campaignName) {
      setError("Campaign name cannot be empty.");
      setSuccessMessage(null);
      return;
    } else if (data.clicks < 1) {
      setError("Clicks should be greater than 1");
      setSuccessMessage(null);
      return;
    } else if (data.conversions < 1) {
      setError("Conversion must be greater than 1");
      setSuccessMessage(null);
      return;
    } else if (data.impressions < 1) {
      setError("Impression must be greater than 1");
      setSuccessMessage(null);
      return;
    } else if (data.spend < 1) {
      setError("You cannot spend less than 1");
      setSuccessMessage(null);
      return;
    }

    setError("");
    setSuccessMessage("Campaign Data submitted successfully");
    // setSuccessMessage("");

    setCTR(0);
    setCR(0);
    setCPC(0);
    setCPA(0);

    setCampaignData(data);
    console.log("Data", data);

    try {
      const response = await axios.post(
        "https://markettig-metrics.onrender.com/metrics",
        data
      );
      const metrics = response.data;
      setCTR(metrics.ctr);
      setCR(metrics.cr);
      setCPC(metrics.cpc);
      setCPA(metrics.cpa);
    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  const handleRetrieve = () => {
    let campaignName = campaignData?.campaignName;
    axios
      .get(`https://markettig-metrics.onrender.com/metrics/${campaignName}`)
      .then((data) => {
        console.log(data);
        const successMessage = `Campaign data retrieved successfully`;
        setError(null);
        setSuccessMessage(successMessage);
        calculateMetrics(data.data.metrics);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setError("");
          const errorMessage = `Campaign Name '${campaignName}' already added.`;
          setSuccessMessage(errorMessage);
        } else {
          setError("Error retrieving data from the server.");
          setSuccessMessage(null);
        }
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
      <CampaignForm
        submitData={handleSubmit}
        onRetrieve={handleRetrieve}
        error={error}
        successMessage={successMessage}
        setSuccessMessage={setSuccessMessage}
        clearSuccessMessage={clearSuccessMessage}
        setError={() => {}}
      />

      <div>{error && <div className="error">{error}</div>}</div>

      <div>
        <p className="success">{successMessage}</p>
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
