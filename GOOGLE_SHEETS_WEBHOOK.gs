const WEBHOOK_SECRET = "replace-with-the-same-value-as-GOOGLE_SHEETS_WEBHOOK_SECRET";
const SHEET_NAME = "Audit completions";

function doPost(e) {
  const payload = JSON.parse(e.postData.contents || "{}");

  if (payload.secret !== WEBHOOK_SECRET) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: "Unauthorized" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const row = payload.row || {};
  const sheet = getSheet();
  const headers = Object.keys(row);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }

  const existingHeaders = sheet
    .getRange(1, 1, 1, sheet.getLastColumn())
    .getValues()[0];
  const values = existingHeaders.map((header) => row[header] ?? "");
  sheet.appendRow(values);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  return spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
}
