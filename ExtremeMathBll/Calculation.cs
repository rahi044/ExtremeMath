using Infrastructure.Interfaces;

namespace ExtremeMathBll
{
    public class Calculation
    {
        private ICalculation _service;

        public ICalculation Service
        {
            set { this._service = value; }
        }

        public object Add(object number1, object number2)
        {
            return this._service.Add(number1, number2);
        }

        public object Subtract(object number1, object number2)
        {
            return this._service.Subtract(number1, number2);
        }
    }
}