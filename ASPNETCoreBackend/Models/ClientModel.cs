using System.ComponentModel.DataAnnotations;

namespace ASPNETCoreBackend.Models
{
    public class ClientModel
    {
        [Required(ErrorMessage = "First name is required")]
        public string FirstName { get; set; }
        [Required(ErrorMessage = "Last name is required")]
        public string LastName { get; set; }
        [Required(ErrorMessage = "Phone number is required")]
        [RegularExpression(@"^\+55\d{2}\d{8,9}$", ErrorMessage = "Invalid phone number format. Use +55XXXXXXXXXXX")]
        public string Phone { get; set; }
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string? Email { get; set; }
    }
}
