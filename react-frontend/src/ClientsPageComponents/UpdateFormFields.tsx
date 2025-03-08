import { useState } from "react";
import { ClientFormData } from "./ClientFormData";

const initialClientFormData: ClientFormData = {
  firstName: "",
  lastName: "",
  phone: "",
  email: ""
};
  

function UpdateFormFields(): JSX.Element {
    const [formData, setFormData] = useState(initialClientFormData);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [submissionFailure, setSubmissionFailure] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        try {
          const response = await fetch("/update-client", {
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
            <label htmlFor="form-client-firstname">Enter client's first name to be updated:</label>
            <input 
                type="text" 
                className="form-control col long-field" 
                id="form-client-firstname" 
                required
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
            <label htmlFor="form-client-lastname">Enter client's last name to be updated:</label>
            <input 
                type="text" 
                className="form-control col long-field" 
                id="form-parking-lot-address" 
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
            <p>
            Fill forms that you want to update, otherwise leave it blank:
            </p>
            <label htmlFor="form-client-phone">Enter client's new phone number:</label>
            <input 
                type="text" 
                id="form-client-phone" 
                className="form-control col short-field"
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            <label htmlFor="form-client-email">Enter client's new email:</label>
            <input 
                type="text"  
                id="form-client-email" 
                className="form-control col short-field"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <button type="submit" className="col-4 btn btn-primary">Submit</button>
        </form>

        {submissionSuccess && (
          <div className="alert alert-success" role="alert">
            Client's data has been updated successfully!
          </div>
        )}
  
        {submissionFailure && (
          <div className="alert alert-danger" role="alert">
            Failed to update client's data. Please try again.
          </div>
        )}
      </>
    )
  }

export default UpdateFormFields;