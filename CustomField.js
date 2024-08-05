/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */
//Add custom field in the form and displays a default value
define(["N/ui/message", "N/log"], function (message, log) {
  function addcustomfield() {
    var customfield = nlapiCreateField(
      "delivery_date",
      "date",
      "Delivery Date"
    );
    customfield.setMandatory(true);
    customfield.defaultValue("12-12-12");
  }
  function validateDeliverDate() {
    var deliveryDate = nlapiGetFieldValue("delivery_date");
    var currentDate = new Date();
    if (new Date(deliveryDate) < currentDate) {
      alert("Delivery date cannot be in the past.");
      nlapiSetFieldValue("custbody_delivery_date", "");
    }
  }
});
