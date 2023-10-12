import React from "react";
import { CampaignData } from "./CampaignForm";

interface MetricsDisplayProps {
  data: CampaignData;
  ctr: number;
  cr: number;
  cpc: number;
  cpa: number;
  error: string | null;
}

const MetricsDisplay: React.FC<MetricsDisplayProps> = ({
  data,
  ctr,
  cr,
  cpc,
  cpa,
  error,
}) => {
  return (
    <div className="results">
      <h2>Calculated Metrics</h2>
      {error && <p className="error">Error: {error}</p>}
      <p>Campaign Name: {data.campaignName}</p>
      <p>Click Through Rate (CTR): {ctr}%</p>
      <p>Conversion Rate (CR): {cr}%</p>
      <p>Cost Per Click (CPC): ${cpc}</p>
      <p>Cost Per Conversion (CPA): ${cpa}</p>
    </div>
  );
};

export default MetricsDisplay;
