/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
//user event sxript that adds a custom button to the record it is applied
define(["N/ui/serverWidget"], function (serverWidget) {
  function beforeLoad(context) {
    if (context.type === context.UserEventType.VIEW) {
      var form = context.form;

      form.clientScriptModulePath = "MyClientscript.js";

      form.addButton({
        id: "custpage_custom_button",
        label: "Custom Button",
        functionName: "customButtonFunction",
      });
    }
  }

  return {
    beforeLoad: beforeLoad,
  };
});
