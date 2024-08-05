/**
 * @NApiVersion 2.x
 * @NScriptType Portlet
 */
define(["N/search", "N/ui/serverWidget"], function (search, serverWidget) {
  function render(params) {
    var portlet = params.portlet;
    portlet.title = "Recent Sales Orders";

    var html = '<table border="1">';
    html += "<tr>";
    html += "<th>Order Number</th>";
    html += "<th>Date</th>";
    html += "<th>Customer</th>";
    html += "<th>Amount</th>";
    html += "</tr>";

    var salesOrderSearch = search.create({
      type: search.Type.SALES_ORDER,
      filters: [["mainline", "is", "T"]],
      columns: ["tranid", "trandate", "entity", "total"],
    });

    salesOrderSearch.run().each(function (result) {
      html += "<tr>";
      html += "<td>" + result.getValue("tranid") + "</td>";
      html += "<td>" + result.getValue("trandate") + "</td>";
      html += "<td>" + result.getText("entity") + "</td>";
      html += "<td>" + result.getValue("total") + "</td>";
      html += "</tr>";
      return true; // Continue to the next result
    });

    html += "</table>";

    portlet.html = html;
  }

  return {
    render: render,
  };
});
