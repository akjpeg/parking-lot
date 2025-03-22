using System.ComponentModel.DataAnnotations;

namespace ASPNETCoreBackend.Models
{
  public class ParkingLotActivityFinishModel
  {
    public int ParkingLotActivityId { get; set; }
    public string ParkingLotName { get; set; }
    [Required(ErrorMessage = "Client first name is required")]
    [StringLength(50, ErrorMessage = "Client first name can't exceed 50 characters")]
    public string VehiclePlateNumber { get; set; }
    public DateTime? StartDate { get; set; } = null;
    public DateTime? EndDate { get; set; } = null;
  }
}
