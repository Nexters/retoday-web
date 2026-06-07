import { NextResponse } from "next/server";
import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

export const runtime = "nodejs";
const SHEET_TITLE = "feedback";
const HEADERS = ["content", "createdAt"];

export async function POST(req: Request) {
  try {
    const { content } = await req.json();

    if (!content?.trim()) {
      return NextResponse.json(
        { message: "content가 필요합니다." },
        { status: 400 },
      );
    }

    const auth = new JWT({
      email: process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const spreadsheetId = process.env.NEXT_PUBLIC_GOOGLE_SPREADSHEET_ID;

    if (!spreadsheetId) {
      return NextResponse.json(
        { message: "GOOGLE_SPREADSHEET_ID가 설정되지 않았습니다." },
        { status: 500 },
      );
    }

    const doc = new GoogleSpreadsheet(spreadsheetId, auth);

    await doc.loadInfo();

    let sheet = doc.sheetsByTitle[SHEET_TITLE];

    if (!sheet) {
      sheet = await doc.addSheet({
        title: SHEET_TITLE,
        headerValues: HEADERS,
      });
    }

    await sheet.addRow({
      content,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "피드백 저장 실패",
      },
      { status: 500 },
    );
  }
}
