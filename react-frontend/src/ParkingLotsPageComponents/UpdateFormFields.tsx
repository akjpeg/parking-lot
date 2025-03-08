import { useState } from "react";
import { ParkingLotFormData } from "./ParkingLotFormData";

const initialParkingLotFormData: ParkingLotFormData = {
    name: "",
    address: "",
    pricePerAdditionalHour: 0,
    priceFirstHour: 0
  };

function UpdateFormFields(): JSX.Element {
    const [formData, setFormData] = useState(initialParkingLotFormData);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [submissionFailure, setSubmissionFailure] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        try {
          const response = await fetch("/update-parking-lot", {
            method: "PUT",
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
        <form method="PUT" onSubmit={handleSubmit}>
            <label htmlFor="form-parking-lot-name">Enter Parking Lot Name to be updated:</label>
            <input 
                type="text" 
                className="form-control col long-field" 
                id="form-parking-lot-name" 
                required
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <p>
            Fill forms that you want to update, otherwise leave it blank:
            </p>
            <label htmlFor="form-parking-lot-address">Enter new Parking Lot Address:</label>
            <input 
                type="text" 
                className="form-control col long-field" 
                id="form-parking-lot-address" 
                onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
            <label htmlFor="form-parking-lot-price-first-hour">Enter new price of the first hour:</label>
            <input 
                type="number" 
                step="any" 
                className="form-control col short-field"
                id="form-parking-lot-price-first-hour" 
                onChange={(e) => setFormData({ ...formData, priceFirstHour: Number(e.target.value) })} />
            <label htmlFor="form-parking-lot-price-add-hour">Enter new price of the each additional hour:</label>
            <input 
                type="number" 
                step="any" 
                className="form-control col short-field"
                id="form-parking-lot-price-add-hour" 
                onChange={(e) => setFormData({ ...formData, pricePerAdditionalHour: Number(e.target.value) })} />
            <button type="submit" className="col-4 btn btn-primary">Submit</button>
        </form>

        {submissionSuccess && (
          <div className="alert alert-success" role="alert">
            Parking Lot updated successfully!
          </div>
        )}
  
        {submissionFailure && (
          <div className="alert alert-danger" role="alert">
            Failed to update parking lot. Please try again.
          </div>
        )}
      </>
    )
  }

export default UpdateFormFields;