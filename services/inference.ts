import axios from 'axios';

export interface ProjectInfo {
  id: number;
  owner: string;
  name: string;
  deploy_version: number;
  impulse_id: number;
  impulse_name: string;
}

export interface Threshold {
  id: number;
  type: string;
  min_score: number;
}

export interface ModelProperties {
  frequency: number;
  has_anomaly: number;
  has_visual_anomaly_detection: boolean;
  has_object_tracking: boolean;
  input_features_count: number;
  image_input_width: number;
  image_input_height: number;
  image_input_frames: number;
  image_channel_count: number;
  interval_ms: number;
  label_count: number;
  sensor: number;
  model_type: string;
  labels: string[];
  input_width: number;
  input_height: number;
  frame_sample_count: number;
  slice_size: number;
  use_continuous_mode: boolean;
  is_performance_calibration_enabled: boolean;
  classification_threshold: number;
  thresholds: Threshold[];
}

export interface ClassificationResult {
  success: boolean;
  data?: {
    anomaly: number;
    results: Array<{
      label: string;
      value: number;
      x: number;
      y: number;
      width: number;
      height: number;
    }>;
  };
  message?: string;
}

export interface ModelInfo {
  success: boolean;
  data?: {
    project: ProjectInfo;
    properties: ModelProperties;
  };
  message?: string;
}

const API_BASE_URL = 'https://participro-server.onrender.com/api'; // Replace with your actual API base URL

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const runClassification = async (features: number[] | string): Promise<ClassificationResult> => {
  try {
    const response = await axiosInstance.post<ClassificationResult>('/inference/classify', {
      features
    });
    return response.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to run classification'));
  }
};

export const getModelInfo = async (): Promise<ModelInfo> => {
  try {
    const response = await axiosInstance.get<ModelInfo>('/inference/model-info');
    return response.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, 'Failed to get model info'));
  }
};

function handleAxiosError(error: unknown, defaultMessage: string): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message || defaultMessage;
  }
  return defaultMessage;
}