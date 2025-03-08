using ASPNETCoreBackend.Entities;
using ASPNETCoreBackend.Models;
using ASPNETCoreBackend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.X509Certificates;

namespace ASPNETCoreBackend.Repositories.Implementations
{
    public class ParkingLotActivityRepository : IParkingLotActivityRepository
    {
        private readonly ParkingLotDbContext _context;

        public ParkingLotActivityRepository(ParkingLotDbContext context)
        {
            _context = context;
        }

        public void AddParkingLotActivity(ParkingLotActivity activity)
        {
            _context.ParkingLotActivities.Add(activity);
            _context.SaveChanges();
        }

        public List<ParkingLotActivity> GetByClientId(int clientId)
        {
            List<ParkingLotActivity> activities = _context.ParkingLotActivities.Where(a => a.ClientId == clientId).ToList();

            return activities;
        }

        public List<ParkingLotActivity> GetByClientName(string firstName, string lastName)
        {
            List<ParkingLotActivity> activities = _context
                                                    .ParkingLotActivities
                                                    .Where(a => (a.Client.FirstName == firstName && a.Client.LastName == lastName))
                                                    .ToList();

            return activities;
        }

        public ParkingLotActivity GetById(int id)
        {
            return _context.ParkingLotActivities.SingleOrDefault(a => a.ParkingLotId == id);
        }

        public ParkingLotActivity GetFromPlateNumber(string plateNumber, string parkingLotName)
        {
            Vehicle vehicle = _context.Vehicles.SingleOrDefault(v => v.PlateNumber == plateNumber);
            if (vehicle == null)
                throw new Exception("Vehicle not found");

            ParkingLot parkingLot = _context.ParkingLots.SingleOrDefault(p => p.Name == parkingLotName);
            if (parkingLot == null)
                throw new Exception("Parking lot not found");

            return _context.ParkingLotActivities
                        .Where(a => (a.ParkingLotId == parkingLot.ParkingLotId
                                        && a.EndDate == null
                                        && a.VehicleId == vehicle.VehicleId))
                        .Include(a => a.Client)
                        .OrderByDescending(a => a.StartDate)
                        .FirstOrDefault();
        }


        public List<ParkingLotActivity> GetByParkingLotId(int parkingLotId)
        {
            List<ParkingLotActivity> activities = _context
                                                    .ParkingLotActivities
                                                    .Where(a => a.ParkingLotId == parkingLotId)
                                                    .Include(a => a.Vehicle)
                                                    .Include(a => a.ParkingLot)
                                                    .Include(a => a.Client)
                                                    .OrderByDescending(a => a.StartDate)
                                                    .ToList();

            return activities;
        }

        public void RemoveParkingLotActivity(int parkingLotActivityId)
        {
            ParkingLotActivity activity = _context
                                            .ParkingLotActivities
                                            .SingleOrDefault(a => a.ParkingLotActivityId == parkingLotActivityId);

            if (activity != null)
            {
                _context.ParkingLotActivities.Remove(activity);
                _context.SaveChanges();
            }
        }

        public void UpdateParkingLotActivity(ParkingLotActivity activity)
        {
            _context.ParkingLotActivities.Update(activity);
            _context.SaveChanges();
            
        }
    }
}
