/**
 * @NApiVersion 2.x
 * @NScriptType ScheduledScript
 */
//Getting all available currencies and their respective internal ids ,It will display athem in execution log
define(["N/search", "N/log"], function (search, log) {
  function execute(context) {
    try {
      var currencySearch = search.create({
        type: search.Type.CURRENCY,
        columns: ["internalid", "name"],
      });

      currencySearch.run().each(function (result) {
        var internalId = result.getValue("internalid");
        var name = result.getValue("name");
        log.debug("Currency", "Internal ID: " + internalId + ", Name: " + name);
        return true;
      });
    } catch (e) {
      log.error({
        title: "Error fetching currency internal IDs",
        details: e.toString(),
      });
    }
  }

  return {
    execute: execute,
  };
});
