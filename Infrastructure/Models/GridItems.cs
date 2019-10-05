using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Infrastructure.Models
{
    [DataContract]
    public class GridItems<T>
    {
        public GridItems()
        {
            Items = new List<T>();
        }

        [DataMember]
        public List<T> Items { get; set; }

        [DataMember]
        public int TotalItems { get; set; }
    }
}