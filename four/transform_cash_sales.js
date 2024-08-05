/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
// A user event script that is triggered when a cash sales record is created and submitted , upon submit it is transformed into cash refund
define(["N/record", "N/log"], function (record, log) {
  function afterSubmit(context) {
    try {
      if (
        context.type !== context.UserEventType.CREATE &&
        context.type !== context.UserEventType.EDIT
      ) {
        return;
      }

      var cashSaleId = context.newRecord.id;
      var cashRefundRecord = record.transform({
        fromType: record.Type.CASH_SALE,
        fromId: cashSaleId,
        toType: record.Type.CASH_REFUND,
      });

      cashRefundRecord.setValue({
        fieldId: "memo",
        value: "Refund for Cash Sale #" + cashSaleId,
      });

      // Save the cash refund
      var cashRefundId = cashRefundRecord.save();
      log.debug("Cash Refund Created", "Cash Refund ID: " + cashRefundId);
    } catch (e) {
      log.error("Error Transforming Cash Sale to Cash Refund", e.toString());
    }
  }

  return {
    afterSubmit: afterSubmit,
  };
});
