import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import XLSX from 'xlsx';

interface Student {
  id: string;
  name: string;
  isPresent: boolean;
  lastSeen: Date | null;
  attendanceCount: number;
  participationScore: number;
}

export async function exportToExcel(students: Student[]) {
  // Create workbook and worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet([]);

  // Add title row
  XLSX.utils.sheet_add_aoa(worksheet, [['BLUE CLASS']], { origin: 'A1' });

  // Add header row
  XLSX.utils.sheet_add_aoa(
    worksheet,
    [['ID', 'Name', 'Status', 'Last Seen', 'Attendance Count', 'Participation Score']],
    { origin: 'A2' }
  );

  // Add data rows
  const data = students.map(student => [
    student.id,
    student.name,
    student.isPresent ? 'Present' : 'Absent',
    student.lastSeen ? student.lastSeen.toLocaleString() : 'Never',
    student.attendanceCount,
    student.participationScore,
  ]);
  XLSX.utils.sheet_add_aoa(worksheet, data, { origin: 'A3' });

  // Set merged cells for title
  worksheet['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 5 } }];

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');

  // Generate Excel file in base64
  const excelBase64 = XLSX.write(workbook, {
    type: 'base64',
    bookType: 'xlsx',
  });

  // Create file URI
  const today = new Date().toISOString().split('T')[0];
  const fileUri = `${FileSystem.documentDirectory}attendance_report_${today}.xlsx`;

  // Write file
  await FileSystem.writeAsStringAsync(fileUri, excelBase64, {
    encoding: FileSystem.EncodingType.Base64,
  });

  // Share the file
  await Sharing.shareAsync(fileUri, {
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    dialogTitle: 'Share Attendance Report',
  });
}