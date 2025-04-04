// file location: src/hooks/useInferenceHooks.ts

import { useMutation, useQuery } from "@tanstack/react-query";
import { Alert } from "react-native";
import { runClassification, getModelInfo } from "@/services/inference";

export const useGetModelInfo = () => {
  return useQuery({
    queryKey: ["modelInfo"],
    queryFn: () => getModelInfo(),
  });
};

export const useRunClassification = () => {
  return useMutation({
    mutationFn: (features: number[] | string) => runClassification(features),
    onSuccess: (data) => {
      if (data.success) {
        Alert.alert("Success", "Classification completed successfully");
      } else {
        Alert.alert("Error", data.message || "Classification failed");
      }
    },
    onError: (error: Error) => {
      Alert.alert("Error", error.message || "Failed to run classification");
    },
  });
};
