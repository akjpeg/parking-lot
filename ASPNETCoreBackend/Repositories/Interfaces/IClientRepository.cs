using ASPNETCoreBackend.Entities;

namespace ASPNETCoreBackend.Repositories.Interfaces
{
    public interface IClientRepository
    {
        Client GetById(int id);
        Client GetByFullName(string firstName, string lastName);
        Client GetByPhoneNumber(string phoneNumber);
        void AddClient(Client client);
        void RemoveClient(Client client);
        void UpdateClient(Client client);
    }
}
