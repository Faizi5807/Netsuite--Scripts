/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 */
//Restlet script that gathers,posts,edits and deletes the information from the integrated API
define(["N/record", "N/search", "N/error"], function (record, search, error) {
  function doGet(params) {
    var employees = [];

    var employeeId = params.entityid;
    var subsidiaryId = params.subsidiaryId;

    if (employeeId) {
      employees.push({
        entityId: employeeId,
        email: "johndoe@example.com",
      });
    } else {
      var employeeSearchObj = search.create({
        type: "employee",
        filters: [["subsidiary", "anyof", subsidiaryId]],
        columns: [
          search.createColumn({ name: "entityid", label: "Entity ID" }),
          search.createColumn({ name: "email", label: "Email" }),
          search.createColumn({ name: "phone", label: "Phone" }),
          search.createColumn({ name: "altphone", label: "Office Phone" }),
          search.createColumn({ name: "fax", label: "Fax" }),
          search.createColumn({ name: "supervisor", label: "Supervisor" }),
          search.createColumn({ name: "title", label: "Job Title" }),
          search.createColumn({ name: "altemail", label: "Alt. Email" }),
          search.createColumn({
            name: "custentity_commpct",
            label: "Commission %",
          }),
          search.createColumn({
            name: "custentity_rss_website",
            label: "Website",
          }),
          search.createColumn({
            name: "custentity_rss_linkedin",
            label: "LinkedIn",
          }),
          search.createColumn({
            name: "custentity_ns_pos_employee_scislocations",
            label: "SCIS Locations",
          }),
          search.createColumn({
            name: "custentity_visanumber",
            label: "Visa Number",
          }),
          search.createColumn({
            name: "custentity_visaexpirydate",
            label: "Visa Expiry Date",
          }),
          search.createColumn({
            name: "custentity_passportexpirydate",
            label: "Passport Expiry Date",
          }),
          search.createColumn({
            name: "custentity_passportnumber",
            label: "Passport Number",
          }),
          search.createColumn({
            name: "custentity_citizenship",
            label: "Citizenship",
          }),
        ],
      });

      var searchResult = employeeSearchObj.run().getRange({
        start: 0,
        end: 1000,
      });

      searchResult.forEach(function (result) {
        employees.push({
          entityId: result.getValue({ name: "entityid" }),
          email: result.getValue({ name: "email" }),
          phone: result.getValue({ name: "phone" }),
          altPhone: result.getValue({ name: "altphone" }),
          fax: result.getValue({ name: "fax" }),
          supervisor: result.getText({ name: "supervisor" }),
          title: result.getValue({ name: "title" }),
          altEmail: result.getValue({ name: "altemail" }),
          commissionPct: result.getValue({ name: "custentity_commpct" }),
          website: result.getValue({ name: "custentity_rss_website" }),
          linkedin: result.getValue({ name: "custentity_rss_linkedin" }),
          scisLocations: result.getValue({
            name: "custentity_ns_pos_employee_scislocations",
          }),
          visaNumber: result.getValue({ name: "custentity_visanumber" }),
          visaExpiryDate: result.getValue({
            name: "custentity_visaexpirydate",
          }),
          passportExpiryDate: result.getValue({
            name: "custentity_passportexpirydate",
          }),
          passportNumber: result.getValue({
            name: "custentity_passportnumber",
          }),
          citizenship: result.getValue({ name: "custentity_citizenship" }),
        });
      });
    }

    return JSON.stringify(employees);
  }
  function doPost(data) {
    var employeeRecord = record.create({
      type: record.Type.EMPLOYEE,
      isDynamic: true,
    });

    employeeRecord.setValue("entityid", data.entityId);
    employeeRecord.setValue("firstname", data.firstName);
    employeeRecord.setValue("email", data.email);
    employeeRecord.setValue("subsidiary", data.subsidiary);

    var employeeId = employeeRecord.save();

    return { id: employeeId };
  }
  function doDelete(params) {
    if (params.entityid) {
      log.debug("et", params.entityid);
      record.delete({
        type: record.Type.EMPLOYEE,
        id: params.entityid,
      });
      return { status: success, id: params.entityid };
    } else {
      throw error.create({
        name: "MISSING_REQ_ARG",
        message: "Missing required argument: id",
      });
    }
  }
  function doPut(data) {
    var employeeRecord = record.load({
      type: record.Type.EMPLOYEE,
      id: data.id,
    });
    if (data.id) employeeRecord.setValue("entityid", data.id);
    if (data.companyName)
      employeeRecord.setValue("companyname", data.companyName);
    if (data.email) employeeRecord.setValue("email", data.email);

    employeeRecord.save();

    return { id: data.id };
  }
  return {
    get: doGet,
    post: doPost,
    delete: doDelete,
    put: doPut,
  };
});
