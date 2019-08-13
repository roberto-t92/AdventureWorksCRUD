using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using AdventureWorksCRUD.Models;
using System.Diagnostics;

namespace AdventureWorksCRUD.Controllers
{
    public class HumanResourcesController : Controller
    {
        public ActionResult HumanResources()
        {
            return View();
        }

        #region "Department"

        [HttpGet]
        public ActionResult GetDepartment()
        {
            using (dbConn ef = new dbConn())
            {
                List<Department> list = ef.Department.ToList();
                return Json(new { data = list }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult PostDepartment(Department DM)
        {
            try
            {
                using (dbConn ef = new dbConn())
                {
                    Department dept = new Department();

                    if (DM.OperationType == "Save")
                    {
                        short Id = Convert.ToInt16(ef.Department.Max(field => (short?)field.DepartmentID) + 1 ?? 1);
                        dept.DepartmentID = Id;
                        dept.Name = DM.Name;
                        dept.GroupName = DM.GroupName;
                        dept.ModifiedDate = DateTime.Now;
                        ef.Department.Add(dept);
                        ef.SaveChanges();
                    }

                    if (DM.OperationType == "Update")
                    {
                        dept = ef.Department.First(row => row.DepartmentID == DM.DepartmentID);
                        dept.Name = DM.Name;
                        dept.GroupName = DM.GroupName;
                        dept.ModifiedDate = DateTime.Now;
                        ef.SaveChanges();
                    }

                    if (DM.OperationType == "Delete")
                    {
                        dept = ef.Department.FirstOrDefault(row => row.DepartmentID == DM.DepartmentID);
                        ef.Department.Remove(dept);
                        ef.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                return new HttpStatusCodeResult(500, " :( Something bad happened: " + ex.Message);
            }
            return Json(new { success = true, Message = "Successful", JsonRequestBehavior.AllowGet });
        }

        #endregion

        #region "Employee"

        [HttpGet]
        public ActionResult GetEmployee()
        {
            using (dbConn ef = new dbConn())
            {
                List<Employee> list = ef.Employee.ToList();
                return Json(new { data = list }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult PostEmployee(Employee EM)
        {
            try
            {
                using (dbConn ef = new dbConn())
                {
                    Employee emp = new Employee();

                    if (EM.OperationType == "Save")
                    {
                        short Id = Convert.ToInt16(ef.Employee.Max(field => (short?)field.BusinessEntityID) + 1 ?? 1);
                        emp.NationalIDNumber = EM.NationalIDNumber;
                        emp.LoginID = EM.LoginID;
                        emp.OrganizationLevel = EM.OrganizationLevel;
                        emp.JobTitle = EM.JobTitle;
                        emp.BirthDate = EM.BirthDate;
                        emp.MaritalStatus = EM.MaritalStatus;
                        emp.Gender = EM.Gender;
                        emp.HireDate = EM.HireDate;
                        emp.SalariedFlag = EM.SalariedFlag;
                        emp.VacationHours = EM.VacationHours;
                        emp.SickLeaveHours = EM.SickLeaveHours;
                        emp.CurrentFlag = EM.CurrentFlag;
                        emp.rowguid = EM.rowguid;

                        ef.Employee.Add(emp);
                        ef.SaveChanges();
                    }

                    if (EM.OperationType == "Update")
                    {
                        emp = ef.Employee.First(row => row.BusinessEntityID == EM.BusinessEntityID);
                        emp.NationalIDNumber = EM.NationalIDNumber;
                        emp.LoginID = EM.LoginID;
                        emp.OrganizationLevel = EM.OrganizationLevel;
                        emp.JobTitle = EM.JobTitle;
                        emp.BirthDate = EM.BirthDate;
                        emp.MaritalStatus = EM.MaritalStatus;
                        emp.Gender = EM.Gender;
                        emp.HireDate = EM.HireDate;
                        emp.SalariedFlag = EM.SalariedFlag;
                        emp.VacationHours = EM.VacationHours;
                        emp.SickLeaveHours = EM.SickLeaveHours;
                        emp.CurrentFlag = EM.CurrentFlag;
                        emp.rowguid = EM.rowguid;
                        emp.ModifiedDate = DateTime.Now;
                        ef.SaveChanges();
                    }

                    if (EM.OperationType == "Delete")
                    {
                        emp = ef.Employee.FirstOrDefault(row => row.BusinessEntityID == EM.BusinessEntityID);
                        ef.Employee.Remove(emp);
                        ef.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                return new HttpStatusCodeResult(500, " :( Something bad happened: " + ex.Message);
            }
            return Json(new { success = true, Message = "Successful", JsonRequestBehavior.AllowGet });
        }

        #endregion
    }
}