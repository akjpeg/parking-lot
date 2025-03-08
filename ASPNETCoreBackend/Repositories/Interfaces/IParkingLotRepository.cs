using ASPNETCoreBackend.Entities;

namespace ASPNETCoreBackend.Repositories.Interfaces
{
    public interface IParkingLotRepository
    {
        ParkingLot GetParkingLot(int parkingLotId);
        ParkingLot GetParkingLot(string parkingLotName);
        void AddParkingLot(ParkingLot parkingLot);
        void UpdateParkingLot(ParkingLot parkingLot);
        void RemoveParkingLot(int parkingLotId);
        List<Vehicle> GetVehiclesByParkingLotId(int parkingLotId);
    }
}
