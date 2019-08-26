using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using AdventureWorksCRUD.Models;

namespace AdventureWorksCRUD.Controllers
{
    public class SalesController : Controller
    {
        public ActionResult Sales()
        {
            return View();
        }

        #region "Credit Card"

        [HttpGet]
        public ActionResult GetCreditCard()
        {
            using (dbConn ef = new dbConn())
            {
                List<CreditCard> list = (from tabla in ef.CreditCard orderby tabla.CreditCardID descending select tabla).Take(100).ToList();
                return Json(new { data = list }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult PostCreditCard(CreditCard CC)
        {
            try
            {
                using (dbConn ef = new dbConn())
                {
                    CreditCard cc = new CreditCard();

                    if (CC.OperationType == "Save")
                    {
                        int id = Convert.ToInt32(ef.CreditCard.Max(field => (int?)field.CreditCardID) + 1 ?? 1);
                        cc.CreditCardID = id;
                        cc.CardType = CC.CardType;
                        cc.CardNumber = CC.CardNumber;
                        cc.ExpMonth = CC.ExpMonth;
                        cc.ExpYear = CC.ExpYear;
                        cc.ModifiedDate = DateTime.Now;
                        ef.CreditCard.Add(cc);
                        ef.SaveChanges();
                    }

                    if (CC.OperationType == "Update")
                    {
                        cc = ef.CreditCard.First(row => row.CreditCardID == CC.CreditCardID);
                        cc.CardType = CC.CardType;
                        cc.CardNumber = CC.CardNumber;
                        cc.ExpMonth = CC.ExpMonth;
                        cc.ExpYear = CC.ExpYear;
                        cc.ModifiedDate = DateTime.Now;
                        ef.SaveChanges();
                    }

                    if (CC.OperationType == "Delete")
                    {
                        cc = ef.CreditCard.FirstOrDefault(row => row.CreditCardID == CC.CreditCardID);
                        ef.CreditCard.Remove(cc);
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

        #region "Sales Person"

        [HttpGet]
        public ActionResult GetSalesPerson()
        {
            using (dbConn ef = new dbConn())
            {
                List<SalesPerson> list = ef.SalesPerson.ToList();
                return Json(new { data = list }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult PostSalesPerson(SalesPerson SP)
        {
            try
            {
                using (dbConn ef = new dbConn())
                {
                    SalesPerson sp = new SalesPerson();

                    if (SP.OperationType == "Save")
                    {
                        int id = Convert.ToInt32(ef.SalesPerson.Max(field => (int?)field.BusinessEntityID) + 1 ?? 1);
                        sp.BusinessEntityID = id;
                        sp.TerritoryID = SP.TerritoryID;
                        sp.SalesQuota = SP.SalesQuota;
                        sp.Bonus = SP.Bonus;
                        sp.CommissionPct = SP.CommissionPct;
                        sp.SalesYTD = SP.SalesYTD;
                        sp.SalesLastYear = SP.SalesLastYear;
                        sp.rowguid = SP.rowguid;
                        sp.ModifiedDate = DateTime.Now;
                        ef.SalesPerson.Add(sp);
                        ef.SaveChanges();
                    }

                    if (SP.OperationType == "Update")
                    {
                        sp = ef.SalesPerson.First(row => row.BusinessEntityID == SP.BusinessEntityID);
                        sp.TerritoryID = SP.TerritoryID;
                        sp.SalesQuota = SP.SalesQuota;
                        sp.Bonus = SP.Bonus;
                        sp.CommissionPct = SP.CommissionPct;
                        sp.SalesYTD = SP.SalesYTD;
                        sp.SalesLastYear = SP.SalesLastYear;
                        sp.rowguid = SP.rowguid;
                        sp.ModifiedDate = DateTime.Now;
                        ef.SaveChanges();
                    }

                    if (SP.OperationType == "Delete")
                    {
                        sp = ef.SalesPerson.FirstOrDefault(row => row.BusinessEntityID == SP.BusinessEntityID);
                        ef.SalesPerson.Remove(sp);
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