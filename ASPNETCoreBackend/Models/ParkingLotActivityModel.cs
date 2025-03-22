using System.ComponentModel.DataAnnotations;

namespace ASPNETCoreBackend.Models
{
    public class ParkingLotActivityModel
    {
        public int ParkingLotActivityId { get; set; }
        [Required(ErrorMessage = "Parking lot name is required")]
        [StringLength(100, ErrorMessage = "Parking lot name can't exceed 100 characters")]
        public string ParkingLotName { get; set; }
        [Required(ErrorMessage = "Client first name is required")]
        [StringLength(50, ErrorMessage = "Client first name can't exceed 50 characters")]
        public string ClientFirstName { get; set; }
        [Required(ErrorMessage = "Client last name is required")]
        [StringLength(50, ErrorMessage = "Client last name can't exceed 50 characters")]
        public string ClientLastName { get; set; }
        [Required(ErrorMessage = "Vehicle plate number is required")]
        [RegularExpression(@"^[A-Z]{3}\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$", ErrorMessage = "Invalid plate format. Use ABC1234 or ABC1D23")]
        public string VehiclePlateNumber { get; set; }
        public DateTime? StartDate { get; set; } = null;
        public DateTime? EndDate { get; set; } = null;
    }
}
