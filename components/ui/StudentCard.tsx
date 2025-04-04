import { View, StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Student {
  id: string;
  name: string;
  isPresent: boolean;
  lastSeen: Date | null;
  attendanceCount: number;
  participationScore: number;
}

interface StudentCardProps {
  student: Student;
}

export function StudentCard({ student }: StudentCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <MaterialCommunityIcons
          name="account-circle"
          size={24}
          color="#6b7280"
          style={styles.icon}
        />
        <View>
          <Text style={styles.name}>{student.name}</Text>
          <Text style={styles.lastSeen}>
            {student.lastSeen
              ? `Seen: ${student.lastSeen.toLocaleTimeString()}`
              : 'Never seen'}
          </Text>
        </View>
      </View>
      {student.isPresent && (
        <MaterialCommunityIcons
          name="check-circle"
          size={20}
          color="#10b981"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    backgroundColor: '#f9fafb',
    borderRadius: 6,
    marginBottom: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  lastSeen: {
    fontSize: 12,
    color: '#6b7280',
  },
});