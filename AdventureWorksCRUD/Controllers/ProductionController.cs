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
                        lc.LocationID = id;
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

        #region "Product Type"

        [HttpGet]
        public ActionResult GetProductCategory()
        {
            using (dbConn ef = new dbConn())
            {
                List<ProductCategory> list = ef.ProductCategory.ToList();
                return Json(new { data = list }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult PostProductCategory(ProductCategory PC)
        {
            try
            {
                using (dbConn ef = new dbConn())
                {
                    ProductCategory pc = new ProductCategory();

                    if (PC.OperationType == "Save")
                    {
                        int id = Convert.ToInt32(ef.ProductCategory.Max(field => (int?)field.ProductCategoryID) + 1 ?? 1);
                        pc.ProductCategoryID = id;
                        pc.Name = PC.Name;
                        pc.rowguid = PC.rowguid;
                        pc.ModifiedDate = DateTime.Now;
                        ef.ProductCategory.Add(pc);
                        ef.SaveChanges();
                    }

                    if (PC.OperationType == "Update")
                    {
                        pc = ef.ProductCategory.First(row => row.ProductCategoryID == PC.ProductCategoryID);
                        pc.Name = PC.Name;
                        pc.rowguid = PC.rowguid;
                        pc.ModifiedDate = DateTime.Now;
                        ef.SaveChanges();
                    }

                    if (PC.OperationType == "Delete")
                    {
                        pc = ef.ProductCategory.FirstOrDefault(row => row.ProductCategoryID == PC.ProductCategoryID);
                        ef.ProductCategory.Remove(pc);
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

        #region "Product Review"

        [HttpGet]
        public ActionResult GetProductReview()
        {
            using (dbConn ef = new dbConn())
            {
                List<ProductReview> list = ef.ProductReview.ToList();
                return Json(new { data = list }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult PostProductReview(ProductReview PR)
        {
            try
            {
                using (dbConn ef = new dbConn())
                {
                    ProductReview pr = new ProductReview();

                    if (PR.OperationType == "Save")
                    {
                        int id = Convert.ToInt32(ef.ProductReview.Max(field => (int?)field.ProductReviewID) + 1 ?? 1);
                        pr.ProductReviewID = id;
                        pr.ProductID = PR.ProductID;
                        pr.ReviewerName = PR.ReviewerName;
                        pr.ReviewDate = PR.ReviewDate;
                        pr.EmailAddress = PR.EmailAddress;
                        pr.Rating = PR.Rating;
                        pr.Comments = PR.Comments;
                        pr.ModifiedDate = DateTime.Now;
                        ef.ProductReview.Add(pr);
                        ef.SaveChanges();
                    }

                    if (PR.OperationType == "Update")
                    {
                        pr = ef.ProductReview.First(row => row.ProductReviewID == PR.ProductReviewID);
                        pr.ProductReviewID = PR.ProductReviewID;
                        pr.ProductID = PR.ProductID;
                        pr.ReviewerName = PR.ReviewerName;
                        pr.ReviewDate = PR.ReviewDate;
                        pr.EmailAddress = PR.EmailAddress;
                        pr.Rating = PR.Rating;
                        pr.Comments = PR.Comments;
                        pr.ModifiedDate = DateTime.Now;
                        ef.SaveChanges();
                    }

                    if (PR.OperationType == "Delete")
                    {
                        pr = ef.ProductReview.FirstOrDefault(row => row.ProductReviewID == PR.ProductReviewID);
                        ef.ProductReview.Remove(pr);
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