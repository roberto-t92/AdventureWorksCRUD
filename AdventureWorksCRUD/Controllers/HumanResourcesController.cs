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
                        int Id = Convert.ToInt32(ef.Employee.Max(field => (int?)field.BusinessEntityID) + 1 ?? 1);
                        emp.BusinessEntityID = Id;
                        emp.NationalIDNumber = EM.NationalIDNumber;
                        emp.LoginID = EM.LoginID;
                        //emp.OrganizationLevel = EM.OrganizationLevel;
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

                        ef.Employee.Add(emp);
                        ef.SaveChanges();
                    }

                    if (EM.OperationType == "Update")
                    {
                        emp = ef.Employee.First(row => row.BusinessEntityID == EM.BusinessEntityID);
                        emp.NationalIDNumber = EM.NationalIDNumber;
                        emp.LoginID = EM.LoginID;
                        //emp.OrganizationLevel = Convert.ToInt16(EM.OrganizationLevel);
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

        #region "Employee Pay History"

        [HttpGet]
        public ActionResult GetEmployeePayHis()
        {
            using (dbConn ef = new dbConn())
            {
                List<EmployeePayHistory> list = ef.EmployeePayHistory.ToList();
                return Json(new { data = list }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult PostEmployeePayHis(EmployeePayHistory EPH)
        {
            try
            {
                using (dbConn ef = new dbConn())
                {
                    EmployeePayHistory eph = new EmployeePayHistory();

                    if (EPH.OperationType == "Save")
                    {
                        int Id = Convert.ToInt32(ef.EmployeePayHistory.Max(field => (int?)field.BusinessEntityID) + 1 ?? 1);
                        eph.BusinessEntityID = Id;
                        eph.RateChangeDate = EPH.RateChangeDate;
                        eph.Rate = EPH.Rate;
                        eph.PayFrequency = EPH.PayFrequency;
                        eph.ModifiedDate = DateTime.Now;

                        ef.EmployeePayHistory.Add(eph);
                        ef.SaveChanges();
                    }

                    if (EPH.OperationType == "Update")
                    {
                        eph = ef.EmployeePayHistory.First(row => row.BusinessEntityID == EPH.BusinessEntityID);
                        eph.RateChangeDate = EPH.RateChangeDate;
                        eph.Rate = EPH.Rate;
                        eph.PayFrequency = EPH.PayFrequency;
                        eph.ModifiedDate = DateTime.Now;
                        ef.SaveChanges();
                    }

                    if (EPH.OperationType == "Delete")
                    {
                        eph = ef.EmployeePayHistory.FirstOrDefault(row => row.BusinessEntityID == EPH.BusinessEntityID);
                        ef.EmployeePayHistory.Remove(eph);
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

        #region "Shift"

        [HttpGet]
        public ActionResult GetShift()
        {
            using (dbConn ef = new dbConn())
            {
                List<Shift> list = ef.Shift.ToList();
                return Json(new { data = list }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult PostShift(Shift SH)
        {
            try
            {
                using (dbConn ef = new dbConn())
                {
                    Shift sh = new Shift();

                    if (SH.OperationType == "Save")
                    {
                        byte Id = Convert.ToByte(ef.Shift.Max(field => (byte?)field.ShiftID) + 1 ?? 1);
                        sh.ShiftID = Id;
                        sh.Name = SH.Name;
                        sh.StartTime = SH.StartTime;
                        sh.EndTime = SH.EndTime;
                        sh.ModifiedDate = DateTime.Now;

                        ef.Shift.Add(sh);
                        ef.SaveChanges();
                    }

                    if (SH.OperationType == "Update")
                    {
                        sh = ef.Shift.First(row => row.ShiftID == SH.ShiftID);
                        sh.Name = SH.Name;
                        sh.StartTime = SH.StartTime;
                        sh.EndTime = SH.EndTime;
                        sh.ModifiedDate = DateTime.Now;
                        ef.SaveChanges();
                    }

                    if (SH.OperationType == "Delete")
                    {
                        sh = ef.Shift.FirstOrDefault(row => row.ShiftID == SH.ShiftID);
                        ef.Shift.Remove(sh);
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