//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AdventureWorksCRUD.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class BillOfMaterials
    {
        public int BillOfMaterialsID { get; set; }
        public System.DateTime StartDate { get; set; }
        public Nullable<System.DateTime> EndDate { get; set; }
        public short BOMLevel { get; set; }
        public decimal PerAssemblyQty { get; set; }
        public System.DateTime ModifiedDate { get; set; }
    
        public virtual Product Product { get; set; }
        public virtual Product Product1 { get; set; }
        public virtual UnitMeasure UnitMeasure { get; set; }
    }
}
