import { useState } from "react";
import { ClientFormData } from "./ClientFormData";

const initialClientFormData: ClientFormData = {
  firstName: "",
  lastName: "",
  phone: "",
  email: ""
};
  

function RemoveFormFields(): JSX.Element {
  const [formData, setFormData] = useState(initialClientFormData);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionFailure, setSubmissionFailure] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("/delete-client", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to remove client");
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
        <label htmlFor="form-client-firstname">Enter client's first name to be removed:</label>
        <input 
          type="text" 
          className="form-control col long-field" 
          id="form-client-firstname" 
          required
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
          <label htmlFor="form-client-lastname">Enter client's last name to be removed:</label>
        <input 
          type="text" 
          className="form-control col long-field" 
          id="form-client-lastname" 
          required
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
        <button type="submit" className="col-4 btn btn-primary">Submit</button>
      </form>

      {submissionSuccess && (
          <div className="alert alert-success" role="alert">
            Client removed successfully!
          </div>
        )}
  
        {submissionFailure && (
          <div className="alert alert-danger" role="alert">
            Failed to remove client. Please try again.
          </div>
        )}
    </>
  )
}

  
export default RemoveFormFields;