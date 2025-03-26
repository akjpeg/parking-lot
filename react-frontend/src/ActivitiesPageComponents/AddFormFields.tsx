import { useState } from "react";
import { ActitivyFormData } from "./ActivityFormData";

const initialActivityFormData: ActitivyFormData = {
  parkingLotActivity: 0,
  parkingLotName: "",
  clientFirstName: "",
  clientLastName: "",
  vehiclePlateNumber: ""
};
  

function AddFormFields(): JSX.Element {
    const [formData, setFormData] = useState(initialActivityFormData);
    const [errors, setErrors] = useState({ vehiclePlateNumber: "" });
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [submissionFailure, setSubmissionFailure] = useState(false);

    const validatePlate = (value: string) => {
      const plateRegex = /^[A-Z]{3}\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/i;
      if (!plateRegex.test(value.trim())) {
        setErrors((prev) => ({ ...prev, vehiclePlateNumber: "Invalid plate number format. Use ABC1234 or ABC1A23"}));
      } else {
        setErrors((prev) => ({ ...prev, vehiclePlateNumber: "" }));
      }
      setFormData((prev) => ({ ...prev, vehiclePlateNumber: value }));
    }
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      
      try {
        const response = await fetch("/new-activity", {
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
            vehiclePlateNumber: "A vehicle with this plate number is already parked.",
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
          <label htmlFor="form-activity-parkinglot">Enter parking lot name:</label>
          <input 
            type="text" 
            value={formData.parkingLotName} 
            className="form-control col short-field" 
            id="form-activity-parkinglot" 
            required 
            onChange={(e) => setFormData({ ...formData, parkingLotName: e.target.value })} />
          <label htmlFor="form-activity-platenumber">Enter vehicle's plate number:</label>
          <input 
            type="text" 
            value={formData.vehiclePlateNumber}
            className="form-control col short-field" 
            id="form-activity-platenumber" 
            required
            onChange={(e) => validatePlate(e.target.value)} />
            { errors.vehiclePlateNumber && <p style={{ color: "red" }}>{errors.vehiclePlateNumber}</p>}
          <label htmlFor="form-activity-firstname">Enter client's first name:</label>
          <input 
            type="text" 
            value={formData.clientFirstName}
            className="form-control col long-field" 
            id="form-activity-firstname" 
            required 
            onChange={(e) => setFormData({ ...formData, clientFirstName: e.target.value })} />
          <label htmlFor="form-activity-lastname">Enter client's last name:</label>
          <input 
            type="text" 
            value={formData.clientLastName} 
            className="form-control col long-field"
            id="form-activity-lastname" 
            required 
            onChange={(e) => setFormData({ ...formData, clientLastName: e.target.value })} />
          <button type="submit" className="col-4 btn btn-primary">Submit</button>
        </form>
  
        {submissionSuccess && (
          <div className="alert alert-success" role="alert">
            New activity has been added successfully!
          </div>
        )}
  
        {submissionFailure && (
          <div className="alert alert-danger" role="alert">
            Failed to add activity. Please try again.
          </div>
        )}
      </>
    )
  }


export default AddFormFields;