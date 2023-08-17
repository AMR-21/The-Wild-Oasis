import { useQuery } from "@tanstack/react-query";
import { getCurrentUser as getCurrentUserApi } from "../../services/apiAuth";

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUserApi,
  });

  return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
}
