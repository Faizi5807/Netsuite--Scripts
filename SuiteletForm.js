/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(["N/ui/serverWidget", "N/record", "N/search"], function (
  serverWidget,
  record,
  search
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
      });

      var subsidiarySearch = search.create({
        type: search.Type.SUBSIDIARY,
        columns: ["internalid", "name"],
      });

      subsidiarySearch.run().each(function (result) {
        subsidiaryField.addSelectOption({
          value: result.getValue("internalid"),
          text: result.getValue("name"),
        });
        return true;
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
        var objRecord = record.create({
          type: record.Type.EMPLOYEE,
          isDynamic: true,
        });
        objRecord.setValue({
          fieldId: "firstname",
          value: name,
        });
        objRecord.setValue({
          fieldId: "defaultaddress",
          value: address,
        });
        objRecord.setValue({
          fieldId: "subsidiary",
          value: subsidiary,
        });
        var empId = objRecord.save();
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
