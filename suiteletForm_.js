/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
//A suitelet form that creates fields and then creates an employee record upon submit
define(["N/ui/serverWidget", "N/log", "N/record"], function (
  serverWidget,
  log,
  record
) {
  function onRequest(context) {
    if (context.request.method === "GET") {
      var form = serverWidget.createForm({
        title: "My Suitelet Form",
      });

      var nameField = form.addField({
        id: "custpage_name",
        type: serverWidget.FieldType.TEXT,
        label: "Name",
      });

      var addressField = form.addField({
        id: "custpage_address",
        type: serverWidget.FieldType.TEXT,
        label: "Address",
      });

      var subsidiaryField = form.addField({
        id: "custpage_subsidiary",
        type: serverWidget.FieldType.SELECT,
        label: "Subsidiary",
        source: "subsidiary",
      });

      form.addSubmitButton({
        label: "Submit",
      });

      context.response.writePage(form);
    } else {
      var requestParams = context.request.parameters;
      var name = requestParams.custpage_name;
      var address = requestParams.custpage_address;
      var subsidiary = requestParams.custpage_subsidiary;

      context.response.write(
        "Submission is: " + name + " " + address + " " + subsidiary
      );

      try {
        var employeeRecord = record.create({
          type: record.Type.EMPLOYEE,
          isDynamic: true,
        });

        // Assuming name field represents full name for simplicity
        employeeRecord.setValue({
          fieldId: "firstname",
          value: name.split(" ")[0], // Assuming the first part of the name
        });

        employeeRecord.setValue({
          fieldId: "lastname",
          value: name.split(" ")[1] || "", // Assuming the second part of the name
        });

        employeeRecord.setValue({
          fieldId: "subsidiary",
          value: subsidiary,
        });

        // To handle address properly, you'd typically create an address subrecord

        employeeRecord.setValue({
          fieldId: "defaultaddress",
          value: address,
        });

        var empId = employeeRecord.save();

        context.response.write(
          "Employee record created successfully with ID: " + empId
        );
      } catch (e) {
        log.error({
          title: "Error creating employee record",
          details: e,
        });
        context.response.write("Error creating employee record: " + e.message);
      }
    }
  }

  return {
    onRequest: onRequest,
  };
});
