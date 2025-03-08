using ASPNETCoreBackend.Entities;
using ASPNETCoreBackend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ASPNETCoreBackend.Repositories.Implementations
{
    public class ParkingLotRepository : IParkingLotRepository
    {
        private readonly ParkingLotDbContext _context;

        public ParkingLotRepository(ParkingLotDbContext context)
        {
            _context = context;
        }

        public void AddParkingLot(ParkingLot parkingLot)
        {
            _context.ParkingLots.Add(parkingLot);
            _context.SaveChanges();

        }

        public void RemoveParkingLot(int parkingLotId)
        {
            ParkingLot checkParkingLot = _context.ParkingLots.FirstOrDefault(pl => pl.ParkingLotId == parkingLotId);

            if (checkParkingLot != null)
            {
                _context.ParkingLots.Remove(checkParkingLot);
                _context.SaveChanges();
            }
            
        }

        public ParkingLot GetParkingLot(int parkingLotId)
        {
            return _context.ParkingLots.FirstOrDefault(pl => pl.ParkingLotId == parkingLotId);
        }

        public ParkingLot GetParkingLot(string parkingLotName)
        {
            return _context.ParkingLots.FirstOrDefault(pl => pl.Name == parkingLotName);
        }

        public void UpdateParkingLot(ParkingLot parkingLot)
        {
            _context.ParkingLots.Update(parkingLot);
            _context.SaveChanges();
            
        }

        public List<Vehicle> GetVehiclesByParkingLotId(int parkingLotId)
        {
            List<Vehicle> vehicles = _context.ParkingLotActivities
                                        .Where(a => (a.ParkingLotId == parkingLotId && a.EndDate == null))
                                        .Select(a => a.Vehicle)
                                        .ToList();

            return vehicles;
        }
    }
}
