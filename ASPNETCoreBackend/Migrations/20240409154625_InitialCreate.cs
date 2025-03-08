using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ASPNETCoreBackend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "parking_lot_system");

            migrationBuilder.CreateTable(
                name: "clients",
                schema: "parking_lot_system",
                columns: table => new
                {
                    ClientId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    PhoneNumber = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: true),
                    RegistrationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_clients", x => x.ClientId);
                });

            migrationBuilder.CreateTable(
                name: "parking_lots",
                schema: "parking_lot_system",
                columns: table => new
                {
                    ParkingLotId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Address = table.Column<string>(type: "text", nullable: false),
                    PricePerAdditionalHour = table.Column<decimal>(type: "numeric", nullable: false),
                    PriceFirstHour = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_parking_lots", x => x.ParkingLotId);
                });

            migrationBuilder.CreateTable(
                name: "vehicles",
                schema: "parking_lot_system",
                columns: table => new
                {
                    VehicleId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PlateNumber = table.Column<string>(type: "text", nullable: false),
                    Brand = table.Column<string>(type: "text", nullable: false),
                    Model = table.Column<string>(type: "text", nullable: false),
                    Color = table.Column<string>(type: "text", nullable: false),
                    Year = table.Column<int>(type: "integer", nullable: true),
                    ClientId = table.Column<int>(type: "integer", nullable: false),
                    ParkingLotId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_vehicles", x => x.VehicleId);
                    table.ForeignKey(
                        name: "FK_vehicles_clients_ClientId",
                        column: x => x.ClientId,
                        principalSchema: "parking_lot_system",
                        principalTable: "clients",
                        principalColumn: "ClientId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_vehicles_parking_lots_ParkingLotId",
                        column: x => x.ParkingLotId,
                        principalSchema: "parking_lot_system",
                        principalTable: "parking_lots",
                        principalColumn: "ParkingLotId");
                });

            migrationBuilder.CreateTable(
                name: "parking_lot_activities",
                schema: "parking_lot_system",
                columns: table => new
                {
                    ParkingLotActivityId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ParkingLotId = table.Column<int>(type: "integer", nullable: false),
                    ClientId = table.Column<int>(type: "integer", nullable: false),
                    VehicleId = table.Column<int>(type: "integer", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ParkingValue = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_parking_lot_activities", x => x.ParkingLotActivityId);
                    table.ForeignKey(
                        name: "FK_parking_lot_activities_clients_ClientId",
                        column: x => x.ClientId,
                        principalSchema: "parking_lot_system",
                        principalTable: "clients",
                        principalColumn: "ClientId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_parking_lot_activities_parking_lots_ParkingLotId",
                        column: x => x.ParkingLotId,
                        principalSchema: "parking_lot_system",
                        principalTable: "parking_lots",
                        principalColumn: "ParkingLotId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_parking_lot_activities_vehicles_VehicleId",
                        column: x => x.VehicleId,
                        principalSchema: "parking_lot_system",
                        principalTable: "vehicles",
                        principalColumn: "VehicleId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_parking_lot_activities_ClientId",
                schema: "parking_lot_system",
                table: "parking_lot_activities",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_parking_lot_activities_ParkingLotId",
                schema: "parking_lot_system",
                table: "parking_lot_activities",
                column: "ParkingLotId");

            migrationBuilder.CreateIndex(
                name: "IX_parking_lot_activities_VehicleId",
                schema: "parking_lot_system",
                table: "parking_lot_activities",
                column: "VehicleId");

            migrationBuilder.CreateIndex(
                name: "IX_parking_lots_Name",
                schema: "parking_lot_system",
                table: "parking_lots",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_vehicles_ClientId",
                schema: "parking_lot_system",
                table: "vehicles",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_vehicles_ParkingLotId",
                schema: "parking_lot_system",
                table: "vehicles",
                column: "ParkingLotId");

            migrationBuilder.CreateIndex(
                name: "IX_vehicles_PlateNumber",
                schema: "parking_lot_system",
                table: "vehicles",
                column: "PlateNumber",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "parking_lot_activities",
                schema: "parking_lot_system");

            migrationBuilder.DropTable(
                name: "vehicles",
                schema: "parking_lot_system");

            migrationBuilder.DropTable(
                name: "clients",
                schema: "parking_lot_system");

            migrationBuilder.DropTable(
                name: "parking_lots",
                schema: "parking_lot_system");
        }
    }
}
