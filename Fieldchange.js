/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
define(["N/error", "N/record"], function (error, record) {
  function fieldChanged(context) {
    var currentRecord = context.currentRecord;
    var sublistName = context.sublistId;
    var sublistFieldName = context.fieldId;
    var line = context.line;

    if (sublistFieldName == "phone") {
      var phone = currentRecord.getValue({
        fieldId: "phone",
      });
      alert(phone);
      currentRecord.setValue({
        fieldId: "altphone",
        value: phone,
      });
    }
  }
  return {
    fieldChanged: fieldChanged,
  };
});
