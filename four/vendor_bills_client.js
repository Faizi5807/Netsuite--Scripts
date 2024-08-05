/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */
// client script that filters the results based on change in field of bill number from suitelet script display_vendor_bills.js
define(["N/url", "N/https", "N/log"], function (url, https, log) {
  function fieldChanged(context) {
    if (context.fieldId === "custpage_billnumber") {
      var billNumber = context.currentRecord.getValue({
        fieldId: "custpage_billnumber",
      });
      log.debug("Debugging", "Client Script started");
      var suiteletUrl = url.resolveScript({
        scriptId: "4421", // Replace with your Suitelet script ID
        deploymentId: "1", // Replace with your Suitelet deployment ID
        params: {
          custpage_billnumber: billNumber,
        },
      });
      log.debug("Debugging the suitelet url", suiteletUrl);
      window.location.href = suiteletUrl;
    }
  }

  return {
    fieldChanged: fieldChanged,
  };
});
