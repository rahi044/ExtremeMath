using System;
using System.Runtime.Serialization;

namespace Infrastructure.Models
{
    [DataContract]
    public class AMath
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public User User { get; set; }

        [DataMember]
        public string FirstNumber { get; set; }

        [DataMember]
        public string SecondNumber { get; set; }

        [DataMember]
        public string Result { get; set; }

        [DataMember]
        public DateTime Date { get; set; }
    }
}