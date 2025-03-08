import { useState } from "react";
import { ParkingLotFormData } from "./ParkingLotFormData";

const initialParkingLotFormData: ParkingLotFormData = {
  name: "",
  address: "",
  pricePerAdditionalHour: 0,
  priceFirstHour: 0
};
  

function RemoveFormFields(): JSX.Element {
  const [formData, setFormData] = useState(initialParkingLotFormData);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionFailure, setSubmissionFailure] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("/delete-parking-lot", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to remove parking lot");
      } else {
        setSubmissionSuccess(true);
        setSubmissionFailure(false);
      }
    } catch (error: any) {
      setSubmissionSuccess(false);
      setSubmissionFailure(true);
      console.error(error.message);
    }
  }


  return (
    <>
      <form method="DELETE" onSubmit={handleSubmit}>
        <label htmlFor="form-parking-lot-name">Enter Parking Lot Name to be removed:</label>
        <input 
          type="text" 
          className="form-control col long-field" 
          id="form-parking-lot-name" 
          required
          onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <button type="submit" className="col-4 btn btn-primary">Submit</button>
      </form>

      {submissionSuccess && (
          <div className="alert alert-success" role="alert">
            Parking Lot removed successfully!
          </div>
        )}
  
        {submissionFailure && (
          <div className="alert alert-danger" role="alert">
            Failed to remove parking lot. Please try again.
          </div>
        )}
    </>
  )
}

  
export default RemoveFormFields;