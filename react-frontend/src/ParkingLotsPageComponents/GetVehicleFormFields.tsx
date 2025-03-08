import { useState } from "react";

function GetVehicleFormFields(): JSX.Element {
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionFailure, setSubmissionFailure] = useState(false);
  const [vehicles, setVehicles] = useState<any[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const parkingLotNameElement = (event.target as HTMLFormElement)
                                      .elements
                                      .namedItem("form-parking-lot-name") as HTMLInputElement | null;
      
      if (!parkingLotNameElement) {
        console.error("Can't fetch parking lot name");
        return;
      }

      const parkingLotName = parkingLotNameElement.value;

      const response = 
        await fetch(`/vehicles-parkinglot?parkingLotName=${encodeURIComponent(parkingLotName)}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
      });

      if (!response.ok) {
        throw new Error("Failed to add parking lot");
      } else {
        const data = await response.json();
        setVehicles(data);
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
        <label htmlFor="form-parking-lot-name">Enter Parking Lot Name to fetch vehicles parked:</label>
        <input type="text" className="form-control col long-field" id="form-parking-lot-name" />
        <button type="submit" className="col-4 btn btn-primary">Submit</button>
      </form>

      {submissionSuccess && (
          <div className="alert alert-success" role="alert">
            Parking Lot vehicles returned successfully!
          </div>
        )}
  
        {submissionFailure && (
          <div className="alert alert-danger" role="alert">
            Failed to return parking lot vehicles. Please check the name and try again.
          </div>
        )}

      {vehicles.length > 0 && (
        <div>
        <h3>Parking Lot Vehicles</h3>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Vehicle ID</th>
                <th>Plate Number</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Color</th>
                <th>Year</th>
                <th>Client ID</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle, index) => (
                <tr key={index}>
                  <td>{vehicle.vehicleId}</td>
                  <td>{vehicle.plateNumber}</td>
                  <td>{vehicle.brand}</td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.color}</td>
                  <td>{vehicle.year}</td>
                  <td>{vehicle.clientId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      )}

      {vehicles.length === 0 && (
        <div>
        Oops! No cars are parked on this lot at the moment.
      </div>
      )}
    </>
  )
}

export default GetVehicleFormFields;