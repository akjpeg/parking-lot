using System.ComponentModel.DataAnnotations;

namespace ASPNETCoreBackend.Models
{
    public class ParkingLotModel
    {
        [Required(ErrorMessage = "Parking lot name is required")]
        [StringLength(100, ErrorMessage = "Name can't exceed 100 characters")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Address is required")]
        [StringLength(300, ErrorMessage = "Address can't exceed 300 characters")]
        public string Address { get; set; }
        [Required(ErrorMessage = "Price per additional hour is required")]
        [Range(0, 100, ErrorMessage = "Price per additional hour must be between 0 and 100")]
        public decimal PricePerAdditionalHour { get; set; }
        [Required(ErrorMessage = "Price for the first hour is required")]
        [Range(0, 100, ErrorMessage = "Price for the first hour must be between 0 and 100")]
        public decimal PriceFirstHour { get; set; }
    }
}
