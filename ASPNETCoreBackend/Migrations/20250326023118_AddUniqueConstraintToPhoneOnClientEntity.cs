using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ASPNETCoreBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddUniqueConstraintToPhoneOnClientEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_clients_PhoneNumber",
                schema: "parking_lot_system",
                table: "clients",
                column: "PhoneNumber",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_clients_PhoneNumber",
                schema: "parking_lot_system",
                table: "clients");
        }
    }
}
