using AdventureWorksCRUD.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace AdventureWorksCRUD.Controllers
{
    public class PurchasingController : Controller
    {
        public ActionResult Purchasing()
        {
            return View();
        }

        #region "Product Vendor"

        [HttpGet]
        public ActionResult GetProductVendor()
        {
            using (dbConn ef = new dbConn())
            {
                List<ProductVendor> list = ef.ProductVendor.ToList();
                return Json(new { data = list }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult PostProductVendor(ProductVendor PV)
        {
            try
            {
                using (dbConn ef = new dbConn())
                {
                    ProductVendor pv = new ProductVendor();

                    if (PV.OperationType == "Save")
                    {
                        int id = Convert.ToInt32(ef.ProductVendor.Max(field => (int?)field.ProductID) + 1 ?? 1);
                        pv.ProductID = id;
                        pv.BusinessEntityID = PV.BusinessEntityID;
                        pv.AverageLeadTime = PV.AverageLeadTime;
                        pv.StandardPrice = PV.StandardPrice;
                        pv.LastReceiptCost = PV.LastReceiptCost;
                        pv.LastReceiptDate = PV.LastReceiptDate;
                        pv.MinOrderQty = PV.MinOrderQty;
                        pv.MaxOrderQty = PV.MaxOrderQty;
                        pv.OnOrderQty = PV.OnOrderQty;
                        pv.UnitMeasureCode = PV.UnitMeasureCode;
                        pv.ModifiedDate = DateTime.Now;
                        ef.ProductVendor.Add(pv);
                        ef.SaveChanges();
                    }

                    if (PV.OperationType == "Update")
                    {
                        pv = ef.ProductVendor.First(row => row.ProductID == PV.ProductID);
                        pv.BusinessEntityID = PV.BusinessEntityID;
                        pv.AverageLeadTime = PV.AverageLeadTime;
                        pv.StandardPrice = PV.StandardPrice;
                        pv.LastReceiptCost = PV.LastReceiptCost;
                        pv.LastReceiptDate = PV.LastReceiptDate;
                        pv.MinOrderQty = PV.MinOrderQty;
                        pv.MaxOrderQty = PV.MaxOrderQty;
                        pv.OnOrderQty = PV.OnOrderQty;
                        pv.UnitMeasureCode = PV.UnitMeasureCode;
                        pv.ModifiedDate = DateTime.Now;
                        ef.SaveChanges();
                    }

                    if (PV.OperationType == "Delete")
                    {
                        pv = ef.ProductVendor.FirstOrDefault(row => row.ProductID == PV.ProductID);
                        ef.ProductVendor.Remove(pv);
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

        #region "Ship Method"

        [HttpGet]
        public ActionResult GetShipMethod()
        {
            using (dbConn ef = new dbConn())
            {
                List<ShipMethod> list = ef.ShipMethod.ToList();
                return Json(new { data = list }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult PostShipMethod(ShipMethod SM)
        {
            try
            {
                using (dbConn ef = new dbConn())
                {
                    ShipMethod sm = new ShipMethod();

                    if (SM.OperationType == "Save")
                    {
                        int id = Convert.ToInt32(ef.ShipMethod.Max(field => (int?)field.ShipMethodID) + 1 ?? 1);
                        sm.ShipMethodID = id;
                        sm.Name = SM.Name;
                        sm.ShipBase = SM.ShipBase;
                        sm.ShipRate = SM.ShipRate;
                        sm.rowguid = SM.rowguid;
                        sm.ModifiedDate = DateTime.Now;
                        ef.ShipMethod.Add(sm);
                        ef.SaveChanges();
                    }

                    if (SM.OperationType == "Update")
                    {
                        sm = ef.ShipMethod.First(row => row.ShipMethodID == SM.ShipMethodID);
                        sm.Name = SM.Name;
                        sm.ShipBase = SM.ShipBase;
                        sm.ShipRate = SM.ShipRate;
                        sm.rowguid = SM.rowguid;
                        sm.ModifiedDate = DateTime.Now;
                        ef.SaveChanges();
                    }

                    if (SM.OperationType == "Delete")
                    {
                        sm = ef.ShipMethod.FirstOrDefault(row => row.ShipMethodID == SM.ShipMethodID);
                        ef.ShipMethod.Remove(sm);
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