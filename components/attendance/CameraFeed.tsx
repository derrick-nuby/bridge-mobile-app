import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { useAttendance } from '@/context/AttendanceContext';
import { useState, useRef, useEffect } from 'react';

export function CameraFeed() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<'back' | 'front'>('back');
  const cameraRef = useRef<any>(null);
  const { processRecognition, isProcessing } = useAttendance();

  useEffect(() => {
    if (!permission) {
      (async () => {
        await requestPermission();
      })();
    }
  }, [permission]);

  if (!permission || !permission.granted) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (cameraRef.current && !isProcessing) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1,
          base64: true,
        });

        // Resize to 96x96 and convert to RGB888
        const resizedPhoto = await manipulateAsync(
          photo.uri,
          [{ resize: { width: 96, height: 96 } }],
          { format: SaveFormat.JPEG, base64: true }
        );

        if (resizedPhoto.base64) {
          await processRecognition(resizedPhoto.base64);
        }
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.overlay}>
          <View style={styles.frame} />
        </View>
      </CameraView>

      <TouchableOpacity
        style={[styles.captureButton, isProcessing && styles.disabledButton]}
        onPress={takePicture}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <MaterialIcons name="hourglass-empty" size={24} color="white" />
        ) : (
          <MaterialIcons name="photo-camera" size={24} color="white" />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 8,
  },
  camera: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  frame: {
    width: 150,
    height: 150,
    borderWidth: 2,
    borderColor: 'rgba(180, 83, 9, 0.7)',
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  captureButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#b45309',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#9ca3af',
  },
});