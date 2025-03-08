using ASPNETCoreBackend.Entities;
using ASPNETCoreBackend.Models;

namespace ASPNETCoreBackend.Repositories.Interfaces
{
    public interface IParkingLotActivityRepository
    {
        ParkingLotActivity GetById(int id);
        ParkingLotActivity GetFromPlateNumber(string plateNumber, string parkingLotName);
        List<ParkingLotActivity> GetByParkingLotId(int parkingLotId);
        List<ParkingLotActivity> GetByClientId(int clientId);
        List<ParkingLotActivity> GetByClientName(string firstName, string lastName);
        void AddParkingLotActivity(ParkingLotActivity activity);
        void RemoveParkingLotActivity(int parkingLotActivityId);
        void UpdateParkingLotActivity(ParkingLotActivity activity);
    }
}
