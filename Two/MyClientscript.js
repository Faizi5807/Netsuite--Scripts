/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */
define(["N/ui/dialog", "N/record"], function (dialog, record) {
  function pageInit(context) {}

  function newRecordFunction() {
    try {
      var newRecord = record.create({
        type: record.Type.SALES_ORDER,
        isDynamic: true,
      });

      newRecord.setValue({
        fieldId: "entity",
        value: 15807,
      });
      newRecord.selectNewLine({ sublistId: "item" });
      newRecord.setCurrentSublistValue({
        sublistId: "item",
        fieldId: "item",
        value: 8467,
      });
      newRecord.setCurrentSublistValue({
        sublistId: "item",
        fieldId: "quantity",
        value: 1,
      });
      newRecord.setCurrentSublistValue({
        sublistId: "item",
        fieldId: "amount",
        value: 100,
      });
      newRecord.commitLine({ sublistId: "item" });
      var recordId = newRecord.save({
        enableSourcing: true,
        ignoreMandatoryFields: true,
      });

      dialog.alert({
        title: "Success",
        message: "Record created successfully with ID: " + recordId,
        // callback: function() {
        //   // Redirect to the newly created Sales Order record
        //   var salesOrderUrl = url.resolveRecord({
        //     recordType: record.Type.SALES_ORDER,
        //     recordId: recordId,
        //     isEditMode: false
        //   });
        //   window.location.href = salesOrderUrl;
        // }
      });
    } catch (e) {
      dialog.alert({
        title: "Error",
        message: "Error creating record: " + e.message,
      });
    }
  }

  return {
    pageInit: pageInit,
    newRecordFunction: newRecordFunction,
  };
});
