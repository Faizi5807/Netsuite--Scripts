/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
//suitelet to load all bill orders and display them in suitelet form
define(["N/search", "N/ui/serverWidget"], function (search, serverWidget) {
  function onRequest(context) {
    if (context.request.method === "GET") {
      var form = serverWidget.createForm({
        title: "Bill Payments",
      });

      var sublist = form.addSublist({
        id: "custpage_sublist",
        type: serverWidget.SublistType.LIST,
        label: "Bill Payments",
      });

      sublist.addField({
        id: "custpage_internalid",
        type: serverWidget.FieldType.TEXT,
        label: "Internal ID",
      });
      sublist.addField({
        id: "custpage_date",
        type: serverWidget.FieldType.TEXT,
        label: "Date",
      });
      sublist.addField({
        id: "custpage_vendor",
        type: serverWidget.FieldType.TEXT,
        label: "Vendor",
      });
      sublist.addField({
        id: "custpage_amount",
        type: serverWidget.FieldType.TEXT,
        label: "Amount",
      });
      sublist.addField({
        id: "custpage_account",
        type: serverWidget.FieldType.TEXT,
        label: "Account",
      });
      sublist.addField({
        id: "custpage_subsidiary",
        type: serverWidget.FieldType.TEXT,
        label: "Subsidiary",
      });
      sublist.addField({
        id: "custpage_location",
        type: serverWidget.FieldType.TEXT,
        label: "Location",
      });
      sublist.addField({
        id: "custpage_currency",
        type: serverWidget.FieldType.TEXT,
        label: "Currency",
      });
      sublist.addField({
        id: "custpage_exchangerate",
        type: serverWidget.FieldType.TEXT,
        label: "Exchange Rate",
      });

      var billPaymentSearch = search.create({
        type: search.Type.VENDOR_PAYMENT,
        filters: [],
        columns: [
          "internalid",
          "trandate",
          "entity",
          "amount",
          "account",
          "currency",
          "exchangerate",
          "subsidiary",
          "location",
        ],
      });
      log.debug("billpaymentsearch", billPaymentSearch);

      var resultSet = billPaymentSearch.run();
      var results = resultSet.getRange({
        start: 0,
        end: 1000,
      });

      log.debug("results", results);

      for (var i = 0; i < results.length; i++) {
        sublist.setSublistValue({
          id: "custpage_internalid",
          line: i,
          value: results[i].getValue("internalid"),
        });
        sublist.setSublistValue({
          id: "custpage_date",
          line: i,
          value: results[i].getValue("trandate"),
        });

        sublist.setSublistValue({
          id: "custpage_vendor",
          line: i,
          value: results[i].getText("entity")
            ? results[i].getText("entity")
            : " Not Available ",
        });
        sublist.setSublistValue({
          id: "custpage_amount",
          line: i,
          value: results[i].getValue("amount"),
        });
        sublist.setSublistValue({
          id: "custpage_account",
          line: i,
          value: results[i].getValue("account"),
        });
        sublist.setSublistValue({
          id: "custpage_currency",
          line: i,
          value: results[i].getValue("currency"),
        });
        sublist.setSublistValue({
          id: "custpage_exchangerate",
          line: i,
          value: results[i].getValue("exchangerate"),
        });
        sublist.setSublistValue({
          id: "custpage_subsidiary",
          line: i,
          value: results[i].getValue("subsidiary"),
        });
        sublist.setSublistValue({
          id: "custpage_location",
          line: i,
          value: results[i].getText("location")
            ? results[i].getText("location")
            : " Not Available ",
        });
      }

      context.response.writePage(form);
    }
  }

  return {
    onRequest: onRequest,
  };
});
