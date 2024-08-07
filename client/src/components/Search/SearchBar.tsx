import { FiRotateCw, FiSearch, FiX } from "react-icons/fi";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";

interface SearchBarProps {
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  onClose: () => void;
  onClear: () => void;
  isLoading: boolean;
}

export default function SearchBar({
  changeHandler,
  inputValue,
  onClose,
  onClear,
  isLoading,
}: SearchBarProps) {
  return (
    <div className="flex items-center gap-2">
      <Card className="w-full rounded-lg flex items-center gap-2">
        <div className="w-full flex items-center">
          {isLoading ? (
            <FiRotateCw className="ml-3 animate-spin" />
          ) : (
            <FiSearch className="ml-3" />
          )}
          <Input
            name="title"
            type="text"
            value={inputValue}
            onChange={changeHandler}
            className="bg-background text-xl border-0 font-Montserrat focus-visible:ring-0"
            autoFocus
          />
          <div>
            <Button onClick={() => onClear()} variant="secondary" size="icon">
              <FiX />
            </Button>
          </div>
        </div>
      </Card>
      <Button onClick={() => onClose()} className="h-full sm:hidden">
        Close
      </Button>
    </div>
  );
}

// TODO after clear focus on input ?
