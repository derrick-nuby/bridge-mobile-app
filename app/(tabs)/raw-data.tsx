import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, TextInput } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import * as Clipboard from 'expo-clipboard';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { MaterialIcons } from '@expo/vector-icons';

export default function RawDataScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [rawOutput, setRawOutput] = useState<string>('');
  const cameraRef = useRef<any>(null);

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

  const captureFrame = async () => {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync({
      quality: 1,
      base64: true,
    });

    const resizedPhoto = await manipulateAsync(
      photo.uri,
      [{ resize: { width: 96, height: 96 } }],
      { format: SaveFormat.JPEG }
    );

    const { uri } = resizedPhoto;
    const imageData = await fetch(uri).then((res) => res.arrayBuffer());
    const uint8Array = new Uint8Array(imageData);

    const hexPixels: string[] = [];
    for (let i = 0; i < uint8Array.length; i += 4) {
      const r = uint8Array[i];
      const g = uint8Array[i + 1];
      const b = uint8Array[i + 2];
      const packedRGB = (r << 16) | (g << 8) | b;
      hexPixels.push(`0x${packedRGB.toString(16).padStart(6, '0')}`);
    }

    const formattedOutput = hexPixels.join(', ');
    setRawOutput(formattedOutput);
  };

  const copyToClipboard = async () => {
    if (!rawOutput) return;
    await Clipboard.setStringAsync(rawOutput);
    Alert.alert('Success', 'Raw pixel data copied to clipboard');
  };

  const shareData = async () => {
    if (!rawOutput) return;
    const fileUri = `${FileSystem.documentDirectory}raw_data_${Date.now()}.txt`;
    await FileSystem.writeAsStringAsync(fileUri, rawOutput);
    await Sharing.shareAsync(fileUri);
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="back" ref={cameraRef} />
      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={captureFrame}>
          <MaterialIcons name="photo-camera" size={24} color="white" />
          <Text style={styles.buttonText}>Capture Frame</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={copyToClipboard}>
          <MaterialIcons name="content-copy" size={24} color="white" />
          <Text style={styles.buttonText}>Copy</Text>
        </TouchableOpacity>
      </View>
      {rawOutput ? (
        <ScrollView style={styles.rawDataContainer}>
          <TextInput
            style={styles.rawDataText}
            value={rawOutput}
            editable={false}
            multiline
          />
        </ScrollView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  camera: {
    flex: 3,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#000',
  },
  button: {
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
  },
  rawDataContainer: {
    flex: 2,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  rawDataText: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#333',
  },
});
