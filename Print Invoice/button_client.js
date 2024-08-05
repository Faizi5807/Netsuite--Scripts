/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */
define(["N/url", "N/currentRecord"], function (nsUrl, nsCurrentRecord) {
  function pageInit(context) {}

  function printInvoiceXML() {
    try {
      var currentRecord = nsCurrentRecord.get();
      var recordId = currentRecord.getValue({ fieldId: "id" });
      var recordType = currentRecord.getValue({ fieldId: "recordType" });

      if (!recordId) {
        throw new Error("Record ID is not available.");
      }
      alert("Current Record:" + currentRecord.getValue({ fieldId: "id" }));
      var scriptURL = nsUrl.resolveScript({
        scriptId: "customscript_invoicesuitelet",
        deploymentId: "customdeploy_invoicesuitelet",
        params: {
          id: recordId,
          rectype: recordType,
        },
        returnExternalUrl: false,
      });
      alert("Script URL: " + scriptURL);
      window.open(scriptURL);
    } catch (e) {
      console.log("ERROR on printButton", e);
      alert("Error: " + e.message);
    }
  }

  return {
    pageInit: pageInit,
    printInvoiceXML: printInvoiceXML,
  };
});
