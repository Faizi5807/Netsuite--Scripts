/**
 * @NApiVersion 2.x
 * @NScriptType MapReduceScript
 */
define(["N/search", "N/record", "N/log"], function (search, record, log) {
  function getInputData() {
    // Define a search to retrieve customer records
    return search.create({
      type: search.Type.CUSTOMER,
      filters: [["lastsaledate", "within", "lastyear"]],
      columns: ["internalid"],
    });
  }

  function map(context) {
    var searchResult = JSON.parse(context.value);
    var customerId = searchResult.id;

    // Process each customer record
    try {
      record.submitFields({
        type: record.Type.CUSTOMER,
        id: customerId,
        values: {
          custentity_custom_field: "Updated",
        },
      });
    } catch (e) {
      log.error({
        title: "Error updating customer",
        details: e.message,
      });
    }
  }

  function reduce(context) {
    // In this example, we don't need to use the reduce stage
  }

  function summarize(summary) {
    var totalProcessed = summary.inputSummary.reduceProcessed;
    var totalErrors = summary.mapSummary.errors.length;

    log.audit({
      title: "Summary",
      details:
        "Total processed: " + totalProcessed + ", Total errors: " + totalErrors,
    });

    summary.mapSummary.errors
      .iterator()
      .each(function (key, error, executionNo) {
        log.error({
          title: "Error for key: " + key,
          details: error,
        });
        return true;
      });
  }

  return {
    getInputData: getInputData,
    map: map,
    reduce: reduce,
    summarize: summarize,
  };
});
