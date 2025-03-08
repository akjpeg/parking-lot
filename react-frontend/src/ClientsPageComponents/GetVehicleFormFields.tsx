import { useState } from "react";

function GetVehicleFormFields(): JSX.Element {
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionFailure, setSubmissionFailure] = useState(false);
  const [vehicles, setVehicles] = useState<any[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const clientFirstNameElement = (event.target as HTMLFormElement)
                                      .elements
                                      .namedItem("form-client-firstname") as HTMLInputElement | null;

      const clientLastNameElement = (event.target as HTMLFormElement)
                                      .elements
                                      .namedItem("form-client-lastname") as HTMLInputElement | null;
      
      if (!clientFirstNameElement || !clientLastNameElement) {
        console.error("Can't fetch client name");
        return;
      }

      const clientFirstName = clientFirstNameElement.value;
      const clientLasttName = clientLastNameElement.value;

      const response = 
        await fetch(`/vehicles-client?firstName=${encodeURIComponent(clientFirstName)}&lastName=${(encodeURIComponent(clientLasttName))}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch client's vehicles");
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
        <label htmlFor="form-client-firstname">Enter client's first name to fetch vehicle(s):</label>
        <input type="text" className="form-control col long-field" id="form-client-firstname" />
        <label htmlFor="form-client-lastname">Enter client's last name to fetch vehicle(s):</label>
        <input type="text" className="form-control col long-field" id="form-client-lastname" />
        <button type="submit" className="col-4 btn btn-primary">Submit</button>
      </form>

      {submissionSuccess && (
          <div className="alert alert-success" role="alert">
            Client's vehicles returned successfully!
          </div>
        )}
  
        {submissionFailure && (
          <div className="alert alert-danger" role="alert">
            Failed to return client's vehicles. Please check the name and try again.
          </div>
        )}

      {vehicles.length > 0 && (
        <div>
        <h3>Parking Lot Vehicles</h3>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Plate Number</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Color</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle, index) => (
                <tr key={index}>
                  <td>{vehicle.fullName}</td>
                  <td>{vehicle.plateNumber}</td>
                  <td>{vehicle.brand}</td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.color}</td>
                  <td>{vehicle.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      )}

      {vehicles.length === 0 && (
        <div>
        Oops! Client's hasn't registered any vehicles yet.
      </div>
      )}
    </>
  )
}

export default GetVehicleFormFields;