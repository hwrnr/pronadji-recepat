import { useQuery } from "@tanstack/react-query";
import http from "../utils/http";
import { ImageResult } from "expo-image-manipulator";

interface RecognizeImageResponse {
  tag: string;
}

const recognizeImage = async (image: string) => {
  if (!image) {
    return { tag: "" } as RecognizeImageResponse;
  }

  const formData = new FormData();
  formData.append("image", image);

  const response = await http.post<RecognizeImageResponse>(
    "/recognizeImage",
    formData
  );
  return response.data;
};

const useRecognizeImage = (image: string) => {
  return useQuery({
    queryKey: ["recognizeImage", image],
    queryFn: () => recognizeImage(image),
  });
};

export default useRecognizeImage;
