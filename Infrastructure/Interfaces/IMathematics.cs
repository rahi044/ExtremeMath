using System.Threading.Tasks;

namespace Infrastructure.Interfaces
{
    public interface IMathematics
    {
        object GetSummation(object number1, object number2);
        Task<string> GetSubtraction(string number1, string number2);
    }
}