using ASPNETCoreBackend.Entities;
using ASPNETCoreBackend.Models;
using ASPNETCoreBackend.Repositories.Interfaces;
using ASPNETCoreBackend.Services.Interfaces;


namespace ASPNETCoreBackend.Services.Implementations
{
    public class ParkingLotManager : IParkingLotManager
    {
        private readonly IClientRepository _clientRepository;
        private readonly IVehicleRepository _vehicleRepository;
        private readonly IParkingLotRepository _parkingLotRepository;
        private readonly IParkingLotActivityRepository _parkingLotActivityRepository;

        public ParkingLotManager(IClientRepository clientRepository, 
                                 IVehicleRepository vehicleRepository, 
                                 IParkingLotRepository parkingLotRepository,
                                 IParkingLotActivityRepository parkingLotActivityRepository)
        {
            _clientRepository = clientRepository;
            _vehicleRepository = vehicleRepository;
            _parkingLotRepository = parkingLotRepository;
            _parkingLotActivityRepository = parkingLotActivityRepository;
        }

        public void AddClient(ClientModel clientModel)
        {
            Client client = new Client
            {
                FirstName = clientModel.FirstName,
                LastName = clientModel.LastName,
                PhoneNumber = clientModel.Phone,
                Email = clientModel.Email,
            };

            _clientRepository.AddClient(client);
        }

        public void AddParkingLot(ParkingLotModel parkingLotModel)
        {
            ParkingLot parkingLot = new ParkingLot
            {
                Name = parkingLotModel.Name,
                Address = parkingLotModel.Address,
                PricePerAdditionalHour = parkingLotModel.PricePerAdditionalHour,
                PriceFirstHour = parkingLotModel.PriceFirstHour,
            };

            _parkingLotRepository.AddParkingLot(parkingLot);
        }

        public void AddVehicle(VehicleModel vehicleModel)
        {

            Client client = _clientRepository.GetByFullName(vehicleModel.ClientFirstName, vehicleModel.ClientLastName);

            if (client == null)
            {
                throw new KeyNotFoundException("Client is not registered");
            }

            Vehicle vehicle = new Vehicle
            {
                PlateNumber = vehicleModel.PlateNumber,
                Brand = vehicleModel.Brand,
                Model = vehicleModel.Model,
                Color = vehicleModel.Color,
                Year = vehicleModel.Year != 0 ? vehicleModel.Year : null,
                ClientId = client.ClientId,
            };

            _vehicleRepository.AddVehicle(vehicle);
        }

        public void RemoveClient(ClientModel clientModel)
        {
            Client client = _clientRepository.GetByFullName(clientModel.FirstName, clientModel.LastName);

            if (client != null)
            {
                _clientRepository.RemoveClient(client);
            }
        }

        public void RemoveParkingLot(ParkingLotModel parkingLotModel)
        {
            ParkingLot parkingLot = _parkingLotRepository.GetParkingLot(parkingLotModel.Name);

            if (parkingLot != null)
            {
                _parkingLotRepository.RemoveParkingLot(parkingLot.ParkingLotId);
            }
        }

        public void RemoveVehicle(VehicleModel vehicleModel)
        {
            Vehicle vehicle = _vehicleRepository.GetVehicle(vehicleModel.PlateNumber);

            if (vehicle != null)
            {
                _vehicleRepository.RemoveVehicle(vehicle);
            }
        }

        public void UpdateClient(ClientModel clientModel)
        {
            Client client = _clientRepository.GetByFullName(clientModel.FirstName, clientModel.LastName);

            if (client != null)
            {
                client.PhoneNumber = !string.IsNullOrEmpty(clientModel.Phone)? clientModel.Phone : client.PhoneNumber;
                client.Email = !string.IsNullOrEmpty(clientModel.Email) ? clientModel.Email : client.Email;

                _clientRepository.UpdateClient(client);
            }
            else
            {
                throw new KeyNotFoundException("Client not found");
            }

        }

        public void UpdateParkingLot(ParkingLotModel parkingLotModel)
        {
            ParkingLot parkingLot = _parkingLotRepository.GetParkingLot(parkingLotModel.Name);

            if (parkingLot != null)
            {
                parkingLot.Address = !string.IsNullOrEmpty(parkingLotModel.Address) ? parkingLotModel.Address : parkingLot.Address;
                parkingLot.PricePerAdditionalHour = parkingLotModel.PricePerAdditionalHour != 0 ? 
                                                            parkingLotModel.PricePerAdditionalHour :
                                                            parkingLot.PricePerAdditionalHour;
                parkingLot.PriceFirstHour = parkingLotModel.PriceFirstHour != 0 ?
                                                            parkingLotModel.PriceFirstHour :
                                                            parkingLot.PriceFirstHour;


                _parkingLotRepository.UpdateParkingLot(parkingLot);
            }
        }

        public void UpdateVehicle(VehicleModel vehicleModel)
        {
            Vehicle vehicle = _vehicleRepository.GetVehicle(vehicleModel.PlateNumber);
            if (vehicle != null)
            {
                if (!string.IsNullOrEmpty(vehicleModel.ClientFirstName))
                {
                    Client newOwner = _clientRepository.GetByFullName(vehicleModel.ClientFirstName, vehicleModel.ClientLastName);

                    if (newOwner == null)
                    {
                        throw new KeyNotFoundException("Client is not registered.");
                    }

                    vehicle.ClientId = newOwner.ClientId;
                    vehicle.Client = newOwner;
                }

                vehicle.Color = !string.IsNullOrEmpty(vehicleModel.Color) ? vehicleModel.Color : vehicle.Color;

                _vehicleRepository.UpdateVehicle(vehicle);
            }
        }

        public void AddParkingLotActivity(ParkingLotActivityModel parkingLotActivityModel)
        {
            ParkingLot parkingLot = _parkingLotRepository.GetParkingLot(parkingLotActivityModel.ParkingLotName);
            if (parkingLot == null)
                throw new KeyNotFoundException("Parking Lot not found");

            Client client = _clientRepository.GetByFullName(parkingLotActivityModel.ClientFirstName, 
                                                            parkingLotActivityModel.ClientLastName);
            if (client == null)
                throw new KeyNotFoundException("Client not found");

            Vehicle vehicle = _vehicleRepository.GetVehicle(parkingLotActivityModel.VehiclePlateNumber);
            if (vehicle == null)
                throw new KeyNotFoundException("Vehicle not found");


            ParkingLotActivity parkingLotActivity = _parkingLotActivityRepository
                                                        .GetFromPlateNumber(parkingLotActivityModel.VehiclePlateNumber,
                                                                            parkingLotActivityModel.ParkingLotName);

            if (parkingLotActivity != null)
                throw new Exception("Vehicle is already parked");


            ParkingLotActivity activity = new ParkingLotActivity
            {
                ParkingLotId = parkingLot.ParkingLotId,
                ParkingLot = parkingLot,
                ClientId = client.ClientId,
                Client = client,
                VehicleId = vehicle.VehicleId,
                Vehicle = vehicle,
                ParkingValue = -1,
            };

            if (parkingLotActivityModel.StartDate != null)
            {
                activity.StartDate = (DateTime)parkingLotActivityModel.StartDate;
            }

            _parkingLotActivityRepository.AddParkingLotActivity(activity);
        }


        public void RemoveParkingLotActivity(ParkingLotActivityModel parkingLotActivityModel)
        {
            throw new NotImplementedException();
        }

        public ParkingLotActivityViewModel GetParkingLotActivityViewModel(ParkingLotActivity activity)
        {
            ParkingLotActivityViewModel viewActivity = new ParkingLotActivityViewModel
            {
                ParkingLotActivityId = activity.ParkingLotActivityId,
                ParkingLotId = activity.ParkingLotId,
                ParkingLotName = activity.ParkingLot.Name,
                PricePerAdditionalHour = activity.ParkingLot.PricePerAdditionalHour,
                PriceFirstHour = activity.ParkingLot.PriceFirstHour,
                PlateNumber = activity.Vehicle.PlateNumber,
                ClientFirstName = activity.Client.FirstName,
                ClientLastName = activity.Client.LastName,
                StartDate = activity.StartDate,
                EndDate = activity.EndDate,
                ParkingValue = activity.ParkingValue,
            };

            return viewActivity;
        }

        public ParkingLotActivityViewModel EndParkingLotActivity(ParkingLotActivityModel parkingLotActivityModel)
        {
            ParkingLotActivity activity;
            ParkingLot parkingLot = _parkingLotRepository.GetParkingLot(parkingLotActivityModel.ParkingLotName);

            if (parkingLot == null)
                throw new KeyNotFoundException("Parking Lot not found");

            if (parkingLotActivityModel.ParkingLotActivityId == 0)
            {

                Vehicle vehicle = _vehicleRepository.GetVehicle(parkingLotActivityModel.VehiclePlateNumber);
                if (vehicle == null)
                    throw new KeyNotFoundException("Vehicle not found");

                activity = _parkingLotActivityRepository
                                .GetFromPlateNumber(vehicle.PlateNumber, parkingLot.Name);
            }
            else
            {
                activity = _parkingLotActivityRepository
                                .GetById(parkingLotActivityModel.ParkingLotActivityId);
            }

            if (parkingLotActivityModel.EndDate == null)
            {
                activity.EndDate = DateTime.UtcNow;
            }
            else
            {
                activity.EndDate = parkingLotActivityModel.EndDate;
            }

            TimeSpan duration = (DateTime)activity.EndDate - activity.StartDate;

            double additionalHours = duration.TotalHours - 1 > 0 ? duration.TotalHours - 1 : 0;

            activity.ParkingValue = parkingLot.PriceFirstHour + parkingLot.PricePerAdditionalHour * (decimal)additionalHours;
            
            _parkingLotActivityRepository.UpdateParkingLotActivity(activity);

            return GetParkingLotActivityViewModel(activity);
        }

        public List<Vehicle> GetVehiclesAtParkingLot(string parkingLotName)
        {
            ParkingLot parkingLot = _parkingLotRepository.GetParkingLot(parkingLotName);
            if (parkingLot == null) 
                throw new KeyNotFoundException("Parking Lot not found");

            return _parkingLotRepository.GetVehiclesByParkingLotId(parkingLot.ParkingLotId);
        }

        public List<VehicleViewModel> GetVehiclesOfClient(string firstName, string lastName)
        {
            Client client = _clientRepository.GetByFullName(firstName, lastName);
            if (client == null) 
                throw new KeyNotFoundException("Client not found");

            return _vehicleRepository.GetVehiclesByClient(client.ClientId);
        }

        public List<ParkingLotActivity> GetParkingLotActivities(string parkingLotName)
        {
            ParkingLot parkingLot = _parkingLotRepository.GetParkingLot(parkingLotName);
            if (parkingLot == null)
                throw new KeyNotFoundException("Parking lot not found");

            return _parkingLotActivityRepository.GetByParkingLotId(parkingLot.ParkingLotId);
        }
    }
}
