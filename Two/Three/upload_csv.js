/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
// A suitelet form that lets you upload a csv file and then calls a mapreduce script that reads data and creates employee records line by line
define([
  "N/ui/serverWidget",
  "N/record",
  "N/file",
  "N/task",
  "N/redirect",
], function (serverWidget, record, file, task, redirect) {
  function onRequest(context) {
    if (context.request.method === "GET") {
      var form = serverWidget.createForm({
        title: "Upload CSV File",
      });

      var fileField = form.addField({
        id: "custpage_file",
        type: serverWidget.FieldType.FILE,
        label: "CSV File",
      });

      form.addSubmitButton({
        label: "Submit",
      });

      context.response.writePage(form);
    } else {
      var uploadedFile = context.request.files.custpage_file;

      if (uploadedFile) {
        var fileObj = file.create({
          name: uploadedFile.name,
          fileType: uploadedFile.fileType,
          contents: uploadedFile.getContents(),
          folder: 11974,
        });

        var fileId = fileObj.save();
        log.debug("Debug", "File Saved");
        var mrTask = task.create({
          taskType: task.TaskType.MAP_REDUCE,
          scriptId: "4413",
          params: {
            custscript_uploadedfileid: fileId,
          },
        });

        var mrTaskId = mrTask.submit();
        log.debug("Debug", "Task Submitted");
        redirect.toSuitelet({
          scriptId: "4412",
          deploymentId: "1",
          parameters: {
            message:
              "File uploaded and processing started with Task ID: " + mrTaskId,
          },
        });
      }
    }
  }

  return {
    onRequest: onRequest,
  };
});
