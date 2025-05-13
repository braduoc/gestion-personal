using Microsoft.EntityFrameworkCore;
using WebApplication1.Dto;

namespace WebApplication1.Context;

    public class CustomerDB : DbContext
    {

    public CustomerDB(DbContextOptions<CustomerDB> options) : base(options)
    {
    
    }
    public DbSet<CustomerEntity> Customer {  get; set; }
    public async Task<List<CustomerEntity>> GetAllCustomers()
    {
        return await Customer.ToListAsync();
    }

    public async Task<CustomerEntity?> GetByIdCustomer(int? id)
    {
        return await Customer.FirstOrDefaultAsync(x => x.Id == id);    
    }
    public async Task<CustomerEntity> AddCustomer(CreateCustomerDto createCustomer)
    {
        var newCustomer = new CustomerEntity()
        {
            Id = null,
            First_Name = createCustomer.Name,
            Last_Name = createCustomer.LastName,
            Email = createCustomer.Email,
            Phone = createCustomer.Phone,
            Address = createCustomer.Address
        };
        var response = await Customer.AddAsync(newCustomer);
        await SaveChangesAsync();
        return await GetByIdCustomer(response.Entity.Id ?? throw new Exception("no se a podido crear el elemento"));
    }

    public async Task<bool> ActualizarCustomer(CustomerEntity customer)
    {
        Customer.Update(customer);
        await SaveChangesAsync();
        return true;
    }
    public async Task<bool> DeleteByIdCustomer(int id)
    {
        var entidad = await GetByIdCustomer(id);
        Customer.Remove(entidad);
        SaveChanges();
        return true;    
    }

    public class CustomerEntity
    {

            public int? Id { get; set; }
            public string First_Name { get; set; }
            public string Last_Name { get; set; }
            public string Email { get; set; }
            public string Phone { get; set; }
            public string Address { get; set; }
            public CustomerDto ToDto()
            {
                return new CustomerDto{
                    Id = Id,
                    First_Name = First_Name,
                    Last_Name = Last_Name,
                    Email = Email,
                    Phone = Phone,
                    Address = Address
                };
            }
            
    }
    

}


