using ASPNETCoreBackend.Entities;
using ASPNETCoreBackend.Models;
using ASPNETCoreBackend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ASPNETCoreBackend.Repositories.Implementations
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly ParkingLotDbContext _context;

        public VehicleRepository(ParkingLotDbContext context)
        {
            _context = context;
        }

        public void AddVehicle(Vehicle vehicle)
        {
            _context.Vehicles.Add(vehicle);
            _context.SaveChanges();
        }

        public Vehicle GetVehicle(int id)
        {
            Vehicle vehicle = _context.Vehicles.FirstOrDefault(v => v.VehicleId == id);

            return vehicle;
        }

        public Vehicle GetVehicle(string plateNumber)
        {
            Vehicle vehicle = _context.Vehicles.FirstOrDefault(v => v.PlateNumber == plateNumber);

            return vehicle;
        }


        public List<VehicleViewModel> GetVehiclesByClient(int clientId)
        {
            //List<Vehicle> vehicles = _context.Vehicles.Where(v => v.ClientId == clientId).ToList();
            List<VehicleViewModel> vehicles = _context.Clients
                                        .Where(c => c.ClientId == clientId)
                                        .SelectMany(c => c.Vehicles)
                                        .Select(v => new VehicleViewModel
                                        {
                                            FullName = $"{v.Client.FirstName} {v.Client.LastName}",
                                            PlateNumber = v.PlateNumber,
                                            Brand = v.Brand,
                                            Model = v.Model,
                                            Color = v.Color,
                                            Year = v.Year
                                        })
                                        .ToList();

            return vehicles;
        }

        public void UpdateVehicle(Vehicle vehicle)
        {
            //Vehicle checkVehicle = _context.Vehicles.FirstOrDefault(v => v.Equals(vehicle));

            //if (checkVehicle != null)
            //{
            _context.Vehicles.Update(vehicle);
            _context.SaveChanges();
            
        }


        public void RemoveVehicle(Vehicle vehicle)
        {
            //Vehicle checkVehicle = _context.Vehicles.FirstOrDefault(v => v.Equals(vehicle));

            //if (checkVehicle != null)
            //{
            _context.Vehicles.Remove(vehicle);
            _context.SaveChanges();
            
        }
    }
}
