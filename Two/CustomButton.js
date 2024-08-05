/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
define(["N/ui/serverWidget", "N/record"], function (serverWidget, record) {
  function beforeLoad(context) {
    if (context.type !== context.UserEventType.VIEW) return;
    var form = context.form;
    form.clientScriptModulePath = "./MyClientscript.js";
    form.addButton({
      id: "custpage_custom_button",
      label: "Create Record",
      functionName: "newRecordFunction",
    });
  }

  return {
    beforeLoad: beforeLoad,
  };
});
