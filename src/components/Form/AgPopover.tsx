import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Image,
  Button,
} from "@heroui/react";

export default function AgPopover({
  content,
  placement = "right",
}: {
  content: string;
  placement?: "top" | "bottom" | "left" | "right";
}) {
  return (
    <Popover color="primary" placement={placement}>
      <PopoverTrigger>
        <Button isIconOnly variant="light" size="sm">
          <Image src="/tips.svg" alt="info" width={16} height={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="w-48 text-tiny">{content}</div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
