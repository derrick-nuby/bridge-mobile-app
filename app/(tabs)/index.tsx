import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/attendance.png')}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Smart Attendance</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">🎯 Project Overview</ThemedText>
        <ThemedText>
          This system uses facial recognition and voice activity detection to automatically mark attendance and participation in real-time using Edge Impulse's AI model.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">⚙️ How It Works</ThemedText>
        <ThemedText>
          The app captures 96x96 pixel frames from your camera, converts them into raw RGB888 format, and sends them to a backend API for identification using a trained model.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">📊 Why It's Unique</ThemedText>
        <ThemedText>
          Export attendance logs to Excel, use edge-based AI with minimal data transfer, and scale the system easily by just retraining the model with more students.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">📱 Mobile Demo</ThemedText>
        <ThemedText>
          This mobile app replicates the key features of the web version and provides a sleek, responsive interface for real-time presentation and demoing on-the-go.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">👨‍🎓 Built at CMU-Africa Bridge Program</ThemedText>
        <ThemedText>
          This solution was developed by a passionate team of students as part of a research initiative at Carnegie Mellon University Africa to transform classroom experiences.
        </ThemedText>
      </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 12,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
