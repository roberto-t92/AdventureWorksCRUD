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
                        int Id = Convert.ToInt32(ef.Address.Max(field => (int?)field.AddressID) + 1 ?? 1);
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

        [HttpPost]
        public ActionResult PostPerson(Person PE)
        {
            try
            {
                using (dbConn ef = new dbConn())
                {
                    Person per = new Person();
                    BusinessEntity bss = new BusinessEntity();

                    if (PE.OperationType == "Save")
                    {
                        int Id = Convert.ToInt32(ef.Person.Max(field => (int?)field.BusinessEntityID) + 1 ?? 1);
                        per.BusinessEntityID = Id;

                        per.PersonType = PE.PersonType;
                        per.NameStyle = PE.NameStyle;
                        per.Title = PE.Title;
                        per.FirstName = PE.FirstName;
                        per.MiddleName = PE.MiddleName;
                        per.LastName = PE.LastName;
                        per.Suffix = PE.Suffix;
                        per.EmailPromotion = PE.EmailPromotion;
                        per.rowguid = PE.rowguid;
                        per.ModifiedDate = DateTime.Now;
                        ef.Person.Add(per);
                        ef.SaveChanges();
                    }

                    if (PE.OperationType == "Update")
                    {
                        per = ef.Person.First(row => row.BusinessEntityID == PE.BusinessEntityID);
                        per.PersonType = PE.PersonType;
                        per.NameStyle = PE.NameStyle;
                        per.Title = PE.Title;
                        per.FirstName = PE.FirstName;
                        per.MiddleName = PE.MiddleName;
                        per.LastName = PE.LastName;
                        per.Suffix = PE.Suffix;
                        per.EmailPromotion = PE.EmailPromotion;
                        per.rowguid = PE.rowguid;
                        per.ModifiedDate = DateTime.Now;
                        ef.SaveChanges();
                    }

                    if (PE.OperationType == "Delete")
                    {
                        per = ef.Person.FirstOrDefault(row => row.BusinessEntityID == PE.BusinessEntityID);
                        ef.Person.Remove(per);
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