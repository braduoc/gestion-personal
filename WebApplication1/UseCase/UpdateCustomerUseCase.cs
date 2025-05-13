using WebApplication1.Context;
using ZstdSharp;
using static WebApplication1.Context.CustomerDB;

namespace WebApplication1.Dto
{
        public class UpdateCustomerUseCase : IUpdateCustomerUseCase
        {
            public readonly CustomerDB customerOptions;
            public UpdateCustomerUseCase (CustomerDB _customerOptions)
            {
                customerOptions = _customerOptions;
            }
        public async Task<CustomerDto> UpdateCustomer(CustomerDto customer)
        {
            var entity = await customerOptions.GetByIdCustomer(customer.Id); 
            if (entity == null)
                return null;     
            entity.First_Name = customer.First_Name;
            entity.Last_Name = customer.Last_Name;
            entity.Email = customer.Email;
            entity.Phone = customer.Phone;
            entity.Address = customer.Address;

            await customerOptions.ActualizarCustomer(entity);
            return entity.ToDto();  
        }
        }

        public interface IUpdateCustomerUseCase
        {
            Task<CustomerDto> UpdateCustomer(CustomerDto customer);
        }
}