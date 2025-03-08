import { useState } from "react";
import AddFormFields from "./AddFormFields";
import FinishFormFields from "./FinishFormFields";
import GetActivitiesFormFields from "./GetActivitiesFormFields";


function ActivitiesPage(): JSX.Element {

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleButtonClick = (option: string): void => {
    setSelectedOption(option);
  }
    return (
      <div className="container page2">
        <h2>Activities Page</h2>
          <div className="row">
            <button className={`col-4 ${selectedOption === "Add" ? "sub-selected" : ""}`} onClick={() => handleButtonClick("Add")}>Add</button>
            <button className={`col-4 ${selectedOption === "Finish" ? "sub-selected" : ""}`} onClick={() => handleButtonClick("Finish")}>Finish</button>
            <button className={`col-4 ${selectedOption === "GetActivities" ? "sub-selected" : ""}`} onClick={() => handleButtonClick("GetActivities")}>Get</button>
          </div>

          {selectedOption && (
            <div className="row">
              {selectedOption === "Add" && <AddFormFields />}
              {selectedOption === "Finish" && <FinishFormFields />}
              {selectedOption === "GetActivities" && <GetActivitiesFormFields />}
            </div>
          )}
      </div>
    );
  }

export default ActivitiesPage;