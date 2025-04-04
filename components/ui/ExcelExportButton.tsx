import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAttendance } from '@/context/AttendanceContext';
import { exportToExcel } from '@/utils/export-to-excel';

export function ExcelExportButton() {
  const { students } = useAttendance();

  const handleExport = async () => {
    try {
      await exportToExcel(students);
    } catch (error) {
      console.error('Error exporting to Excel:', error);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleExport}>
      <MaterialIcons name="file-download" size={20} color="white" />
      <Text style={styles.text}>Export</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#b45309',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  text: {
    color: 'white',
    marginLeft: 4,
    fontWeight: '500',
  },
});