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
import { userQueryOptions } from "@/services/auth.services";
import { useQuery } from "@tanstack/react-query";
import { Command, Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function UserPage() {
  const { data } = useQuery(userQueryOptions);
  const { theme, setTheme } = useTheme();

  const handleClearLibrary = () => {
    console.log("clearing library data");
  };

  const handleDeleteAccount = () => {
    console.log("deleting account");
  };

  const handleToggleActors = () => {
    console.log("toggling actors slider");
  };

  const handleToggleRecommendations = () => {
    console.log("toggling recommendations slider");
  };

  const handleToggleSimilar = () => {
    console.log("toggling similar slider");
  };

  const handleLanguageChange = (value: string) => {
    console.log("changing language to:", value);
  };

  return (
    <div className="container flex max-sm:flex-col gap-4 px-2 sm:px-4 pb-2 sm:pb-4 mx-auto max-w-[1200px]">
      <div className="sm:w-64 w-full space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
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
                <p className="text-sm font-medium">Account Created</p>
                <p className="text-sm text-muted-foreground">January 1, 2024</p>
              </div>
              <div>
                <p className="text-sm font-medium">Library Items</p>
                <p className="text-sm text-muted-foreground">42 items</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex-1 space-y-4 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Customization</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Actors Slider</label>
                  <p className="text-sm text-muted-foreground">
                    Show actors slider in content details
                  </p>
                </div>
                <Switch onCheckedChange={handleToggleActors} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Recommendations</label>
                  <p className="text-sm text-muted-foreground">
                    Show recommendations slider
                  </p>
                </div>
                <Switch onCheckedChange={handleToggleRecommendations} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Similar Content</label>
                  <p className="text-sm text-muted-foreground">
                    Show similar content slider
                  </p>
                </div>
                <Switch onCheckedChange={handleToggleSimilar} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Language</label>
                <Select onValueChange={handleLanguageChange} defaultValue="en">
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="pl">Polish</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Theme</label>
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
            <CardTitle>Keyboard Shortcuts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm">Search</span>
              <div className="flex items-center gap-1">
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  <span className="text-xs">
                    <Command className="h-3 w-3" />
                  </span>{" "}
                  K
                </kbd>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>
              Destructive actions for your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  Clear Library
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear Library</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to clear your library? This action
                    cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearLibrary}>
                    Clear Library
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Account</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete your account? This will
                    remove all your data and cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteAccount}>
                    Delete Account
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
