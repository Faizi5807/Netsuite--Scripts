/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 */
//A client script tht loads the item receipt in sublist when fields are changed , the later submititemlist is connected to it
define([
  "N/search",
  "N/currentRecord",
  "N/ui/dialog",
  "N/format",
  "N/log",
  "N/record",
], function (search, currentRecord, dialog, format, log, record) {
  function fieldChanged(context) {
    try {
      var record = context.currentRecord;
      var fieldId = context.fieldId;

      if (
        fieldId == "custrecord_vendor" ||
        fieldId == "custrecord_datefrom" ||
        fieldId == "custrecord_dateto"
      ) {
        var vendor = record.getValue({ fieldId: "custrecord_vendor" });
        var dateFrom = record.getText({ fieldId: "custrecord_datefrom" });
        var dateTo = record.getText({ fieldId: "custrecord_dateto" });

        log.debug("Vendor", vendor);
        log.debug("Date From", dateFrom);
        log.debug("Date To", dateTo);

        if (vendor && dateFrom && dateTo) {
          var itemSearch = search.create({
            type: search.Type.ITEM_RECEIPT,
            filters: [
              ["name", "anyof", vendor],
              "AND",
              ["trandate", "onorafter", dateFrom],
              "AND",
              ["trandate", "onorbefore", dateTo],
              "AND",
              ["mainline", "is", "T"],
            ],
            columns: [
              search.createColumn({ name: "internalid", label: "Internal ID" }),
            ],
          });

          var resultCount = 0;
          var resultItems = [];

          itemSearch.run().each(function (result) {
            resultCount++;
            resultItems.push(result.getValue("internalid"));
            return true;
          });

          log.debug("Result Count", resultCount);

          var lineCount = record.getLineCount({
            sublistId: "recmachcustrecord1426",
          });

          log.debug("Line Count Before Removal", lineCount);

          for (var i = lineCount - 1; i >= 0; i--) {
            record.removeLine({
              sublistId: "recmachcustrecord1426",
              line: i,
            });
          }

          log.debug(
            "Line Count After Removal",
            record.getLineCount({
              sublistId: "recmachcustrecord1426",
            })
          );

          if (resultCount > 0) {
            alert("Items have been found");

            for (var i = 0; i < resultCount; i++) {
              record.selectNewLine({ sublistId: "recmachcustrecord1426" });
              record.setCurrentSublistValue({
                sublistId: "recmachcustrecord1426",
                fieldId: "custrecord_listname",
                value: resultItems[i],
              });
              record.commitLine({ sublistId: "recmachcustrecord1426" });
            }
          } else {
            alert("No Items have been found");
          }
        }
      }
    } catch (e) {
      log.error({
        title: "Error",
        details: e.message,
      });
    }
  }

  return {
    fieldChanged: fieldChanged,
  };
});
