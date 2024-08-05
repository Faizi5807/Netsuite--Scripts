/**
 * @NApiVersion 2.x
 * @NScriptType MapReduceScript
 */
define(["N/record", "N/search", "N/log"], function (record, search, log) {
  function getInputData() {
    return search.create({
      type: search.Type.EMPLOYEE,
      filters: [],
      columns: ["internalid", "firstname", "lastname", "email"],
    });
  }

  function map(context) {
    var searchResult = JSON.parse(context.value);
    var employeeId = searchResult.id;
    var employeeRecord = record.load({
      type: record.Type.EMPLOYEE,
      id: employeeId,
    });

    var email = employeeRecord.getValue("email");
    var firstName = employeeRecord.getValue("firstname");
    var lastName = employeeRecord.getValue("lastname");

    log.debug(
      "Processing Employee",
      "ID: " +
        employeeId +
        ", Name: " +
        firstName +
        " " +
        lastName +
        ", Email: " +
        email
    );

    employeeRecord.setValue({
      fieldId: "custentity_custom_field",
      value: "Processed",
    });

    employeeRecord.save();

    context.write({
      key: employeeId,
      value: {
        id: employeeId,
        firstName: firstName,
        lastName: lastName,
        email: email,
      },
    });
  }

  function reduce(context) {
    var employeeData = context.values.map(function (value) {
      return JSON.parse(value);
    });

    log.debug("Reduced Employee Data", employeeData);
  }

  function summarize(summary) {
    summary.mapSummary.errors.iterator().each(function (key, error) {
      log.error("Map Error for key: " + key, error);
      return true;
    });

    summary.reduceSummary.errors.iterator().each(function (key, error) {
      log.error("Reduce Error for key: " + key, error);
      return true;
    });

    log.audit(
      "Summary",
      "Process completed with input: " + summary.inputSummary
    );
  }

  return {
    getInputData: getInputData,
    map: map,
    reduce: reduce,
    summarize: summarize,
  };
});
