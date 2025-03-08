import { useState } from "react";
import { VehicleFormData } from "./VehicleFormData";

const initialVehicleFormData: VehicleFormData = {
  plateNumber: "",
  brand: "",
  model: "",
  color: "",
  year: 0,
  clientFirstName: "",
  clientLastName: ""
};
  

function UpdateFormFields(): JSX.Element {
    const [formData, setFormData] = useState(initialVehicleFormData);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [submissionFailure, setSubmissionFailure] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        try {
          const response = await fetch("/update-vehicle", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
          });
    
          if (!response.ok) {
            throw new Error("Failed to add client");
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
        <label htmlFor="form-vehicle-platenumber">Enter vehicle's plate number:</label>
          <input 
            type="text" 
            value={formData.plateNumber} 
            className="form-control col short-field" 
            id="form-vehicle-platenumber" 
            required 
            onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })} />
          <p>
            Fill forms that you want to update, otherwise leave it blank:
          </p>
          <label htmlFor="form-vehicle-color">Enter vehicle's new color:</label>
          <input 
            type="text" 
            value={formData.color}
            className="form-control col short-field" 
            id="form-vehicle-color" 
            onChange={(e) => setFormData({ ...formData, color: e.target.value })} />
          <label htmlFor="form-vehicle-firstname">Enter new owner's first name:</label>
          <input 
            type="text" 
            value={formData.clientFirstName}
            className="form-control col long-field" 
            id="form-vehicle-firstname" 
            onChange={(e) => setFormData({ ...formData, clientFirstName: e.target.value })} />
          <label htmlFor="form-vehicle-lastname">Enter new owner's first name:</label>
          <input 
            type="text" 
            value={formData.clientLastName}
            className="form-control col long-field" 
            id="form-vehicle-lastname" 
            onChange={(e) => setFormData({ ...formData, clientLastName: e.target.value })} />
            <button type="submit" className="col-4 btn btn-primary">Submit</button>
        </form>

        {submissionSuccess && (
          <div className="alert alert-success" role="alert">
            Vehicle's data has been updated successfully!
          </div>
        )}
  
        {submissionFailure && (
          <div className="alert alert-danger" role="alert">
            Failed to update vehicle's data. Please try again.
          </div>
        )}
      </>
    )
  }

export default UpdateFormFields;