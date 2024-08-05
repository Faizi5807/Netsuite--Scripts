/**
 * @NApiVersion 2.x
 * @NScriptType MapReduceScript
 */
//Getting employee dta from a csv file and creating new  record of every line(employee) in file
define(["N/file", "N/record", "N/runtime", "N/error", "N/log"], function (
  file,
  record,
  runtime,
  error,
  log
) {
  function getInputData() {
    try {
      var fileId = "67405";
      var csvFile = file.load({ id: fileId });
      var fileContents = csvFile.getContents();
      log.debug("File Contents", fileContents);
      var csvData = fileContents.split("\n");
      log.debug("CSV Data Array", csvData);

      var inputData = [];
      for (var i = 0; i < csvData.length; i++) {
        inputData.push({
          lineNumber: i + 1,
          lineContent: csvData[i],
        });
      }
      return inputData;
    } catch (e) {
      log.error({
        title: "Error in getInputData",
        details: e.toString(),
      });
      throw e;
    }
  }

  function map(context) {
    try {
      log.debug("Context Value", context.value);

      var lineData = JSON.parse(context.value);
      var columns = lineData.lineContent.split(",");

      var name = columns[0];
      var phone = columns[1];
      var email = columns[2];
      var jobtitle = columns[3];
      var subsidiary = columns[4];
      var currency = columns[5];

      log.debug("Processing Line", {
        lineNumber: lineData.lineNumber,
        name: name,
        phone: phone,
        email: email,
        jobtitle: jobtitle,
        subsidiary: subsidiary,
        currency: currency,
      });

      if (!email || !validateEmail(email)) {
        throw error.create({
          name: "INVALID_EMAIL",
          message:
            "Invalid email address on line " +
            lineData.lineNumber +
            ": " +
            email,
        });
      }

      var employeeRecord = record.create({
        type: record.Type.EMPLOYEE,
        isDynamic: true,
      });
      employeeRecord.setValue({
        fieldId: "firstname",
        value: name.split(" ")[0],
      });
      employeeRecord.setValue({
        fieldId: "lastname",
        value: name.split(" ")[1],
      });
      employeeRecord.setValue({ fieldId: "email", value: email });
      employeeRecord.setValue({ fieldId: "title", value: jobtitle });
      employeeRecord.setValue({
        fieldId: "subsidiary",
        value: parseInt(subsidiary),
      });
      employeeRecord.setValue({ fieldId: "phone", value: phone });
      employeeRecord.setValue({
        fieldId: "currency",
        value: parseInt(currency),
      });

      employeeRecord.save();
    } catch (e) {
      log.error({
        title: "Error processing employee data",
        details: "Line " + lineData.lineNumber + ": " + e.toString(),
      });
    }
  }

  function validateEmail(email) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  }

  return {
    getInputData: getInputData,
    map: map,
  };
});
