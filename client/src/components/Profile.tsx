import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { userQueryOptions } from "@/services/auth.services";
import { useQuery } from "@tanstack/react-query";

export default function Profile() {
  const { isLoading, isError, data } = useQuery(userQueryOptions);

  if (isLoading) return "loading";
  if (isError) return "error";

  const fallback =
    data!.user.given_name[0].toUpperCase() +
    data!.user.family_name[0].toUpperCase();

  return (
    <>
      <Avatar className="h-60 w-60 text-8xl">
        {data && <AvatarImage src={data.user.picture!} />}
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
    </>
  );
}
