import { useQuery } from "@tanstack/react-query";
import http from "../utils/http";
import Recipe from "../types/Recipe";

const getRecipe = async (id: string) => {
  const response = await http.get<Recipe>(`/recipe/${id}`);
  return response.data;
};

const useRecipe = (id: string | string[]) => {
  if (typeof id !== "string") {
    throw new Error("id must be a string");
  }
  return useQuery({
    queryKey: ["recipe", id],
    queryFn: async () => {
      return getRecipe(id);
    },
  });
};

export default useRecipe;
