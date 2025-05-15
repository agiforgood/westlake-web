import { Popover, PopoverTrigger, PopoverContent, Button } from "@heroui/react";

export default function AgPopover({
  content,
  placement = "top",
}: {
  content: string;
  placement?: "top" | "bottom" | "left" | "right";
}) {
  return (
    <Popover placement={placement}>
      <PopoverTrigger>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-small font-bold">Popover Content</div>
          <div className="text-tiny">This is the popover content</div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
