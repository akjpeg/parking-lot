import { useState } from "react";
import { ActivityView } from "./ActivityFormData";


function GetActivitiesFormFields(): JSX.Element {
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionFailure, setSubmissionFailure] = useState(false);
  const [activities, setActivities] = useState<ActivityView[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const parkingLotNameElement = (event.target as HTMLFormElement)
                                      .elements
                                      .namedItem("form-activity-parkinglot") as HTMLInputElement | null;

      
      if (!parkingLotNameElement) {
        console.error("Can't fetch client name");
        return;
      }

      const parkingLotName = parkingLotNameElement.value;

      const response = 
        await fetch(`/activities-parking-lot?parkingLotName=${(encodeURIComponent(parkingLotName))}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch client's vehicles");
      } else {
        const data = await response.json();
        setActivities(data);
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
      <form method="GET" onSubmit={handleSubmit}>
        <label htmlFor="form-activity-parkinglot">Enter parking lot name to retrieve current activities:</label>
        <input type="text" className="form-control col short-field" id="form-activity-parkinglot" />
        <button type="submit" className="col-4 btn btn-primary">Submit</button>
      </form>

      {submissionSuccess && (
          <div className="alert alert-success" role="alert">
            Parking Lot activities returned successfully!
          </div>
        )}
  
        {submissionFailure && (
          <div className="alert alert-danger" role="alert">
            Failed to return activities. Please check the name and try again.
          </div>
        )}

      {activities.length > 0 && (
        <div>
        <h3>{activities[0].parkingLotName}</h3>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Client</th>
                <th>Plate Number</th>
                <th>Start</th>
                <th>End</th>
                <th>Price First Hour</th>
                <th>Price Add. Hour</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={index}>
                  <td>{activity.parkingLotActivityId}</td>
                  <td>{activity.clientFirstName} {activity.clientLastName}</td>
                  <td>{activity.plateNumber}</td>
                  <td>{new Date(activity.startDate).toLocaleString()}</td>
                  <td>{activity.endDate ? new Date(activity.endDate).toLocaleString() : ''}</td>
                  <td>{activity.priceFirstHour}</td>
                  <td>{activity.pricePerAdditionalHour}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      )}
    </>
  )
}

export default GetActivitiesFormFields;