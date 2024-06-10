import { useQuery } from "@tanstack/react-query";
import http from "../utils/http";
import Receipe from "../types/Receipe";

const getReceipe = async (id: string) => {
  const response = await http.get<Receipe>(`/recipe/${id}`);
  return response.data;
};

const useReceipe = (id: string | string[]) => {
  if (typeof id !== "string") {
    throw new Error("id must be a string");
  }
  return useQuery({
    queryKey: ["receipe", id],
    queryFn: async () => {
      return getReceipe(id);
    },
  });
};

export default useReceipe;
