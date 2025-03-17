import { useLibrary } from "@/hooks/useLibrary";
import { clearLibrary } from "@/services/auth.services";
import { useMutation } from "@tanstack/react-query";
import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

interface PreferencesContextType {
  showActors: boolean;
  showRecommendations: boolean;
  showSimilar: boolean;
  minimalCardView: boolean;
  toggleActors: () => void;
  toggleRecommendations: () => void;
  toggleSimilar: () => void;
  toggleCardView: () => void;
  clearUserLibrary: ReturnType<
    typeof useMutation<{ message: string }, Error, void, unknown>
  >;
}

// eslint-disable-next-line react-refresh/only-export-components
export const PreferencesContext = createContext<PreferencesContextType>(
  {} as PreferencesContextType
);

interface PreferencesProviderProps {
  children: ReactElement[] | ReactElement;
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePreferencesContext() {
  return useContext(PreferencesContext);
}

export default function PreferencesProvider({
  children,
}: PreferencesProviderProps) {
  const { refetchLibrary } = useLibrary();
  const [showActors, setShowActors] = useState<boolean>(() => {
    const stored = localStorage.getItem("showActors");
    return stored ? JSON.parse(stored) : true;
  });

  const [showRecommendations, setShowRecommendations] = useState<boolean>(
    () => {
      const stored = localStorage.getItem("showRecommendations");
      return stored ? JSON.parse(stored) : true;
    }
  );

  const [showSimilar, setShowSimilar] = useState<boolean>(() => {
    const stored = localStorage.getItem("showSimilar");
    return stored ? JSON.parse(stored) : true;
  });

  const [minimalCardView, setMinimalCardView] = useState<boolean>(() => {
    const stored = localStorage.getItem("minimalCardView");
    return stored ? JSON.parse(stored) : false;
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
    localStorage.setItem(
      "showRecommendations",
      JSON.stringify(showRecommendations)
    );
  }, [showRecommendations]);

  useEffect(() => {
    localStorage.setItem("showSimilar", JSON.stringify(showSimilar));
  }, [showSimilar]);

  useEffect(() => {
    localStorage.setItem("minimalCardView", JSON.stringify(minimalCardView));
  }, [minimalCardView]);

  const toggleActors = () => setShowActors((prev) => !prev);
  const toggleRecommendations = () => setShowRecommendations((prev) => !prev);
  const toggleSimilar = () => setShowSimilar((prev) => !prev);
  const toggleCardView = () => setMinimalCardView((prev) => !prev);

  return (
    <PreferencesContext.Provider
      value={{
        showActors,
        showRecommendations,
        showSimilar,
        toggleActors,
        toggleRecommendations,
        toggleSimilar,
        minimalCardView,
        toggleCardView,
        clearUserLibrary,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}
