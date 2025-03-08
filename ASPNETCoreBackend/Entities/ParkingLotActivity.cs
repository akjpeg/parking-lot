using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ASPNETCoreBackend.Entities
{
    public class ParkingLotActivity
    {
        [Key]
        public int ParkingLotActivityId { get; set; }
        [Required]
        [ForeignKey("ParkingLot")]
        public int ParkingLotId { get; set; }
        public ParkingLot ParkingLot { get; set; }
        [Required]
        [ForeignKey("Client")]
        public int ClientId { get; set; }
        public Client Client { get; set; }
        [Required]
        [ForeignKey("Vehicle")]
        public int VehicleId { get; set; }
        public Vehicle Vehicle { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public decimal ParkingValue { get; set; }

    }
}
