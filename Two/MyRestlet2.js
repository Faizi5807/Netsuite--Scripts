/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 * @NModuleScope SameAccount
 */
//custom restlet for delete request
define(["N/record", "N/error"], function (record, error) {
  function doDelete(params) {
    var id = params.id;
    log.debug("id", id);
    try {
      record.delete({
        type: "employee",
        id: id,
      });
      return "del";
    } catch (error) {
      log.debug("error", error);
    }
  }

  return {
    delete: doDelete,
  };
});
