/**
 *@NApiVersion 2.x
 *@NScriptType MassUpdateScript
 */
//simple mass update script format
define(["N/record"], function (record) {
  function each(context) {
    var employeeRecord = record.load({
      type: context.type,
      id: context.id,
    });

    if (employeeRecord.getValue({ fieldId: "title" }) === "Master") {
      employeeRecord.setValue({
        fieldId: "title",
        value: "Jeagerist",
      });

      employeeRecord.save();
    }
  }

  return {
    each: each,
  };
});
