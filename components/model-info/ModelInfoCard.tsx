import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ModelInfo } from '@/services/inference';

interface ModelInfoCardProps {
  modelInfo: {
    project: {
      name: string;
      owner: string;
      deploy_version: number;
    };
    properties: {
      model_type: string;
      image_input_width: number;
      image_input_height: number;
      labels: string[];
      interval_ms: number;
    };
  };
}

export function ModelInfoCard({ modelInfo }: ModelInfoCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Project Information
        </ThemedText>
        <InfoRow label="Name" value={modelInfo.project.name} />
        <InfoRow label="Owner" value={modelInfo.project.owner} />
        <InfoRow
          label="Version"
          value={modelInfo.project.deploy_version.toString()}
        />
      </View>

      <View style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Model Properties
        </ThemedText>
        <InfoRow label="Type" value={modelInfo.properties.model_type} />
        <InfoRow
          label="Input Size"
          value={`${modelInfo.properties.image_input_width}x${modelInfo.properties.image_input_height}`}
        />
        <InfoRow
          label="Interval"
          value={`${modelInfo.properties.interval_ms}ms`}
        />
      </View>

      <View style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Labels ({modelInfo.properties.labels.length})
        </ThemedText>
        <View style={styles.labelsContainer}>
          {modelInfo.properties.labels.map((label, index) => (
            <View key={index} style={styles.label}>
              <ThemedText>{label}</ThemedText>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string; }) {
  return (
    <View style={styles.infoRow}>
      <ThemedText style={styles.infoLabel}>{label}:</ThemedText>
      <ThemedText>{value}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 8,
    color: '#b45309',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  infoLabel: {
    fontWeight: '500',
  },
  labelsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  label: {
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    marginBottom: 8,
  },
});