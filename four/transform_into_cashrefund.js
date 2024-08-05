/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
//suitelet script that has an Id field and requires Id of cash sales record that needs to be transformed, a transform button transforms that cash sales into cash refund
define(["N/record", "N/log", "N/ui/serverWidget"], function (
  record,
  log,
  serverWidget
) {
  function onRequest(context) {
    if (context.request.method === "GET") {
      var form = serverWidget.createForm({
        title: "Transform Cash Sale to Cash Refund",
      });
      var cashSaleIdField = form.addField({
        id: "custpage_cashsaleid",
        type: serverWidget.FieldType.TEXT,
        label: "Cash Sale ID",
      });
      cashSaleIdField.isMandatory = true;
      form.addSubmitButton({ label: "Transform" });
      context.response.writePage(form);
    } else {
      var cashSaleId = context.request.parameters.custpage_cashsaleid;

      try {
        var salesOrderRecord = record.transform({
          fromType: record.Type.CUSTOMER,
          fromId: cashSaleId,
          toType: record.Type.SALES_ORDER,
        });
        var itemSublistId = "item";
        var lineCount = salesOrderRecord.getLineCount({
          sublistId: itemSublistId,
        });

        if (lineCount === 0) {
          // Add a line item if none exists
          salesOrderRecord.selectNewLine({ sublistId: itemSublistId });
          salesOrderRecord.setCurrentSublistValue({
            sublistId: itemSublistId,
            fieldId: "item",
            value: 8467, // Replace with actual item ID
          });
          salesOrderRecord.setCurrentSublistValue({
            sublistId: itemSublistId,
            fieldId: "quantity",
            value: 10, // Replace with desired quantity
          });
          salesOrderRecord.commitLine({ sublistId: itemSublistId });
        }

        // Save the cash refund
        var cashRefundId = salesOrderRecord.save();
        log.debug("Sales order Created", "Sales Order ID: " + cashRefundId);
        var form = serverWidget.createForm({ title: "Transformation Success" });
        form.addField({
          id: "custpage_successmsg",
          type: serverWidget.FieldType.INLINEHTML,
          label: "Success Message",
        }).defaultValue =
          "Cash Sale #" +
          cashSaleId +
          " has been successfully transformed to Cash Refund #" +
          cashRefundId;
        context.response.writePage(form);
      } catch (e) {
        log.error("Error Transforming Cash Sale to Cash Refund", e.toString());

        var form = serverWidget.createForm({ title: "Transformation Failed" });
        form.addField({
          id: "custpage_errormsg",
          type: serverWidget.FieldType.INLINEHTML,
          label: "Error Message",
        }).defaultValue =
          "An error occurred while transforming Cash Sale #" +
          cashSaleId +
          ": " +
          e.toString();
        context.response.writePage(form);
      }
    }
  }

  return {
    onRequest: onRequest,
  };
});
