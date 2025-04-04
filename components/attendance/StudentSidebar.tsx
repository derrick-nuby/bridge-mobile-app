import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { StudentCard } from '@/components/ui/StudentCard';
import { useAttendance } from '@/context/AttendanceContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function StudentSidebar() {
  const { students } = useAttendance();
  const presentStudents = students.filter(student => student.isPresent);
  const absentStudents = students.filter(student => !student.isPresent);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Students</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {presentStudents.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={[styles.statusIndicator, styles.presentIndicator]} />
              <Text style={styles.sectionTitle}>
                Present ({presentStudents.length})
              </Text>
            </View>
            {presentStudents.map(student => (
              <StudentCard key={student.id} student={student} />
            ))}
          </View>
        )}

        {absentStudents.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={[styles.statusIndicator, styles.absentIndicator]} />
              <Text style={styles.sectionTitle}>
                Absent ({absentStudents.length})
              </Text>
            </View>
            {absentStudents.map(student => (
              <StudentCard key={student.id} student={student} />
            ))}
          </View>
        )}

        {students.length === 0 && (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons
              name="account-question"
              size={40}
              color="#9ca3af"
            />
            <Text style={styles.emptyText}>No students recorded</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%', // changed for full width
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1f2937',
  },
  scrollContent: {
    paddingBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  presentIndicator: {
    backgroundColor: '#10b981',
  },
  absentIndicator: {
    backgroundColor: '#b45309',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    marginTop: 8,
    color: '#9ca3af',
  },
});