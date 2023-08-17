import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabines";

export function useCabins() {
  const {
    data: cabins,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { cabins, isLoading };
}
