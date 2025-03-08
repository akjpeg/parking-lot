import { useState } from "react";
import { ClientFormData } from "./ClientFormData";

const initialClientFormData: ClientFormData = {
  firstName: "",
  lastName: "",
  phone: "",
  email: ""
};
  

function AddFormFields(): JSX.Element {
    const [formData, setFormData] = useState(initialClientFormData);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [submissionFailure, setSubmissionFailure] = useState(false);
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      try {
        const response = await fetch("/new-client", {
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
    }
  
    return (
      <>
        <form method="POST" onSubmit={handleSubmit}>
          <label htmlFor="form-client-firstname">Enter client's first name:</label>
          <input 
            type="text" 
            value={formData.firstName} 
            className="form-control col long-field" 
            id="form-client-firstname" 
            required 
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
          <label htmlFor="form-client-lastname">Enter client's last name:</label>
          <input 
            type="text" 
            value={formData.lastName} 
            className="form-control col long-field" 
            id="form-client-lastname" 
            required 
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
          <label htmlFor="form-client-phone">Enter client's phone number:</label>
          <input 
            type="text" 
            value={formData.phone}
            className="form-control col short-field" 
            id="form-client-phone" 
            required 
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
          <label htmlFor="form-client-email">Enter client's email:</label>
          <input 
            type="text" 
            value={formData.email}
            className="form-control col short-field"
            id="form-client-email" 
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          <button type="submit" className="col-4 btn btn-primary">Submit</button>
        </form>
  
        {submissionSuccess && (
          <div className="alert alert-success" role="alert">
            Client's data has been added successfully!
          </div>
        )}
  
        {submissionFailure && (
          <div className="alert alert-danger" role="alert">
            Failed to add client's data. Please try again.
          </div>
        )}
      </>
    )
  }


export default AddFormFields;