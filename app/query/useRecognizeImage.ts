import { useQuery } from "@tanstack/react-query";
import http from "../utils/http";
import { ImageResult } from "expo-image-manipulator";
import { Platform } from "react-native";
import { AxiosError } from "axios";

interface RecognizeImageResponse {
  tag: string;
}

const readAsBase64 = async (file: string): Promise<string> => {
  const response = await fetch(file);
  const blob = await response.blob();
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(
        (reader?.result as string).replace("data:image/jpeg;base64,", "")
      );
    };
    return reader.readAsDataURL(blob);
  });
};

const recognizeImage = async (image: string) => {
  if (!image) {
    return { tag: "" } as RecognizeImageResponse;
  }

  const imgToSend: string | Blob = image.startsWith("file")
    ? await readAsBase64(image)
    : image;

  try {
    const response = await http.post<RecognizeImageResponse>(
      "/recognizeImage",
      {
        image: imgToSend,
      }
    );
    return response.data;
  } catch (error) {
    return { tag: "" } as RecognizeImageResponse;
  }
};

const useRecognizeImage = (image: string) => {
  return useQuery({
    queryKey: ["recognizeImage", image],
    queryFn: () => recognizeImage(image),
  });
};

export default useRecognizeImage;
