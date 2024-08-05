/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
//suitelet script that displays vendor bills and has a filter of Bill number that triggers a client script which filters the results
define(["N/ui/serverWidget", "N/search"], function (serverWidget, search) {
  function onRequest(context) {
    if (context.request.method === "GET") {
      var form = serverWidget.createForm({
        title: "Vendor Bills",
      });
      var billNumberField = form.addField({
        id: "custpage_billnumber",
        type: serverWidget.FieldType.TEXT,
        label: "Bill Number",
      });
      form.clientScriptModulePath = "./vendor_bills_client.js";
      var billNumber = context.request.parameters.custpage_billnumber;
      if (billNumber) {
        billNumberField.defaultValue = billNumber;
      }
      var sublist = form.addSublist({
        id: "vendorbills",
        type: serverWidget.SublistType.LIST,
        label: "Vendor Bills",
      });

      sublist.addField({
        id: "billnumber",
        type: serverWidget.FieldType.TEXT,
        label: "Bill Number",
      });
      sublist.addField({
        id: "vendorname",
        type: serverWidget.FieldType.TEXT,
        label: "Vendor Name",
      });
      sublist.addField({
        id: "date",
        type: serverWidget.FieldType.DATE,
        label: "Date",
      });
      sublist.addField({
        id: "amount",
        type: serverWidget.FieldType.CURRENCY,
        label: "Amount",
      });
      sublist.addField({
        id: "status",
        type: serverWidget.FieldType.TEXT,
        label: "Status",
      });
      var filters = [];
      if (billNumber) {
        filters.push(
          search.createFilter({
            name: "tranid",
            operator: search.Operator.IS,
            values: billNumber,
          })
        );
      }
      var vendorBillSearch = search.create({
        type: search.Type.VENDOR_BILL,
        filters: filters,
        columns: ["tranid", "entity", "trandate", "amount", "status"],
      });

      var resultSet = vendorBillSearch.run();
      var results = resultSet.getRange({
        start: 0,
        end: 1000,
      });

      for (var i = 0; i < results.length; i++) {
        var result = results[i];
        sublist.setSublistValue({
          id: "billnumber",
          line: i,
          value: result.getValue("tranid")
            ? result.getValue("tranid")
            : "Not Available",
        });
        sublist.setSublistValue({
          id: "vendorname",
          line: i,
          value: result.getText("entity")
            ? result.getText("entity")
            : "Not Available",
        });
        sublist.setSublistValue({
          id: "date",
          line: i,
          value: result.getValue("trandate"),
        });
        sublist.setSublistValue({
          id: "amount",
          line: i,
          value: result.getValue("amount"),
        });
        sublist.setSublistValue({
          id: "status",
          line: i,
          value: result.getText("status")
            ? result.getText("status")
            : "Not Available",
        });
      }

      context.response.writePage(form);
    }
  }

  return {
    onRequest: onRequest,
  };
});
