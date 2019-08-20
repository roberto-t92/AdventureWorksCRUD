using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using AdventureWorksCRUD.Models;

namespace AdventureWorksCRUD.Controllers
{
    public class ProductionController : Controller
    {
        public ActionResult Production()
        {
            return View();
        }

        #region "Culture"

        [HttpGet]
        public ActionResult GetCulture()
        {
            using (dbConn ef = new dbConn())
            {
                List<Culture> list = ef.Culture.ToList();
                return Json(new { data = list }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult PostCulture(Culture CL)
        {
            try
            {
                using (dbConn ef = new dbConn())
                {
                    Culture cl = new Culture();

                    if (CL.OperationType == "Save")
                    {
                        cl.CultureID = CL.CultureID;
                        cl.Name = CL.Name;
                        cl.ModifiedDate = DateTime.Now;
                        ef.Culture.Add(cl);
                        ef.SaveChanges();
                    }

                    if (CL.OperationType == "Update")
                    {
                        cl = ef.Culture.First(row => row.CultureID == CL.CultureID);
                        cl.Name = CL.Name;
                        cl.ModifiedDate = DateTime.Now;
                        ef.SaveChanges();
                    }

                    if (CL.OperationType == "Delete")
                    {
                        cl = ef.Culture.FirstOrDefault(row => row.CultureID == CL.CultureID);
                        ef.Culture.Remove(cl);
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