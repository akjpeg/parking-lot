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
    const [errors, setErrors] = useState({ plateNumber: "", color: "" });
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [submissionFailure, setSubmissionFailure] = useState(false);

    const validatePlate = (value: string) => {
      const plateRegex = /^[A-Z]{3}\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/i;
      if (!plateRegex.test(value.trim())) {
        setErrors((prev) => ({ ...prev, plateNumber: "Invalid plate number format. Use ABC1234 or ABC1A23"}));
      } else {
        setErrors((prev) => ({ ...prev, plateNumber: "" }));
      }
      setFormData((prev) => ({ ...prev, plateNumber: value }));
    }

    const validateColor = (value: string) => {
      const colorRegex = /^(?!\d+$)[A-Za-zÀ-ÖØ-öø-ÿ\s-]+$/;

      if (!colorRegex.test(value.trim())) {
        setErrors((prev) => ({ ...prev, color: "Color text must not contains numbers on it"}));
      } else {
        setErrors((prev) => ({ ...prev, color: "" }));
      }
      setFormData((prev) => ({ ...prev, color: value }));
    }
  
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

        if (response.status === 409) {
          setSubmissionSuccess(false);
          setSubmissionFailure(true);
          setErrors((prev) => ({
            ...prev,
            plateNumber: "This plate number is already registered.",
          }));
          return;
        }
  
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
            placeholder="ABC1234"
            required 
            onChange={(e) => validatePlate(e.target.value)} />
            { errors.plateNumber && <p style={{ color: "red" }}>{errors.plateNumber}</p>}
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
            onChange={(e) => validateColor(e.target.value)} />
            { errors.color && <p style={{ color: "red" }}>{errors.color}</p>}
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