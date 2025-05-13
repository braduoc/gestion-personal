using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Mysqlx.Crud;
using WebApplication1.Context;
using WebApplication1.Dto;
using static WebApplication1.Context.CustomerDB;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/controller")]
    public class CustomerController : Controller
    {
        public readonly CustomerDB customerOptions;
        public readonly IUpdateCustomerUseCase updateCustomer;

        public CustomerController(CustomerDB _customerOptions,IUpdateCustomerUseCase _updateCustomer) 
        {
            customerOptions = _customerOptions;
            updateCustomer = _updateCustomer;
        }
        [HttpGet]
        public async Task<List<CustomerEntity>> GetAllCustomerDto()
        {
            return await customerOptions.GetAllCustomers();
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCustomerDtoById(int id)
        {
            CustomerEntity result = await customerOptions.GetByIdCustomer(id);
            return new OkObjectResult(result.ToDto());
        }
        [HttpPost]
        public async Task<bool> CreateCustomerDtoById(CreateCustomerDto createCustomer)
        {
            var creado = await customerOptions.AddCustomer(createCustomer);
            var resul = false;
            if (creado != null) 
                resul = true;
            return resul;
        }
        [HttpPut]
        public async Task<IActionResult> UpdateCustomer(CustomerDto customer)
        {
            var result = await updateCustomer.UpdateCustomer(customer);
            if(result == null)
                return new NotFoundResult();
            return new OkObjectResult(result);
        }

        
        [HttpDelete("{id}")]
        public async Task<bool> DeleteCustomerDtoById(int id)
        {
            var result = await customerOptions.DeleteByIdCustomer(id);
            return result;            
        }

    }
}
