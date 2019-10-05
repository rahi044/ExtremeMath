using System;
using System.Threading.Tasks;
using Infrastructure.Interfaces;
using EfDataAccess;
using Infrastructure.Models;

namespace ExtremeMathBll
{
    public class Mathematics : IMathematics
    {
        private readonly ICalculation _stringService = new StringCalculation();
        private readonly ICalculation _doubleService = new DoubleCalculation();
        
        public object GetSummation(object number1, object number2)
        {
            var calculation = new Calculation();

            var isDouble = number1.IsDoubleDataType() && number2.IsDoubleDataType();
            if (isDouble)
            {
                calculation.Service = _doubleService;
            }
            else
            {
                var isNumeric = number1.IsNumericDataType() && number2.IsNumericDataType();
                if (isNumeric)
                    calculation.Service = _stringService;
                else
                    throw new InvalidOperationException();
            }

            var result = calculation.Add(number1, number2);
            return result;
        }

        public Task<string> GetSubtraction(string number1, string number2)
        {
            throw new NotImplementedException();
        }
    }
}