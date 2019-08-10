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

        //[HttpPost]
        //public ActionResult PostDepartment(Department DM)
        //{
        //    try
        //    {
        //        using (dbConn ef = new dbConn())
        //        {
        //            Department dept = new Department();

        //            short Id = Convert.ToInt16(ef.Department.Max(field => (short?)field.DepartmentID) + 1 ?? 1);
        //            dept.DepartmentID = Id;
        //            dept.Name = DM.Name;
        //            dept.GroupName = DM.GroupName;
        //            dept.ModifiedDate = DateTime.Now;
        //            ef.Department.Add(dept);
        //            ef.SaveChanges();
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return new HttpStatusCodeResult(500, " :( Something bad happened: " + ex.Message);
        //    }
        //    return Json(new { success = true, Message = "Successful", JsonRequestBehavior.AllowGet });
        //}

        [HttpPost]
        public ActionResult PostDepartment(Department DM)
        {
            try
            {
                using (dbConn ef = new dbConn())
                {
                    Department dept = new Department();

                    if(DM.OperationType == "Save")
                    {
                        short Id = Convert.ToInt16(ef.Department.Max(field => (short?)field.DepartmentID) + 1 ?? 1);
                        dept.DepartmentID = Id;
                        dept.Name = DM.Name;
                        dept.GroupName = DM.GroupName;
                        dept.ModifiedDate = DateTime.Now;
                        ef.Department.Add(dept);
                        ef.SaveChanges();
                    }

                    if(DM.OperationType == "Update")
                    {
                        dept = ef.Department.First(row => row.DepartmentID == DM.DepartmentID);
                        dept.Name = DM.Name;
                        dept.GroupName = DM.GroupName;
                        dept.ModifiedDate = DateTime.Now;
                        ef.SaveChanges();
                    }

                    if(DM.OperationType == "Delete")
                    {

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