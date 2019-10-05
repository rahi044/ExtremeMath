using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using Infrastructure.Interfaces;

namespace ExtremeMathBll
{
    public static class ExtensionMethods
    {
        public static bool IsDoubleDataType(this object obj)
        {
            try
            {
                double d = Double.Parse(obj.ToString());
                return true;
            }
            catch
            {
                return false;
            }
        }
        public static bool IsNumericDataType(this object obj)
        {
            return obj.ToString().All(char.IsDigit);
        }
    }
}