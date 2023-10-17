import React, { useState } from "react";

interface CampaignFormProps {
  submitData: (data: CampaignData) => void;
  onRetrieve: () => void;
  error: string | null;
  setError: (error: string | null) => void; // Fix for problem 1
  successMessage: string | null;
  setSuccessMessage: (message: string | null) => void;
  clearSuccessMessage: () => void;
}

export interface CampaignData {
  campaignName: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
}

const CampaignForm: React.FC<CampaignFormProps> = ({
  submitData,
  onRetrieve,
  setError,
  setSuccessMessage,
  clearSuccessMessage,
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await submitData(formData);

      setFormData({
        campaignName: "",
        impressions: 0,
        clicks: 0,
        conversions: 0,
        spend: 0,
      });

      setError(null);
      setSuccessMessage("Data submitted successfully");
      clearSuccessMessage();
    } catch (error) {
      setError((error as any)?.response?.data?.error || "Data not submitted");
    }
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
      </form>
      <button onClick={onRetrieve}>Retrieve & Calculate</button>
    </div>
  );
};

export default CampaignForm;
