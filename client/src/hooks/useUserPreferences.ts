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

  const [showRecommendations, setShowRecommendations] = useState<boolean>(() => {
    const stored = localStorage.getItem("showRecommendations");
    return stored ? JSON.parse(stored) : true;
  });

  const [showSimilar, setShowSimilar] = useState<boolean>(() => {
    const stored = localStorage.getItem("showSimilar");
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

  useEffect(() => {
    localStorage.setItem("showRecommendations", JSON.stringify(showRecommendations));
  }, [showRecommendations]);

  useEffect(() => {
    localStorage.setItem("showSimilar", JSON.stringify(showSimilar));
  }, [showSimilar]);

  const toggleActors = () => {
    setShowActors((prev) => !prev);
  };

  const toggleRecommendations = () => {
    setShowRecommendations((prev) => !prev);
  };

  const toggleSimilar = () => {
    setShowSimilar((prev) => !prev);
  };

  return {
    clearUserLibrary,
    showActors,
    toggleActors,
    showRecommendations,
    toggleRecommendations,
    showSimilar,
    toggleSimilar,
  };
}
