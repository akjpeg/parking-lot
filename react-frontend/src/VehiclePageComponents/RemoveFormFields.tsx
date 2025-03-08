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
  

function RemoveFormFields(): JSX.Element {
  const [formData, setFormData] = useState(initialVehicleFormData);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionFailure, setSubmissionFailure] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("/delete-vehicle", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to remove vehicle");
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
        <label htmlFor="form-vehicle-platenumber">Enter vehicle's plate number:</label>
        <input 
          type="text" 
          className="form-control col short-field" 
          id="form-vehicle-platenumber" 
          required
          onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })} />
        <button type="submit" className="col-4 btn btn-primary">Submit</button>
      </form>

      {submissionSuccess && (
          <div className="alert alert-success" role="alert">
            Vehicle has been removed successfully!
          </div>
        )}
  
        {submissionFailure && (
          <div className="alert alert-danger" role="alert">
            Failed to remove vehicle. Please try again.
          </div>
        )}
    </>
  )
}

  
export default RemoveFormFields;