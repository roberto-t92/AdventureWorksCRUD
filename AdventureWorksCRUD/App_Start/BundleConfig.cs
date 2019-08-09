using System.Web;
using System.Web.Optimization;

namespace AdventureWorksCRUD
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/datatables").Include(
                        "~/Scripts/datatables.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/datatables-bootstrap4").Include(
                        "~/Scripts/dataTables.bootstrap4.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/moment").Include(
                        "~/Scripts/moment.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery-blockUI").Include(
                        "~/Scripts/jquery.blockUI.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css",
                      "~/Content/datatables.min.css",
                      "~/Content/dataTables.bootstrap4.min.cs"));
        }
    }
}
