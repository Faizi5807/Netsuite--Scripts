/**
 * @NApiVersion 2.x
 * @NScriptType Portlet
 */
define(["N/ui/serverWidget"], function (serverWidget) {
  function render(params) {
    var portlet = params.portlet;
    portlet.title = "Sample Portlet";

    var html = "<h2>Welcome to NetSuite</h2>";
    portlet.html = html;
  }

  return {
    render: render,
  };
});
