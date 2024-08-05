/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 */
//Sample Restlet
define(["N/record", "N/search", "N/error"], function (record, search, error) {
  function doGet(params) {
    if (!params.id) {
      throw error.create({
        name: "MISSING_REQ_ARG",
        message: "Missing required argument: id",
      });
    }

    var customerRecord = record.load({
      type: record.Type.CUSTOMER,
      id: params.id,
    });

    return {
      id: customerRecord.id,
      entityId: customerRecord.getValue("entityid"),
      companyName: customerRecord.getValue("companyname"),
      email: customerRecord.getValue("email"),
    };
  }

  function doPost(data) {
    var customerRecord = record.create({
      type: record.Type.CUSTOMER,
    });

    customerRecord.setValue("entityid", data.entityId);
    customerRecord.setValue("companyname", data.companyName);
    customerRecord.setValue("email", data.email);

    var customerId = customerRecord.save();

    return { id: customerId };
  }

  function doPut(data) {
    if (!data.id) {
      throw error.create({
        name: "MISSING_REQ_ARG",
        message: "Missing required argument: id",
      });
    }

    var customerRecord = record.load({
      type: record.Type.CUSTOMER,
      id: data.id,
    });

    if (data.entityId) customerRecord.setValue("entityid", data.entityId);
    if (data.companyName)
      customerRecord.setValue("companyname", data.companyName);
    if (data.email) customerRecord.setValue("email", data.email);

    customerRecord.save();

    return { id: data.id };
  }

  function doDelete(params) {
    if (!params.id) {
      throw error.create({
        name: "MISSING_REQ_ARG",
        message: "Missing required argument: id",
      });
    }

    record.delete({
      type: record.Type.CUSTOMER,
      id: params.id,
    });

    return { status: "success", id: params.id };
  }

  return {
    get: doGet,
    post: doPost,
    put: doPut,
    delete: doDelete,
  };
});
