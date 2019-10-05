using System;
using System.Threading.Tasks;
using EfDataAccess;
using Infrastructure.Interfaces;
using Infrastructure.Models;

namespace ExtremeMathBll
{
    public class MathematicsDataAccess : IMathematicsDataAccess
    {
        private readonly IMathematicsDataAccess _dataService = new MathEfDataAccess();

        public async Task<GridItems<AMath>> GetMaths(QueryParams queryParams)
        {
            return await _dataService.GetMaths(queryParams);
        }

        public async Task SaveMath(AMath math)
        {
            await _dataService.SaveMath(math);
        }
    }
}