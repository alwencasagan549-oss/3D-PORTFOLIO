import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'resume.pdf');

  if (!fs.existsSync(filePath)) {
    return new NextResponse('Resume not found', { status: 404 });
  }

  const buffer = fs.readFileSync(filePath);
  const blob = new Blob([buffer], { type: 'application/pdf' });

  return new NextResponse(blob, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="RESUME_Alwin_T._Casagan.pdf"',
      'Content-Length': buffer.length.toString(),
    },
  });
}
