/**
 * @NApiVersion 2.x
 * @NScriptType ScheduledScript
 */
define(["N/record", "N/search", "N/log"], function (record, search, log) {
  function execute(context) {
    var employeeSearchObj = search.create({
      type: "employee",
      filters: [["subsidiary", "anyof", "56"]],
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

    var searchResultCount = employeeSearchObj.runPaged().count;
    log.debug("employeeSearchObj result count", searchResultCount);

    employeeSearchObj.run().each(function (result) {
      var employeeId = result.id;

      var employeeRecord = record.load({
        type: record.Type.EMPLOYEE,
        id: employeeId,
      });

      employeeRecord.setValue({
        fieldId: "title",
        value: "Master ",
      });

      employeeRecord.setValue({
        fieldId: "mobilephone",
        value: "0311121134",
      });

      employeeRecord.save();
      log.debug("Employee Updated", "ID: " + employeeId);

      return true;
    });
  }

  return {
    execute: execute,
  };
});
