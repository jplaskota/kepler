import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useLibrary } from "@/hooks/useLibrary";
import { userQueryOptions } from "@/services/auth.services";
import { useLanguage } from "@/store/language.context";
import { usePreferencesContext } from "@/store/preferences.context";
import { useQuery } from "@tanstack/react-query";
import { Command, Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function UserPage() {
  const { data } = useQuery(userQueryOptions);
  const { theme, setTheme } = useTheme();
  const { cachedSize } = useLibrary();
  const { t, setLanguage } = useLanguage();
  const {
    clearUserLibrary,
    toggleActors,
    showActors,
    toggleRecommendations,
    showRecommendations,
    toggleSimilar,
    showSimilar,
  } = usePreferencesContext();

  const handleClearLibrary = () => {
    clearUserLibrary.mutate();
  };

  const handleToggleActors = () => {
    toggleActors();
  };

  const handleToggleRecommendations = () => {
    toggleRecommendations();
  };

  const handleToggleSimilar = () => {
    toggleSimilar();
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };

  return (
    <div className="container flex max-sm:flex-col gap-4 px-2 sm:px-4 pb-2 sm:pb-4 mx-auto max-w-[1200px]">
      <div className="sm:w-64 w-full space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>{t("userPage.account.title")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center gap-4 pb-4">
              {data && (
                <Avatar className="h-24 w-24">
                  <AvatarImage src={data.user.picture!} />
                  <AvatarFallback>
                    {data.user.given_name?.[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className="text-center">
                <p className="text-xl font-medium">
                  {data?.user?.given_name} {data?.user?.family_name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {data?.user?.email}
                </p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">
                  {t("userPage.account.created")}
                </p>
                <p className="text-sm text-muted-foreground">January 1, 2024</p>
              </div>
              <div>
                <p className="text-sm font-medium">
                  {t("userPage.account.libraryItems")}
                </p>
                <p className="text-sm text-muted-foreground">{cachedSize}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex-1 space-y-4 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>{t("userPage.customization.title")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">
                    {t("userPage.customization.actorsSlider.title")}
                  </label>
                  <p className="text-sm text-muted-foreground">
                    {t("userPage.customization.actorsSlider.description")}
                  </p>
                </div>
                <Switch
                  onCheckedChange={handleToggleActors}
                  checked={showActors}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">
                    {t("userPage.customization.recommendations.title")}
                  </label>
                  <p className="text-sm text-muted-foreground">
                    {t("userPage.customization.recommendations.description")}
                  </p>
                </div>
                <Switch
                  onCheckedChange={handleToggleRecommendations}
                  checked={showRecommendations}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">
                    {t("userPage.customization.similarContent.title")}
                  </label>
                  <p className="text-sm text-muted-foreground">
                    {t("userPage.customization.similarContent.description")}
                  </p>
                </div>
                <Switch
                  onCheckedChange={handleToggleSimilar}
                  checked={showSimilar}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t("userPage.customization.language")}
                </label>
                <Select onValueChange={handleLanguageChange} defaultValue="en">
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="pl">Polski</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t("userPage.customization.theme")}
                </label>
                <div className="flex items-center justify-between rounded-md border p-1">
                  <Button
                    variant={theme === "system" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setTheme("system")}
                    className="w-full"
                  >
                    <Laptop className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={theme === "light" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setTheme("light")}
                    className="w-full"
                  >
                    <Sun className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setTheme("dark")}
                    className="w-full"
                  >
                    <Moon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("userPage.shortcuts.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm">{t("userPage.shortcuts.search")}</span>
              <div className="flex items-center gap-1">
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  <span className="text-xs">
                    <Command className="h-3 w-3" />
                  </span>{" "}
                  K
                </kbd>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm">
                {t("userPage.shortcuts.closeModal")}
              </span>
              <div className="flex items-center gap-1">
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  Esc
                </kbd>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-destructive">
              {t("userPage.dangerZone.title")}
            </CardTitle>
            <CardDescription>
              {t("userPage.dangerZone.description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="w-full"
                  disabled={cachedSize === 0}
                >
                  {t("userPage.dangerZone.clearLibrary.button")}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {t("userPage.dangerZone.clearLibrary.title")}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {t("userPage.dangerZone.clearLibrary.description")}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>
                    {t("userPage.dangerZone.clearLibrary.cancel")}
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearLibrary}>
                    {t("userPage.dangerZone.clearLibrary.confirm")}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
