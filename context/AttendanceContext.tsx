import { createContext, useContext, useState, ReactNode } from 'react';
import { useRunClassification } from '@/hooks/useInferenceHooks';

interface Student {
  id: string;
  name: string;
  isPresent: boolean;
  lastSeen: Date | null;
  attendanceCount: number;
  participationScore: number;
}

interface RecognitionResult {
  label: string;
  value: number;
}

interface AttendanceContextType {
  students: Student[];
  markAttendance: (studentName: string, confidence: number) => void;
  processRecognition: (imageData: string) => Promise<void>;
  isProcessing: boolean;
  lastRecognitionResult: RecognitionResult | null;
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export function AttendanceProvider({ children }: { children: ReactNode; }) {
  const [students, setStudents] = useState<Student[]>([]);
  const [lastRecognitionResult, setLastRecognitionResult] = useState<RecognitionResult | null>(null);
  const { mutate, isPending } = useRunClassification();

  const markAttendance = (studentName: string, confidence: number) => {
    setStudents(prevStudents => {
      const existingStudentIndex = prevStudents.findIndex(
        s => s.name.toLowerCase() === studentName.toLowerCase()
      );

      const now = new Date();

      if (existingStudentIndex >= 0) {
        return prevStudents.map((student, index) =>
          index === existingStudentIndex
            ? {
              ...student,
              isPresent: true,
              lastSeen: now,
              attendanceCount: student.attendanceCount + 1,
            }
            : student
        );
      } else {
        return [
          ...prevStudents,
          {
            id: studentName.toLowerCase(),
            name: studentName,
            isPresent: true,
            lastSeen: now,
            attendanceCount: 1,
            participationScore: Math.round(confidence * 100),
          },
        ];
      }
    });
  };

  const processRecognition = async (imageData: string): Promise<void> => {
    try {
      mutate(imageData, {
        onSuccess: data => {
          if (data?.success && data.data?.results?.[0]) {
            const recognizedPerson = data.data.results[0];
            setLastRecognitionResult({
              label: recognizedPerson.label,
              value: recognizedPerson.value,
            });
            markAttendance(recognizedPerson.label, recognizedPerson.value);
          }
        },
      });
    } catch (error) {
      console.error('Error processing recognition:', error);
    }
  };

  return (
    <AttendanceContext.Provider
      value={{
        students,
        markAttendance,
        processRecognition,
        isProcessing: isPending,
        lastRecognitionResult,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
}

export function useAttendance() {
  const context = useContext(AttendanceContext);
  if (context === undefined) {
    throw new Error('useAttendance must be used within an AttendanceProvider');
  }
  return context;
}