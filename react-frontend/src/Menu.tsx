import React from "react";
import { MenuProps } from './MenuProps';
  
  function Menu({ handleButtonClick, selectedOption }: MenuProps): JSX.Element {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <button className={`btn btn-dark m-3 ${selectedOption === "ParkingLots" ? "selected" : ""}`} onClick={() => handleButtonClick("ParkingLots")}>
              Parking Lots
              </button>
            <button className={`btn btn-dark m-3 ${selectedOption === "Clients" ? "selected" : ""}`} onClick={() => handleButtonClick("Clients")}>
              Clients
              </button>
            <button className={`btn btn-dark m-3 ${selectedOption === "Vehicles" ? "selected" : ""}`} onClick={() => handleButtonClick("Vehicles")}>
              Vehicles
              </button>
              <button className={`btn btn-dark m-3 ${selectedOption === "Activities" ? "selected" : ""}`} onClick={() => handleButtonClick("Activities")}>
              Activities
              </button>
          </div>  
        </div>
      </div>
    )
  }


  export default Menu;