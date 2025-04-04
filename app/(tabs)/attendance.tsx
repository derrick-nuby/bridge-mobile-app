import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { CameraFeed } from '@/components/attendance/CameraFeed';
import { StudentSidebar } from '@/components/attendance/StudentSidebar';
import { AttendanceProvider } from '@/context/AttendanceContext';

export default function AttendanceScreen() {
  return (
    <AttendanceProvider>
      <ThemedView style={styles.container}>
        <View style={styles.cameraContainer}>
          <CameraFeed />
        </View>
        <View style={styles.studentsContainer}>
          <StudentSidebar />
        </View>
      </ThemedView>
    </AttendanceProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cameraContainer: {
    aspectRatio: 1,
    marginBottom: 16,
  },
  studentsContainer: {
    flex: 1,
  },
});