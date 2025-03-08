import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Title from './Title';
import Menu from './Menu';
import ParkingLotsPage from './ParkingLotsPageComponents/ParkingLotsPage';
import ClientsPage from './ClientsPageComponents/ClientsPage';
import VehiclesPage from './VehiclePageComponents/VehiclesPage';
import ActivitiesPage from './ActivitiesPageComponents/ActivitiesPage';
import { MenuProps } from './MenuProps';
import { Option } from './Option';

function App(): JSX.Element {
  const [selectedOption, setOption] = useState<Option | null>(null);

  const handleButtonClick: MenuProps["handleButtonClick"] = (option): void => {
    setOption(option);
  }

  let pageContent;
  switch (selectedOption) {
    case "ParkingLots":
      pageContent = <ParkingLotsPage />;
      break;
    case "Clients":
      pageContent = <ClientsPage />;
      break;
    case "Vehicles":
      pageContent = <VehiclesPage />;
      break;
    case "Activities":
      pageContent = <ActivitiesPage />;
      break;
    default:
      pageContent = null;
      break;
  }

  return (
    <div className="App">
      <Title />
      <Menu handleButtonClick={handleButtonClick} selectedOption={selectedOption} />
      {pageContent}
    </div>
  );
}

export default App;
