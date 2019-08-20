using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using AdventureWorksCRUD.Models;

namespace AdventureWorksCRUD.Controllers
{
    public class PersonController : Controller
    {
        public ActionResult Person()
        {
            return View();
        }

        #region "Address"

        [HttpGet]
        public ActionResult GetAddress()
        {
            using (dbConn ef = new dbConn())
            {
                List<Address> list = new List<Address>();
                list = (from tabla in ef.Address orderby tabla.AddressID descending select tabla).Take(100).ToList();
                return Json(new { data = list }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult PostAddress(Address AD)
        {
            try
            {
                using (dbConn ef = new dbConn())
                {
                    Address addr = new Address();

                    if (AD.OperationType == "Save")
                    {
                        int Id = Convert.ToInt16(ef.Address.Max(field => (int?)field.AddressID) + 1 ?? 1);
                        addr.AddressID = Id;
                        addr.AddressLine1 = AD.AddressLine1;
                        addr.AddressLine2 = AD.AddressLine2;
                        addr.City = AD.City;
                        addr.StateProvinceID = AD.StateProvinceID;
                        addr.PostalCode = AD.PostalCode;
                        addr.rowguid = AD.rowguid;
                        addr.ModifiedDate = DateTime.Now;
                        ef.Address.Add(addr);
                        ef.SaveChanges();
                    }

                    if (AD.OperationType == "Update")
                    {
                        addr = ef.Address.First(row => row.AddressID == AD.AddressID);
                        addr.AddressLine1 = AD.AddressLine1;
                        addr.AddressLine2 = AD.AddressLine2;
                        addr.City = AD.City;
                        addr.PostalCode = AD.PostalCode;
                        addr.rowguid = AD.rowguid;
                        addr.ModifiedDate = DateTime.Now;
                        ef.SaveChanges();
                    }

                    if (AD.OperationType == "Delete")
                    {
                        addr = ef.Address.FirstOrDefault(row => row.AddressID == AD.AddressID);
                        ef.Address.Remove(addr);
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

        #region "Person"

        [HttpGet]
        public ActionResult GetPerson()
        {
            using (dbConn ef = new dbConn())
            {
                List<Person> list = (from tabla in ef.Person orderby tabla.BusinessEntityID descending select tabla).Take(100).ToList();
                return Json(new { data = list }, JsonRequestBehavior.AllowGet);
            }
        }

        #endregion
    }
}