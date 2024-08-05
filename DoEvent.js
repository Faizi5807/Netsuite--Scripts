/**
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 */

define(["N/record", "N/ui/serverWidget", "N/log"], function (
  record,
  serverWidget,
  log
) {
  function beforeLoad(context) {
    if (context.type !== context.UserEventType.CREATE) return;
    var newRecord = context.newRecord;
    var name = "Oracle";
    log.debug("name", name);
    newRecord.setValue({
      fieldId: "companyname",
      value: name,
    });
    newRecord.setValue({
      fieldId: "email",
      value: "demomail@gmail.com",
    });
  }

  function beforeSubmit(context) {
    if (context.type !== context.UserEventType.CREATE) return;
    var newEmployeeRecord = context.newRecord;
    newEmployeeRecord.setText({
      fieldId: "email",
      value: "mfaizzan81@gmail.com",
    });
  }
  function afterSubmit(context) {
    if (context.type !== context.UserEventType.CREATE) return;
    let employeeRecord = context.newRecord;
    var phoneNo = employeeRecord.getValue({
      fieldId: "phone",
    });
    windows.alert("Phone NUmber is" + phoneNo);
  }

  return {
    beforeLoad: beforeLoad,
    beforeSubmit: beforeSubmit,
    afterSubmit: afterSubmit,
  };
});
