/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
//A custom suitelet form that creates an Employee record upon save
define(["N/ui/serverWidget", "N/log", "N/record"], function (
  serverWidget,
  log,
  record
) {
  function onRequest(context) {
    if (context.request.method === "GET") {
      var form = serverWidget.createForm({
        title: "Add Customer and Items",
      });

      var custField = form.addField({
        id: "custpage_customer",
        type: serverWidget.FieldType.SELECT,
        label: "Customer",
        source: "customer",
      });

      var addressField = form.addField({
        id: "custpage_address",
        type: serverWidget.FieldType.SELECT,
        label: "Location",
        source: "location",
      });

      var subsidiaryField = form.addField({
        id: "custpage_subsidiary",
        type: serverWidget.FieldType.SELECT,
        label: "Subsidiary",
        source: "subsidiary",
      });

      var itemSublist = form.addSublist({
        id: "custpage_items",
        type: serverWidget.SublistType.INLINEEDITOR,
        label: "Items",
      });

      var custItem = itemSublist.addField({
        id: "myitem",
        type: serverWidget.FieldType.SELECT,
        label: "Item",
        source: "item",
      });

      var itemDescriptionField = itemSublist.addField({
        id: "custpage_item_description",
        type: serverWidget.FieldType.TEXT,
        label: "Item Description",
      });

      var itemPriceField = itemSublist.addField({
        id: "custpage_item_price",
        type: serverWidget.FieldType.CURRENCY,
        label: "Item Price",
      });

      form.addSubmitButton({
        label: "Submit",
      });

      context.response.writePage(form);
    } else {
      var reqParams = context.request.parameters;
      var customer = reqParams.custpage_customer;
      var address = reqParams.custpage_address;
      var subsidiary = reqParams.custpage_subsidiary;
      // var item = reqParams.myitem;
      //   var itemDescription = reqParams.custpage_item_description;
      //   var itemPrice = reqParams.custpage_item_price;

      context.response.write(
        "Submission is: Customer - " +
          customer +
          ", Address - " +
          address +
          ", Subsidiary - " +
          subsidiary +
          ", Item - " +
          item +
          ", Item Description - " +
          itemDescription +
          ", Item Price - " +
          itemPrice
      );

      try {
        var salesOrder = record.create({
          type: record.Type.SALES_ORDER,
          isDynamic: true,
        });

        salesOrder.setValue({
          fieldId: "entity",
          value: customerId,
        });

        var itemCount = request.getLineCount({
          group: "custpage_items",
        });

        for (var i = 0; i < itemCount; i++) {
          var itemId = request.getSublistValue({
            group: "custpage_items",
            name: "custpage_item",
            line: i,
          });

          var quantity = request.getSublistValue({
            group: "custpage_items",
            name: "custpage_quantity",
            line: i,
          });

          salesOrder.selectNewLine({
            sublistId: "item",
          });

          salesOrder.setCurrentSublistValue({
            sublistId: "item",
            fieldId: "item",
            value: itemId,
          });

          salesOrder.setCurrentSublistValue({
            sublistId: "item",
            fieldId: "quantity",
            value: quantity,
          });

          salesOrder.commitLine({
            sublistId: "item",
          });
        }

        var salesOrderId = salesOrder.save();

        context.response.write(
          "Sales Order created successfully. Sales Order ID: " + salesOrderId
        );
      } catch (e) {
        log.error({
          title: "Error creating Sales Order",
          details: e.message,
        });
        context.response.write("Error creating Sales Order: " + e.message);
      }
    }
  }

  return {
    onRequest: onRequest,
  };
});
