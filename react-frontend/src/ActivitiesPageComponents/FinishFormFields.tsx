import { useState } from "react";
import { ActitivyFormData, ActivityView } from "./ActivityFormData";

const initialActivityFormData: ActitivyFormData = {
  parkingLotActivity: 0,
  parkingLotName: "",
  clientFirstName: "",
  clientLastName: "",
  vehiclePlateNumber: ""
};
  

function FinishFormFields(): JSX.Element {
    const [formData, setFormData] = useState(initialActivityFormData);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [submissionFailure, setSubmissionFailure] = useState(false);
    const [activity, setActivity] = useState<ActivityView | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        try {
          const response = await fetch("/end-activity", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(formData)
          });
    
          if (!response.ok) {
            throw new Error("Failed to end activity");
          } else {
            const data = await response.json();
            setActivity(data);
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
        <form onSubmit={handleSubmit}>
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
            onChange={(e) => setFormData({ ...formData, vehiclePlateNumber: e.target.value })} 
            required />
            <button type="submit" className="col-4 btn btn-primary">Submit</button>
        </form>

        {submissionSuccess && (
          <div className="alert alert-success" role="alert">
            Acitvity has been finished successfully!
          </div>
        )}
  
        {submissionFailure && (
          <div className="alert alert-danger" role="alert">
            Failed to update finish activity. Please try again.
          </div>
        )}

        {activity && (
          <div>
            <h3>Receipt #{activity.parkingLotActivityId}</h3>
            <p>Parking Lot: {activity.parkingLotName}</p>
            <p>Client: {activity.clientFirstName} {activity.clientLastName}</p>
            <p>Vehicle Plate Number: {activity.plateNumber}</p>
            <p>Parked at: {new Date(activity.startDate).toLocaleString()}</p>
            <p>Left at: {new Date(activity.endDate).toLocaleString()}</p>
            <p>First hour price: ${activity.priceFirstHour}</p>
            <p>Addicional hours price: ${activity.pricePerAdditionalHour}</p>
            <p>Total: {activity.parkingValue}</p>
          </div>
        )}
      </>
    )
  }

export default FinishFormFields;