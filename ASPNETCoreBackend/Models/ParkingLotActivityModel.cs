namespace ASPNETCoreBackend.Models
{
    public class ParkingLotActivityModel
    {
        public int ParkingLotActivityId { get; set; }
        public string ParkingLotName { get; set; }
        public string ClientFirstName { get; set; }
        public string ClientLastName { get; set; }
        public string VehiclePlateNumber { get; set; }
        public DateTime? StartDate { get; set; } = null;
        public DateTime? EndDate { get; set; } = null;
    }
}
