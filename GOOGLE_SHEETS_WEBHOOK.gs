const SHEET_NAME = "Audit completions";
const REQUIRED_SECRET_PROPERTY = "GOOGLE_SHEETS_WEBHOOK_SECRET";

const HEADERS = [
  "synced_at",
  "assessment_id",
  "completed_at",
  "organisation_name",
  "industry",
  "revenue_band",
  "headcount_band",
  "first_name",
  "last_name",
  "email",
  "role",
  "gross_margin_band",
  "cac_band",
  "ltv_band",
  "aperture_score_overall",
  "score_strategy",
  "gap_strategy",
  "score_revenue_pipeline",
  "gap_revenue_pipeline",
  "score_marketing",
  "gap_marketing",
  "score_brand_communications",
  "gap_brand_communications",
  "score_operations",
  "gap_operations",
  "score_ai_automation",
  "gap_ai_automation",
  "score_data_reporting",
  "gap_data_reporting",
  "score_people_culture",
  "gap_people_culture",
  "score_technology_systems",
  "gap_technology_systems",
  "score_customer_experience",
  "gap_customer_experience",
];

function doPost(e) {
  const configuredSecret = PropertiesService
    .getScriptProperties()
    .getProperty(REQUIRED_SECRET_PROPERTY);

  if (!configuredSecret) {
    return jsonResponse({ ok: false, error: "Webhook secret is not configured" });
  }

  const payload = JSON.parse((e.postData && e.postData.contents) || "{}");

  if (payload.secret !== configuredSecret) {
    return jsonResponse({ ok: false, error: "Unauthorized" });
  }

  const row = payload.row || {};
  const sheet = getSheet();
  ensureHeaders(sheet);

  const values = HEADERS.map((header) => row[header] ?? "");
  sheet.appendRow(values);

  return jsonResponse({ ok: true });
}

function ensureHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    return;
  }

  const existingHeaders = sheet
    .getRange(1, 1, 1, Math.max(sheet.getLastColumn(), HEADERS.length))
    .getValues()[0];

  const hasExpectedHeaders = HEADERS.every(
    (header, index) => existingHeaders[index] === header,
  );

  if (!hasExpectedHeaders) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }
}

function getSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  return spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
}

function jsonResponse(body) {
  return ContentService
    .createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}
