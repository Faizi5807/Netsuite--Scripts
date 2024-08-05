/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */
//Simple client script tht changes the field value when triggered
define(["N/ui/message", "N/log"], function (message, log) {
  function fieldChanged(context) {
    var currentRecord = context.currentRecord;
    var sublistName = context.sublistId;
    var fieldName = context.fieldId;

    if (fieldName === "quantity") {
      var quantity = currentRecord.getValue({ fieldId: "quantity" });

      if (quantity < 0) {
        // Show an error message
        var myMsg = message.create({
          title: "Invalid Quantity",
          message: "Quantity cannot be negative.",
          type: message.Type.ERROR,
        });
        myMsg.show();

        // Log an error
        log.error({
          title: "Negative Quantity Error",
          details: "The quantity entered is negative: " + quantity,
        });

        // Reset the quantity field to zero
        currentRecord.setValue({
          fieldId: "quantity",
          value: 0,
        });
      }
    }
  }

  return {
    fieldChanged: fieldChanged,
  };
});
