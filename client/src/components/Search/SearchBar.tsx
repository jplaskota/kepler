import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface SearchBarProps {
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  onClose: () => void;
}

export default function SearchBar({
  changeHandler,
  inputValue,
  onClose,
}: SearchBarProps) {
  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder="Title"
        type="text"
        value={inputValue}
        onChange={changeHandler}
        className="bg-background text-xl"
        autoFocus
      />
      <Button className="h-full" onClick={() => onClose()}>
        Close
      </Button>
    </div>
  );
}

// TODO placeholder ?
