/**
 *@NApiVersion 2.x
 *@NScriptType MassUpdateScript
 */
//simple mass update script format
define(["N/record"], function (record) {
  function each(context) {
    var SORecord = record.load({
      type: context.type,
      id: context.id,
    });

    if (
      SORecord.getValue({ fieldId: "custbody_soapprovalstatus" }) ===
      "Pending for CEO Approval"
    ) {
      SORecord.setValue({
        fieldId: "Pending for CEO Approval",
        value: "Apporved",
      });

      SORecord.save();
    }
  }

  return {
    each: each,
  };
});
