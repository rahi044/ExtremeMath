//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EfDataAccess
{
    using System;
    using System.Collections.Generic;
    
    public partial class tbl_math
    {
        public int id { get; set; }
        public string number_1 { get; set; }
        public string number_2 { get; set; }
        public string summation { get; set; }
        public int created_by { get; set; }
        public System.DateTime created_on { get; set; }
    
        public virtual tbl_user tbl_user { get; set; }
    }
}
