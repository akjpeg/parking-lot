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
  

function AddFormFields(): JSX.Element {
    const [formData, setFormData] = useState(initialVehicleFormData);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [submissionFailure, setSubmissionFailure] = useState(false);
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      
      try {
        const response = await fetch("/new-vehicle", {
          method: "POST",
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
    };
  
    return (
      <>
        <form method="POST" onSubmit={handleSubmit}>
          <label htmlFor="form-vehicle-platenumber">Enter vehicle plate number:</label>
          <input 
            type="text" 
            value={formData.plateNumber} 
            className="form-control col short-field" 
            id="form-vehicle-platenumber" 
            required 
            onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })} />
          <label htmlFor="form-vehicle-brand">Enter vehicle's brand:</label>
          <input 
            type="text" 
            value={formData.brand} 
            className="form-control col short-field" 
            id="form-vehicle-brand" 
            required 
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })} />
          <label htmlFor="form-vehicle-model">Enter vehicle's model:</label>
          <input 
            type="text" 
            value={formData.model}
            className="form-control col short-field" 
            id="form-vehicle-model" 
            required 
            onChange={(e) => setFormData({ ...formData, model: e.target.value })} />
          <label htmlFor="form-vehicle-color">Enter vehicle's color:</label>
          <input 
            type="text" 
            value={formData.color}
            className="form-control col short-field" 
            id="form-vehicle-color" 
            onChange={(e) => setFormData({ ...formData, color: e.target.value })} />
          <label htmlFor="form-vehicle-year">Enter vehicle's year:</label>
          <input 
            type="number" 
            value={formData.year}
            className="form-control col short-field" 
            id="form-vehicle-year" 
            onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })} />
          <br />
          <label htmlFor="form-vehicle-firstname">Enter owner's first name:</label>
          <input 
            type="text" 
            value={formData.clientFirstName}
            className="form-control col long-field" 
            id="form-vehicle-firstname" 
            onChange={(e) => setFormData({ ...formData, clientFirstName: e.target.value })} />
          <label htmlFor="form-vehicle-lastname">Enter owner's last name:</label>
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
            Client's vehicle has been added successfully!
          </div>
        )}
  
        {submissionFailure && (
          <div className="alert alert-danger" role="alert">
            Failed to add client's vehicle. Please try again.
          </div>
        )}
      </>
    )
  }


export default AddFormFields;