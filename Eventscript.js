/**
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 */

// Load two standard modules.
define(["N/record", "N/ui/serverWidget"], function (record, serverWidget) {
  function beforeLoad(context) {
    if (context.type !== context.UserEventType.CREATE) return;
    var newRecord = context.newRecord;
    let name = "Oracle";
    log.debug("name", name);
    newRecord.setValue({
      fieldId: "companyname",
      value: name,
    });
  }
  function BeforeSubmit(context) {
    if (context.type !== context.UserEventType.CREATE) return;
    var newEmployeeRecord = context.newRecord;
    newEmployeeRecord.setValue({
      fieldId: "email",
      value: "mfaizzan81@gmail.com",
    });
  }

  return {
    beforeLoad: beforeLoad,
    beforeSubmit: BeforeSubmit,
  };
});
