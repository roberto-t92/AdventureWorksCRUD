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
                dbConn ef = new dbConn();
                List<Address> list = ef.Address.ToList();
                return Json(new { data = list }, JsonRequestBehavior.AllowGet);

            //using (dbConn ef = new dbConn())
            //{
            //    List<Address> list = ef.Address.ToList();
            //    return Json(new { data = list }, JsonRequestBehavior.AllowGet);
            //}
        }

        #endregion
    }
}