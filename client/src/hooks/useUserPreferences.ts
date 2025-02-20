import { clearLibrary } from "@/services/auth.services";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useLibrary } from "./useLibrary";

export function useUserPreferences() {
  const { refetchLibrary } = useLibrary();
  const [showActors, setShowActors] = useState<boolean>(() => {
    const stored = localStorage.getItem("showActors");
    return stored ? JSON.parse(stored) : true;
  });

  const clearUserLibrary = useMutation({
    mutationFn: clearLibrary,
    onSuccess: async () => {
      await refetchLibrary();
      toast.success("Library cleared successfully");
    },
  });

  useEffect(() => {
    localStorage.setItem("showActors", JSON.stringify(showActors));
  }, [showActors]);

  const toggleActors = () => {
    setShowActors((prev) => !prev);
  };

  return {
    clearUserLibrary,
    showActors,
    toggleActors,
  };
}
