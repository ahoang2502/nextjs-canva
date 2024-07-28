import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

import { useGenerativeImage } from "@/features/ai/api/useGenerateImage";
import { ToolSidebarClose } from "@/features/editor/components/ToolSidebarClose";
import { ToolSidebarHeader } from "@/features/editor/components/ToolSidebarHeader";
import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";

interface AISidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const AISidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: AISidebarProps) => {
  const mutation = useGenerativeImage();

  const [value, setValue] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Block with paywall

    mutation.mutateAsync({ prompt: value }).then(({ data }) => {
      editor?.addImage(data);
    });
  };

  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] h-full w-[360px] flex flex-col",
        activeTool === "ai" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader title="AI" description="Generate an image using AI" />

      <ScrollArea>
        <form onSubmit={onSubmit} className="p-4 space-y-6">
          <Textarea
            disabled={mutation.isPending}
            value={value}
            placeholder="An astronaut riding a horse on mars, hd, dramatic lighting"
            cols={30}
            rows={10}
            required
            minLength={3}
            onChange={(e) => setValue(e.target.value)}
          />

          <Button
            disabled={mutation.isPending}
            variant="primary"
            type="submit"
            className="w-full"
          >
            Generate
          </Button>
        </form>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
