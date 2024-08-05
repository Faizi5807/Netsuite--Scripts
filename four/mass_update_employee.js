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

    // Check if the customer is in California
    if (employeeRecord.getValue({ fieldId: "subsidiary" }) === "56") {
      employeeRecord.setValue({
        fieldId: "title",
        value: "Jeagerist", // New credit limit value
      });

      employeeRecord.save();
    }
  }

  return {
    each: each,
  };
});
