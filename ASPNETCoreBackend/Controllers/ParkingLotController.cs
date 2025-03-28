﻿using ASPNETCoreBackend.Entities;
using ASPNETCoreBackend.Models;
using ASPNETCoreBackend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ASPNETCoreBackend.Controllers
{
    public class ParkingLotController : Controller
    {
        private readonly IParkingLotManager _parkingLotManager;
        private readonly ILogger<ParkingLotController> _logger;

        public ParkingLotController(
            IParkingLotManager parkingLotManager,
            ILogger<ParkingLotController> logger
        )
        {
            _parkingLotManager = parkingLotManager;
            _logger = logger;
        }

        [HttpPost]
        [Route("new-parking-lot")]
        public IActionResult NewParkingLot([FromBody] ParkingLotModel parkingLotModel)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Validation failed for new parking lot: {Errors}",
                  string.Join("; ", ModelState.Values
                      .SelectMany(v => v.Errors)
                      .Select(e => e.ErrorMessage)));
                return BadRequest(ModelState);
            }

            try
            {
                _parkingLotManager.AddParkingLot(parkingLotModel);
                return Ok();
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { ex.Message });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("new-client")]
        public IActionResult NewClient([FromBody] ClientModel clientModel)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Validation failed for new client: {Errors}",
                  string.Join("; ", ModelState.Values
                      .SelectMany(v => v.Errors)
                      .Select(e => e.ErrorMessage)));
                return BadRequest(ModelState);
            }

            try
            {
                _parkingLotManager.AddClient(clientModel);
                return Ok();
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { ex.Message });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("new-vehicle")]
        public IActionResult NewVehicle([FromBody] VehicleModel vehicleModel)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Validation failed for new vehicle: {Errors}",
                  string.Join("; ", ModelState.Values
                      .SelectMany(v => v.Errors)
                      .Select(e => e.ErrorMessage)));
                return BadRequest(ModelState);
            }
            try
            {
                _parkingLotManager.AddVehicle(vehicleModel);
                return Ok();
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { ex.Message });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("new-activity")]
        public IActionResult NewActivity([FromBody] ParkingLotActivityModel parkingLotActivityModel)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Validation failed for new vehicle: {Errors}",
                  string.Join("; ", ModelState.Values
                      .SelectMany(v => v.Errors)
                      .Select(e => e.ErrorMessage)));
                return BadRequest(ModelState);
            }
            try
            {
                _parkingLotManager.AddParkingLotActivity(parkingLotActivityModel);
                return Ok();
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { ex.Message });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("end-activity")]
        public IActionResult EndActivity([FromBody] ParkingLotActivityFinishModel parkingLotActivityFinishModel)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Validation failed for new vehicle: {Errors}",
                  string.Join("; ", ModelState.Values
                      .SelectMany(v => v.Errors)
                      .Select(e => e.ErrorMessage)));
                return BadRequest(ModelState);
            }
            try
            {
                ParkingLotActivityViewModel viewActivity = _parkingLotManager.EndParkingLotActivity(parkingLotActivityFinishModel);
                return Ok(viewActivity);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("delete-parking-lot")]
        public IActionResult DeleteParkingLot([FromBody] ParkingLotModel parkingLotModel)
        {

            try
            {
                _parkingLotManager.RemoveParkingLot(parkingLotModel);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("delete-client")]
        public IActionResult DeleteClient([FromBody] ClientModel clientModel)
        {
            try
            {
                _parkingLotManager.RemoveClient(clientModel);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("delete-vehicle")]
        public IActionResult DeleteVehicle([FromBody] VehicleModel vehicleModel)
        {
            try
            {
                _parkingLotManager.RemoveVehicle(vehicleModel);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPut]
        [Route("update-parking-lot")]
        public IActionResult UpdateParkingLot([FromBody] ParkingLotModel parkingLotModel)
        {

            try
            {
                _parkingLotManager.UpdateParkingLot(parkingLotModel);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("update-client")]
        public IActionResult UpdateClient([FromBody] ClientModel clientModel)
        {
            try
            {
                _parkingLotManager.UpdateClient(clientModel);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("update-vehicle")]
        public IActionResult UpdateVehicle([FromBody] VehicleModel vehicleModel)
        {
            try
            {
                _parkingLotManager.UpdateVehicle(vehicleModel);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("vehicles-parkinglot")]
        public IActionResult GetListOfVehiclesOnParkingLot([FromQuery] string parkingLotName)
        {
            try
            {
                List<Vehicle> vehicles = _parkingLotManager.GetVehiclesAtParkingLot(parkingLotName);
                return Ok(vehicles);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("vehicles-client")]
        public IActionResult GetListOfVehiclesOfClient([FromQuery] string firstName, string lastName)
        {
            try
            {
                List<VehicleViewModel> vehicles = _parkingLotManager.GetVehiclesOfClient(firstName, lastName);
                return Ok(vehicles);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("activities-parking-lot")]
        public IActionResult GetListOfActivitiesOfParkingLot([FromQuery] string parkingLotName)
        {
            try
            {
                List<ParkingLotActivity> activities = _parkingLotManager.GetParkingLotActivities(parkingLotName);
                List<ParkingLotActivityViewModel> viewActivities = new List<ParkingLotActivityViewModel>();

                if (activities == null)
                    return NoContent();


                foreach (ParkingLotActivity activity in activities)
                {
                    ParkingLotActivityViewModel viewActivity = _parkingLotManager.GetParkingLotActivityViewModel(activity);

                    viewActivities.Add(viewActivity);
                }

                return Ok(viewActivities);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
