using EfDataAccess;
using ExtremeMathBll;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace ExtremeMath.Controllers
{
    public class ExtremeMathController : ApiController
    {
        private readonly IMathematics _mathService = new Mathematics();
        private readonly IMathematicsDataAccess _dataService = new MathematicsDataAccess();

        [HttpPost]
        public Task<GridItems<AMath>> GetMaths(QueryParams queryParams)
        {
            return _dataService.GetMaths(queryParams);
        }

        [HttpPost]
        public Task DoSum(AMath math)
        {
            var result = _mathService.GetSummation(math.FirstNumber, math.SecondNumber);
            math.Result = result.ToString();
            return _dataService.SaveMath(math);
        }
    }
}