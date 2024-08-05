/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
//userevent script that sets the values changed in the sublsit on the original receipt that was loaded using client script
define(["N/record", "N/log"], function (record, log) {
  function afterSubmit(context) {
    var newRecord = context.newRecord;
    var lineCount = newRecord.getLineCount({
      sublistId: "recmachcustrecord1426",
    });

    for (var i = 0; i < lineCount; i++) {
      var itemId = newRecord.getSublistValue({
        sublistId: "recmachcustrecord1426",
        fieldId: "custrecord_listname",
        line: i,
      });

      var cost = newRecord.getSublistValue({
        sublistId: "recmachcustrecord1426",
        fieldId: "custrecord_freightamt",
        line: i,
      });

      if (itemId && cost) {
        var itemReceipt = record.load({
          type: record.Type.ITEM_RECEIPT,
          id: itemId,
          isDynamic: true,
        });

        itemReceipt.setValue({
          fieldId: "landedcostmethod",
          value: "VALUE",
        });

        itemReceipt.setValue({
          fieldId: "landedcostamount38",
          value: cost,
        });

        itemReceipt.save();
      }
    }
  }

  return {
    afterSubmit: afterSubmit,
  };
});
