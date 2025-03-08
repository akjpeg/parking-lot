namespace ASPNETCoreBackend.Models
{
    public class ParkingLotModel
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public decimal PricePerAdditionalHour { get; set; }
        public decimal PriceFirstHour { get; set; }
    }
}
