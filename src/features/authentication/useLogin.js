import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: loginApi,
    onSuccess: (user) => {
      // put user data manually in the cache to remove the inactive state
      queryClient.setQueryData(["user"], user.user);
      navigate("/", { replace: true });
    },
    onError: () => {
      toast.error("Wrong email or password");
    },
  });

  return { login, isLoading };
}
