import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ModelInfoCard } from '@/components/model-info/ModelInfoCard';
import { useQuery } from '@tanstack/react-query';
import { getModelInfo } from '@/services/inference';

export default function SettingsScreen() {
  const { data: modelInfo, isLoading } = useQuery({
    queryKey: ['modelInfo'],
    queryFn: () => getModelInfo(),
  });

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Model Information
      </ThemedText>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {isLoading ? (
          <ThemedText>Loading model information...</ThemedText>
        ) : modelInfo?.success ? (
          <ModelInfoCard modelInfo={modelInfo.data!} />
        ) : (
          <ThemedText>Failed to load model information</ThemedText>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 16,
  },
  scrollContent: {
    paddingBottom: 16,
  },
});