/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
define(["N/record", "N/ui/serverWidget"], function (record, serverWidget) {
  function beforeLoad(context) {
    if (context.type === context.UserEventType.VIEW) {
      var form = context.form;
      form.clientScriptModulePath = "./button_client.js";
      form.addButton({
        id: "custpage_print_xml",
        label: "Print Invoice XML",
        functionName: "printInvoiceXML",
      });
    }
  }

  return {
    beforeLoad: beforeLoad,
  };
});
