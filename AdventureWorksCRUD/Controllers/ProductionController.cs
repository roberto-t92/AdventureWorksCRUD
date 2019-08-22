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
        public ActionResult GetLocation()
        {
            using (dbConn ef = new dbConn())
            {
                List<Location> list = ef.Location.ToList();
                return Json(new { data = list }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult PostLocation(Location LC)
        {
            try
            {
                using (dbConn ef = new dbConn())
                {
                    Location lc = new Location();

                    if (LC.OperationType == "Save")
                    {
                        short id = Convert.ToInt16(ef.Location.Max(field => (short?)field.LocationID) + 1 ?? 1);
                        lc.LocationID = LC.LocationID;
                        lc.Name = LC.Name;
                        lc.CostRate = LC.CostRate;
                        lc.Availability = LC.Availability;
                        lc.ModifiedDate = DateTime.Now;
                        ef.Location.Add(lc);
                        ef.SaveChanges();
                    }

                    if (LC.OperationType == "Update")
                    {
                        lc = ef.Location.First(row => row.LocationID == LC.LocationID);
                        lc.Name = LC.Name;
                        lc.CostRate = LC.CostRate;
                        lc.Availability = LC.Availability;
                        lc.ModifiedDate = DateTime.Now;
                        ef.SaveChanges();
                    }

                    if (LC.OperationType == "Delete")
                    {
                        lc = ef.Location.FirstOrDefault(row => row.LocationID == LC.LocationID);
                        ef.Location.Remove(lc);
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