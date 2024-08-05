/**
 * @NApiVersion 2.x
 * @NScriptType MapReduceScript
 */
define(["N/record", "N/search", "N/log"], function (record, search, log) {
  function getInputData() {
    return search.create({
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
  }

  function map(context) {
    var searchResult = JSON.parse(context.value);
    log.debug("searchResult", searchResult);
    var employeeId = searchResult.id;

    try {
      var employeeRecord = record.load({
        type: record.Type.EMPLOYEE,
        id: employeeId,
      });

      var Ename = employeeRecord.getValue("entityid");
      var Eemail = employeeRecord.getValue("email");
      var Efax = employeeRecord.getValue("fax");
      var Ephone = employeeRecord.getValue("phone");

      log.debug(
        "Processing Employee",
        "ID: " +
          employeeId +
          ", Name: " +
          Ename +
          ", Email: " +
          Eemail +
          ", Fax: " +
          Efax +
          ", Phone: " +
          Ephone
      );

      employeeRecord.setValue({
        fieldId: "title",
        value: "Master",
      });

      employeeRecord.setValue({
        fieldId: "mobilephone",
        value: "03111211145",
      });

      employeeRecord.save();
    } catch (e) {
      log.error(
        "Error processing employee",
        "ID: " + employeeId + ", Error: " + e.toString()
      );
    }
  }

  function reduce(context) {
    // No reduce logic needed for this script
  }

  function summarize(summary) {
    // No summarize logic needed for this script
  }

  return {
    getInputData: getInputData,
    map: map,
    reduce: reduce,
    summarize: summarize,
  };
});
