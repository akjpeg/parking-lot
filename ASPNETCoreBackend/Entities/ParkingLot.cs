using System.ComponentModel.DataAnnotations;

namespace ASPNETCoreBackend.Entities
{
    public class ParkingLot
    {
        [Key]
        public int ParkingLotId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Address { get; set; }
        public decimal PricePerAdditionalHour { get; set; }
        public decimal PriceFirstHour { get; set; }
        public ICollection<Vehicle> Vehicles { get; set; } = new List<Vehicle>();

    }
}
