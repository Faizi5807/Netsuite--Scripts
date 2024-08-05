/**
 * @NApiVersion 2.x
 * @NScriptType MapReduceScript
 */
// Maps the employees ie. reads data from the submitted csv file in suitelet and creates an employee record for each line
define(["N/file", "N/record", "N/runtime", "N/log"], function (
  file,
  record,
  runtime,
  log
) {
  function getInputData() {
    var script = runtime.getCurrentScript();
    var fileId = script.getParameter({ name: "custscript_uploadedfileid" }); // replace with your script parameter ID

    var fileObj = file.load({ id: fileId });
    var fileContents = fileObj.getContents();

    var lines = fileContents.split("\n");

    var data = [];
    for (var i = 0; i < lines.length; i++) {
      data.push({
        lineNumber: i + 1,
        lineContent: lines[i],
      });
    }
    return data;
  }

  function map(context) {
    var employeeData = JSON.parse(context.value);
    log.debug("Inside Employee Map", employeeData);
    var columns = employeeData.lineContent.split(",");

    var firstname = columns[0];
    var lastname = columns[1];
    var email = columns[2];
    var jobtitle = columns[3];
    var subsidiary = columns[4];
    var currency = columns[5];
    log.debug("First Name", firstname);
    log.debug("Last Name", lastname);
    log.debug("Email", email);
    log.debug("Job Title", jobtitle);
    log.debug("Subsidiary", subsidiary);
    log.debug("Currency", currency);
    var employeeRecord = record.create({
      type: record.Type.EMPLOYEE,
      isDynamic: true,
    });
    log.debug("Debug", "Creating employee record");
    if (firstname) {
      employeeRecord.setValue({
        fieldId: "firstname",
        value: firstname,
      });
    }
    if (lastname) {
      employeeRecord.setValue({
        fieldId: "lastname",
        value: lastname,
      });
    }
    if (email) {
      employeeRecord.setValue({ fieldId: "email", value: email });
    }
    if (jobtitle) {
      employeeRecord.setValue({ fieldId: "title", value: jobtitle });
    }
    if (subsidiary) {
      employeeRecord.setValue({
        fieldId: "subsidiary",
        value: parseInt(subsidiary),
      });
    }
    if (currency) {
      employeeRecord.setValue({
        fieldId: "currency",
        value: parseInt(currency),
      });
    }
    log.debug("Debug", "Employee Submitted");
    employeeRecord.save();
  }

  function summarize(summary) {
    log.audit("Summary", summary);
  }

  return {
    getInputData: getInputData,
    map: map,
    summarize: summarize,
  };
});
