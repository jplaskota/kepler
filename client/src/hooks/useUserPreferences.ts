import { clearLibrary } from "@/services/auth.services";
import { useMutation } from "@tanstack/react-query";
import { useLibrary } from "./useLibrary";

export function useUserPreferences() {
  const { refetchLibrary } = useLibrary();

  const clearUserLibrary = useMutation({
    mutationFn: clearLibrary,
    onSuccess: async () => {
      await refetchLibrary();
    },
  });

  return {
    clearUserLibrary,
  };
}