namespace AdventureWorksCRUD.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("HumanResources.EmployeeDepartmentHistory")]
    public partial class EmployeeDepartmentHistory
    {
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int BusinessEntityID { get; set; }

        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public short DepartmentID { get; set; }

        [Key]
        [Column(Order = 2)]
        public byte ShiftID { get; set; }

        [Key]
        [Column(Order = 3, TypeName = "date")]
        public DateTime StartDate { get; set; }

        [Column(TypeName = "date")]
        public DateTime? EndDate { get; set; }

        public DateTime ModifiedDate { get; set; }

        [NotMapped]
        public string OperationType { get; set; }

        public virtual Department Department { internal get; set; }

        public virtual Employee Employee { internal get; set; }

        public virtual Shift Shift { internal get; set; }
    }
}
