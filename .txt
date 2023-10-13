import React, { useState } from "react";

interface CampaignFormProps {
  onSubmit: (data: CampaignData) => void;
  onRetrieve: () => void;
}

export interface CampaignData {
  campaignName: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
}

const CampaignForm: React.FC<CampaignFormProps> = ({
  onSubmit,
  onRetrieve,
}) => {
  const [formData, setFormData] = useState<CampaignData>({
    campaignName: "",
    impressions: 0,
    clicks: 0,
    conversions: 0,
    spend: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-container">
      <h2>Campaign Data</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="input-group">
          <label>Campaign Name</label>
          <input
            type="text"
            name="campaignName"
            value={formData.campaignName}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label>Impressions</label>
          <input
            type="number"
            name="impressions"
            value={formData.impressions}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label>Clicks</label>
          <input
            type="number"
            name="clicks"
            value={formData.clicks}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label>Conversions</label>
          <input
            type="number"
            name="conversions"
            value={formData.conversions}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label>Spend</label>
          <input
            type="number"
            name="spend"
            value={formData.spend}
            onChange={handleInputChange}
          />
        </div>
        <div className="button-group">
          <button>Submit</button>
        </div>
        <button onClick={onRetrieve}>Retrieve & Calculate</button>
      </form>
    </div>
  );
};

export default CampaignForm;
