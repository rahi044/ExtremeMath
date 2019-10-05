using System;
using System.Runtime.Serialization;

namespace Infrastructure.Models
{
    [DataContract]
    public class QueryParams
    {
        [DataMember]
        public int PageSize { get; set; }

        [DataMember]
        public int PageNumber { get; set; }

        [DataMember]
        public string SearchText { get; set; }

        [DataMember]
        public DateTime? Date { get; set; }

        [DataMember]
        public DateTime? StartDate { get; set; }

        [DataMember]
        public DateTime? EndDate { get; set; }
    }
}