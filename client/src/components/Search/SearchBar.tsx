import { FiSearch, FiX } from "react-icons/fi";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";

interface SearchBarProps {
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  onClose: () => void;
  onClear: () => void;
}

export default function SearchBar({
  changeHandler,
  inputValue,
  onClose,
  onClear,
}: SearchBarProps) {
  return (
    <div className="flex items-center gap-2">
      <Card className="w-full flex items-center gap-2">
        <div className="w-full flex items-center">
          <FiSearch className="ml-3" />
          <Input
            type="text"
            value={inputValue}
            onChange={changeHandler}
            className=" bg-background text-xl border-0 font-Montserrat focus-visible:ring-0"
            autoFocus
          />
        </div>
        <Button onClick={() => onClear()} variant="secondary">
          <FiX />
        </Button>
      </Card>
      <Button onClick={() => onClose()} className="h-full sm:hidden">
        Close
      </Button>
    </div>
  );
}

// TODO after clear focus on input ?
