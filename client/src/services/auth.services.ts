import { queryOptions } from "@tanstack/react-query";
import { auth } from "./api.services";

const getCurrentUser = async () => {
  const res = await auth.me.$get();
  if (!res.ok) throw new Error("server error");

  const data = await res.json();
  return data;
};

export const clearLibrary = async () => {
  const res = await auth.clearLibrary.$delete();
  if (!res.ok) throw new Error("Failed to clear library");
  return res.json();
};

export const userQueryOptions = queryOptions({
  queryKey: ["get-current-user"],
  queryFn: getCurrentUser,
  staleTime: Infinity,
});
