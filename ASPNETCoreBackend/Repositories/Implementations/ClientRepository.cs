using ASPNETCoreBackend.Entities;
using ASPNETCoreBackend.Repositories.Interfaces;

namespace ASPNETCoreBackend.Repositories.Implementations
{
    public class ClientRepository : IClientRepository
    {
        private readonly ParkingLotDbContext _context;

        public ClientRepository(ParkingLotDbContext dbContext)
        {
            _context = dbContext;
        }

        public void AddClient(Client client)
        {
            _context.Clients.Add(client);
            _context.SaveChanges();
        }

        public Client GetByFullName(string firstName, string lastName)
        {
            Client client = _context.Clients.FirstOrDefault(c => (c.FirstName == firstName && c.LastName == lastName));

            return client;
        }

        public Client GetById(int id)
        {
            Client client = _context.Clients.FirstOrDefault(c => c.ClientId == id);

            return client;
        }

        public void RemoveClient(Client client)
        {
            _context.Clients.Remove(client);
            _context.SaveChanges();  
        }

        public void UpdateClient(Client client)
        {
            _context.Clients.Update(client);
            _context.SaveChanges();
        }
    }
}
