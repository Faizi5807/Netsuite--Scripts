/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
define(["N/record", "N/log"], function (record, log) {
  function beforeSubmit(context) {
    // Get the new record object
    var newRecord = context.newRecord;

    // Get the type of the record (e.g., 'create', 'edit', 'delete')
    var operation = context.type;

    if (
      operation === context.UserEventType.CREATE ||
      operation === context.UserEventType.EDIT
    ) {
      // Validate and modify data before saving
      var fieldValue = newRecord.getValue({
        fieldId: "custrecord_custom_field",
      });

      // Example validation: Ensure the custom field value is not empty
      if (!fieldValue) {
        // Log an error and cancel the save operation
        log.error({
          title: "Validation Error",
          details: "Custom field value cannot be empty",
        });

        // Cancel the save operation
        context.cancel = true;
        return;
      }

      // Example modification: Set a default value if the custom field is empty
      if (!fieldValue) {
        newRecord.setValue({
          fieldId: "custrecord_custom_field",
          value: "Default Value",
        });
      }
    }
  }

  return {
    beforeSubmit: beforeSubmit,
  };
});
