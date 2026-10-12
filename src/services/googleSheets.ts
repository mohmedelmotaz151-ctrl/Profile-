import { getAccessToken } from './firebaseAuth';

export interface ServiceInquiry {
  id: string;
  timestamp: string;
  clientName: string;
  phone: string;
  companyName?: string;
  serviceType: string;
  facilityType: string;
  equipmentCount?: string;
  cityDistrict: string;
  notes?: string;
  status: 'new' | 'in_progress' | 'completed';
}

const SHEETS_BASE_URL = 'https://sheets.googleapis.com/v4/spreadsheets';

/**
 * Creates a dedicated Orkeit Contracting Inquiries spreadsheet in Google Sheets
 */
export async function createInquiriesSpreadsheet(title = 'سجل طلبات واستفسارات أوريكيت للمقاولات | Orkeit Inquiries Log'): Promise<{ spreadsheetId: string; spreadsheetUrl: string }> {
  const token = await getAccessToken();
  if (!token) throw new Error('يرجى تسجيل الدخول بحساب Google أولاً | Please sign in with Google first');

  const payload = {
    properties: {
      title,
    },
    sheets: [
      {
        properties: {
          title: 'الطلبات والاستفسارات',
          gridProperties: {
            frozenRowCount: 1,
          },
        },
        data: [
          {
            startRow: 0,
            startColumn: 0,
            rowData: [
              {
                values: [
                  { userEnteredValue: { stringValue: 'رقم الطلب (ID)' } },
                  { userEnteredValue: { stringValue: 'التاريخ والوقت' } },
                  { userEnteredValue: { stringValue: 'اسم العميل / الجهة' } },
                  { userEnteredValue: { stringValue: 'رقم الجوال' } },
                  { userEnteredValue: { stringValue: 'المنشأة / الشركة' } },
                  { userEnteredValue: { stringValue: 'نوع الخدمة المطلوبة' } },
                  { userEnteredValue: { stringValue: 'نوع المنشأة' } },
                  { userEnteredValue: { stringValue: 'عدد المعدات / الطفايات' } },
                  { userEnteredValue: { stringValue: 'الموقع / الحي' } },
                  { userEnteredValue: { stringValue: 'ملاحظات وتفاصيل' } },
                  { userEnteredValue: { stringValue: 'حالة الطلب' } },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  const res = await fetch(SHEETS_BASE_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Failed to create spreadsheet: ${res.statusText}`);
  }

  const data = await res.json();
  return {
    spreadsheetId: data.spreadsheetId,
    spreadsheetUrl: data.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${data.spreadsheetId}/edit`,
  };
}

/**
 * Appends an inquiry row to the specified Google Spreadsheet
 */
export async function appendInquiryToSheet(spreadsheetId: string, inquiry: ServiceInquiry): Promise<boolean> {
  const token = await getAccessToken();
  if (!token) throw new Error('يرجى تسجيل الدخول بحساب Google أولاً');

  const rowValues = [
    inquiry.id,
    inquiry.timestamp,
    inquiry.clientName,
    inquiry.phone,
    inquiry.companyName || '-',
    inquiry.serviceType,
    inquiry.facilityType,
    inquiry.equipmentCount || '-',
    inquiry.cityDistrict,
    inquiry.notes || '-',
    inquiry.status,
  ];

  // We append to the sheet
  const range = 'A:K';
  const url = `${SHEETS_BASE_URL}/${spreadsheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      range,
      majorDimension: 'ROWS',
      values: [rowValues],
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Failed to append row: ${res.statusText}`);
  }

  return true;
}

/**
 * Reads spreadsheet metadata to get sheet title and sheet names
 */
export async function getSpreadsheetDetails(spreadsheetId: string): Promise<{ title: string; sheets: string[] }> {
  const token = await getAccessToken();
  if (!token) throw new Error('يرجى تسجيل الدخول بحساب Google أولاً');

  const res = await fetch(`${SHEETS_BASE_URL}/${spreadsheetId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Failed to fetch spreadsheet details: ${res.statusText}`);
  }

  const data = await res.json();
  return {
    title: data.properties?.title || 'Google Sheet',
    sheets: data.sheets?.map((s: { properties: { title: string } }) => s.properties.title) || [],
  };
}
