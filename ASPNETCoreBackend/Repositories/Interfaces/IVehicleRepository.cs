using ASPNETCoreBackend.Entities;
using ASPNETCoreBackend.Models;

namespace ASPNETCoreBackend.Repositories.Interfaces
{
    public interface IVehicleRepository
    {
        Vehicle GetVehicle(string plateNumber);
        List<VehicleViewModel> GetVehiclesByClient(int clientId);
        void AddVehicle(Vehicle vehicle);
        void UpdateVehicle(Vehicle vehicle);
        void RemoveVehicle(Vehicle vehicle);
    }
}
