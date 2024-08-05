/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(["N/record", "N/file"], function (record, file) {
  function onRequest(context) {
    try {
      var invoiceId = context.request.parameters.invoiceId;
      var invoiceRecord = record.load({
        type: record.Type.INVOICE,
        id: invoiceId,
      });

      var xmlFile = file.load({
        id: "67428",
      });
      alert("Alert:" + "Inside Suitelet");
      var xmlContent = xmlFile.getContents();

      context.response.write({
        output: xmlContent,
      });
    } catch (error) {
      context.response.write({
        output: "Error: " + error.message,
      });
    }
  }

  return {
    onRequest: onRequest,
  };
});
