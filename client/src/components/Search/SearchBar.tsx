import { SearchBarProps } from "@/types/search.types";
import { t } from "i18next";
import {
  X as CloseIcon,
  RotateCw as RotateIcon,
  Search as SearchIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";

export default function SearchBar({
  changeHandler,
  inputValue,
  onClose,
  isLoading,
}: SearchBarProps) {
  return (
    <div className="flex items-center gap-2">
      <Card className="w-full rounded-lg flex items-center gap-2">
        <div className="w-full flex items-center">
          {isLoading ? (
            <RotateIcon className="ml-3 animate-spin w-4 h-4" />
          ) : (
            <SearchIcon className="ml-3 w-4 h-4" />
          )}
          <Input
            name="title"
            type="text"
            placeholder={t("search.placeholder")}
            value={inputValue}
            onChange={changeHandler}
            className="bg-background text-xl border-0 font-Montserrat focus-visible:ring-0"
            autoFocus
          />
          <div></div>
        </div>
      </Card>
      <Button
        onClick={() => onClose()}
        variant="secondary"
        size="icon"
        className="aspect-square"
      >
        <CloseIcon className="w-4 h-4" />
      </Button>
    </div>
  );
}
