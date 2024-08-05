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
    html += "<tr>";
    html += "<td>" + "First Value" + "</td>";
    html += "<td>" + "Second Value" + "</td>";
    html += "<td>" + "Third Value" + "</td>";
    html += "<td>" + "Fourth Value" + "</td>";
    html += "</tr>";
    html += "<tr>";
    html += "<td>" + "Row 2" + "</td>";
    html += "<td>" + "Row 2" + "</td>";
    html += "<td>" + "Row 2" + "</td>";
    html += "<td>" + "Row 2" + "</td>";
    html += "</tr>";
    html += "<tr>";
    html += "<td>" + "Row 3" + "</td>";
    html += "<td>" + "Row 3" + "</td>";
    html += "<td>" + "Row 3" + "</td>";
    html += "<td>" + "Row 3" + "</td>";
    html += "</tr>";

    html += "</table>";

    portlet.html = html;
  }

  return {
    render: render,
  };
});
