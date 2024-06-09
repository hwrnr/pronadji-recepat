import { useQuery } from "@tanstack/react-query";
import http from "../utils/http";
import Receipe from "../types/Receipe";

const searchRecipes = async (search: string) => {
  if (!search) {
    search = "donut";
  }
  const response = await http.get<Array<Receipe>>(
    encodeURI(`/search/${search}`)
  );
  return response.data;
};

const useSearchRecipes = (search: string) => {
  return useQuery({
    queryKey: ["searchRecipes", search],
    queryFn: () => searchRecipes(search),
  });
};

export default useSearchRecipes;
