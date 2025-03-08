import { useState } from "react";
import AddFormFields from "./AddFormFields";
import UpdateFormFields from "./UpdateFormFields";
import RemoveFormFields from "./RemoveFormFields";

function VehiclesPage(): JSX.Element {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleButtonClick = (option: string): void => {
    setSelectedOption(option);
  }

    return (
      <div className="container page2">
        <h2>Vehicles Page</h2>
        <div className="row">
            <button className={`col-4 ${selectedOption === "Add" ? "sub-selected" : ""}`} onClick={() => handleButtonClick("Add")}>Add</button>
            <button className={`col-4 ${selectedOption === "Update" ? "sub-selected" : ""}`} onClick={() => handleButtonClick("Update")}>Update</button>
            <button className={`col-4 ${selectedOption === "Remove" ? "sub-selected" : ""}`} onClick={() => handleButtonClick("Remove")}>Remove</button>
        </div>

        {selectedOption && (
            <div className="row">
              {selectedOption === "Add" && <AddFormFields />}
              {selectedOption === "Update" && <UpdateFormFields />}
              {selectedOption === "Remove" && <RemoveFormFields />}
            </div>
          )}
      </div>
    );
  }

export default VehiclesPage;