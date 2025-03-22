using System.ComponentModel.DataAnnotations;

namespace ASPNETCoreBackend.Models
{
    public class VehicleModel
    {
        [Required(ErrorMessage = "Plate number is required")]
        [RegularExpression(@"^[A-Z]{3}\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$", ErrorMessage = "Invalid plate format. Use ABC1234 or ABC1D23")]
        public string PlateNumber { get; set; }
        [Required(ErrorMessage = "Brand is required")]
        [StringLength(50, ErrorMessage = "Brand name can't exceed 50 characters")]
        public string Brand { get; set; }
        [Required(ErrorMessage = "Model is required")]
        [StringLength(50, ErrorMessage = "Model name can't exceed 50 characters")]
        public string Model { get; set; }
        [Required(ErrorMessage = "Color is required")]
        [StringLength(30, ErrorMessage = "Color can't exceed 30 characters")]
        public string Color { get; set; }
        [Range(1886, 2100, ErrorMessage = "Year must be between 1886 and 2100")]
        public int? Year { get; set; }
        [Required(ErrorMessage = "Client first name is required")]
        public string ClientFirstName { get; set; }
        [Required(ErrorMessage = "Client first name is required")]
        public string ClientLastName { get; set; }
    }
}
