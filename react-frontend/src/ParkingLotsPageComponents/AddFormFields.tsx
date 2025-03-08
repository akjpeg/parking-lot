import { useState } from "react";
import { ParkingLotFormData } from "./ParkingLotFormData";

const initialParkingLotFormData: ParkingLotFormData = {
  name: "",
  address: "",
  pricePerAdditionalHour: 0,
  priceFirstHour: 0
};
  

function AddFormFields(): JSX.Element {
    const [formData, setFormData] = useState(initialParkingLotFormData);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [submissionFailure, setSubmissionFailure] = useState(false);
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      try {
        const response = await fetch("/new-parking-lot", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });
  
        if (!response.ok) {
          throw new Error("Failed to add parking lot");
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
        <form method="POST" onSubmit={handleSubmit}>
          <label htmlFor="form-parking-lot-name">Enter Parking Lot Name:</label>
          <input 
            type="text" 
            value={formData.name} 
            className="form-control col long-field" 
            id="form-parking-lot-name" 
            required 
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <label htmlFor="form-parking-lot-address">Enter Parking Lot Address:</label>
          <input 
            type="text" 
            value={formData.address} 
            className="form-control col long-field" 
            id="form-parking-lot-address" 
            required 
            onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
          <label htmlFor="form-parking-lot-price-first-hour">Enter price of the first hour:</label>
          <input 
            type="number" 
            value={formData.priceFirstHour} 
            step="any" 
            className="form-control col short-field"
            id="form-parking-lot-price-first-hour" 
            required 
            onChange={(e) => setFormData({ ...formData, priceFirstHour: Number(e.target.value) })} />
          <label htmlFor="form-parking-lot-price-add-hour">Enter price of the each additional hour:</label>
          <input 
            type="number" 
            value={formData.pricePerAdditionalHour} 
            step="any" 
            className="form-control col short-field"
            id="form-parking-lot-price-add-hour" 
            required 
            onChange={(e) => setFormData({ ...formData, pricePerAdditionalHour: Number(e.target.value) })} />
          <button type="submit" className="col-4 btn btn-primary">Submit</button>
        </form>
  
        {submissionSuccess && (
          <div className="alert alert-success" role="alert">
            Parking Lot added successfully!
          </div>
        )}
  
        {submissionFailure && (
          <div className="alert alert-danger" role="alert">
            Failed to add parking lot. Please try again.
          </div>
        )}
      </>
    )
  }


export default AddFormFields;