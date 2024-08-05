/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(["N/ui/serverWidget", "N/record"], function (serverWidget, record) {
  function onRequest(context) {
    if (context.request.method === "GET") {
      var form = serverWidget.createForm({
        title: "Create Customer",
      });

      var customerNameField = form.addField({
        id: "custpage_customer_name",
        type: serverWidget.FieldType.TEXT,
        label: "Customer Name",
      });

      var emailField = form.addField({
        id: "custpage_email",
        type: serverWidget.FieldType.EMAIL,
        label: "Email",
      });

      form.addSubmitButton({
        label: "Save Customer",
      });

      context.response.writePage(form);
    } else {
      var customerName = context.request.parameters.custpage_customer_name;
      var email = context.request.parameters.custpage_email;

      var customerRecord = record.create({
        type: record.Type.CUSTOMER,
      });

      customerRecord.setValue({
        fieldId: "companyname",
        value: customerName,
      });

      customerRecord.setValue({
        fieldId: "email",
        value: email,
      });

      var customerId = customerRecord.save();

      var form = serverWidget.createForm({
        title: "Customer Created",
      });

      form.addField({
        id: "custpage_message",
        type: serverWidget.FieldType.INLINEHTML,
        label: " ",
      }).defaultValue =
        "<p>Customer Created Successfully. Customer ID: " + customerId + "</p>";

      context.response.writePage(form);
    }
  }

  return {
    onRequest: onRequest,
  };
});
