using System;
using Infrastructure.Interfaces;

namespace ExtremeMathBll
{
    public class DoubleCalculation : ICalculation
    {
        public object Add(object number1, object number2)
        {
            var result = (object) (Convert.ToDouble(number1) + Convert.ToDouble(number2));
            return result;
        }

        public object Subtract(object number1, object number2)
        {
            throw new NotImplementedException();
        }
    }
}