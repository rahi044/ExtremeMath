using System.Threading.Tasks;
using Infrastructure.Models;

namespace Infrastructure.Interfaces
{
    public interface IMathematicsDataAccess
    {
        Task SaveMath(AMath math);
        Task<GridItems<AMath>> GetMaths(QueryParams queryParams);
    }
}