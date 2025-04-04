import { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { useRunClassification } from '@/hooks/useInferenceHooks';
import { useAttendance } from '@/context/AttendanceContext';
import { router } from 'expo-router';

export default function CameraModal() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<'back' | 'front'>('back');
  const [isProcessing, setIsProcessing] = useState(false);
  const cameraRef = useRef<any>(null);
  const { processRecognition } = useAttendance();
  const { mutate } = useRunClassification();

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
      setIsProcessing(true);
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
          // Process the image through your API
          await processRecognition(resizedPhoto.base64);
          router.back();
        }
      } catch (error) {
        console.error('Error taking picture:', error);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.overlay}>
          <View style={styles.frame} />
          <Text style={styles.instruction}>Align face within the frame</Text>
        </View>
      </CameraView>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.captureButton, isProcessing && styles.disabledButton]}
          onPress={takePicture}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <MaterialIcons name="hourglass-empty" size={40} color="white" />
          ) : (
            <MaterialIcons name="photo-camera" size={40} color="white" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.flipButton}
          onPress={() => {
            setFacing(current => (current === 'back' ? 'front' : 'back'));
          }}
        >
          <MaterialIcons name="flip-camera-ios" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  frame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: 'rgba(180, 83, 9, 0.7)', // Amber-800 with opacity
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  instruction: {
    color: 'white',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
  controls: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#b45309', // Amber-800
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  disabledButton: {
    backgroundColor: '#9ca3af', // Gray-400
  },
  flipButton: {
    padding: 15,
  },
});