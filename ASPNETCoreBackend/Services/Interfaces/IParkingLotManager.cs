using ASPNETCoreBackend.Entities;
using ASPNETCoreBackend.Models;

namespace ASPNETCoreBackend.Services.Interfaces
{
    public interface IParkingLotManager
    {
        void AddClient(ClientModel clientModel);
        void RemoveClient(ClientModel clientModel);
        void UpdateClient(ClientModel clientModel);
        void AddVehicle(VehicleModel vehicleModel);
        void RemoveVehicle(VehicleModel vehicleModel);
        void UpdateVehicle(VehicleModel vehicleModel);
        void AddParkingLot(ParkingLotModel parkingLotModel);
        void RemoveParkingLot(ParkingLotModel parkingLotModel);
        void UpdateParkingLot(ParkingLotModel parkingLotModel);
        void AddParkingLotActivity(ParkingLotActivityModel parkingLotActivityModel);
        void RemoveParkingLotActivity(ParkingLotActivityModel parkingLotActivityModel);
        ParkingLotActivityViewModel GetParkingLotActivityViewModel(ParkingLotActivity parkingLotActivity);
        ParkingLotActivityViewModel EndParkingLotActivity(ParkingLotActivityModel parkingLotActivityModel);
        List<Vehicle> GetVehiclesAtParkingLot(string parkingLotName);
        List<VehicleViewModel> GetVehiclesOfClient(string firstName, string lastName);
        List<ParkingLotActivity> GetParkingLotActivities(string parkingLotName);
    }
}
