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
    const [errors, setErrors] = useState({ phone: '', email: '' });
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [submissionFailure, setSubmissionFailure] = useState(false);

    const validatePhone = (value: string) => {
      const phoneRegex = /^\+55\d{2}\d{5}\d{4}$/;
      if (!phoneRegex.test(value)) {
        setErrors((prev) => ({ ...prev, phone: "Invalid phone format. Use +55XXXXXXXXXXX"}));
      } else {
        setErrors((prev) => ({ ...prev, phone: "" }));
      }
      setFormData((prev) => ({ ...prev, phone: value }));
    }

    const validateEmail = (value: string) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(value)) {
        setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
      } else {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
      setFormData((prev) => ({ ...prev, email: value }));
    };
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (errors.phone || errors.email) {
        console.log("Fix validation errors before submitting");
        return;
      }
  
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
            placeholder="João"
            required 
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
          <label htmlFor="form-client-lastname">Enter client's last name:</label>
          <input 
            type="text" 
            value={formData.lastName} 
            className="form-control col long-field" 
            id="form-client-lastname" 
            placeholder="Fulano"
            required 
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
          <label htmlFor="form-client-phone">Enter client's phone number:</label>
          <input 
            type="text" 
            value={formData.phone}
            className="form-control col short-field" 
            id="form-client-phone" 
            placeholder="+5511987654321"
            required 
            onChange={(e) => validatePhone(e.target.value)} />
            {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
          <label htmlFor="form-client-email">Enter client's email:</label>
          <input 
            type="text" 
            value={formData.email}
            className="form-control col short-field"
            id="form-client-email" 
            placeholder="email@email.com.br"
            onChange={(e) => validateEmail(e.target.value)} />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
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