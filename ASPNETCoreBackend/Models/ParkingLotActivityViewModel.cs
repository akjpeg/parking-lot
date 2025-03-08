namespace ASPNETCoreBackend.Models
{
    public class ParkingLotActivityViewModel
    {
        public int ParkingLotActivityId { get; set; }
        public int ParkingLotId { get; set; }
        public string ParkingLotName { get; set; }
        public decimal PricePerAdditionalHour { get; set; }
        public decimal PriceFirstHour { get; set; }
        public string PlateNumber { get; set; }
        public string ClientFirstName { get; set; }
        public string ClientLastName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public decimal ParkingValue { get; set; }

    }
}
