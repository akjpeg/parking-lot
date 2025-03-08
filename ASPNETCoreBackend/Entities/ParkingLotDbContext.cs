using Microsoft.EntityFrameworkCore;

namespace ASPNETCoreBackend.Entities
{
    public class ParkingLotDbContext: DbContext
    {
        public ParkingLotDbContext(DbContextOptions<ParkingLotDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("parking_lot_system");
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Client>().ToTable("clients");
            modelBuilder.Entity<Vehicle>().ToTable("vehicles");
            modelBuilder.Entity<ParkingLot>().ToTable("parking_lots");
            modelBuilder.Entity<ParkingLotActivity>().ToTable("parking_lot_activities");


            modelBuilder.Entity<Client>()
                .Property(c => c.RegistrationDate)
                .ValueGeneratedOnAdd()
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            modelBuilder.Entity<ParkingLotActivity>()
                .Property(c => c.StartDate)
                .ValueGeneratedOnAdd()
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            modelBuilder.Entity<ParkingLot>()
                .HasIndex(p => p.Name)
                .IsUnique();

            modelBuilder.Entity<Vehicle>()
                .HasIndex(v => v.PlateNumber)
                .IsUnique();
        }

        public DbSet<ParkingLot> ParkingLots { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<ParkingLotActivity> ParkingLotActivities { get; set; }
    }
}
