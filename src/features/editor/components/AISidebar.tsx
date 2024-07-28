import { ScrollArea } from "@/components/ui/scroll-area";
import { ToolSidebarClose } from "@/features/editor/components/ToolSidebarClose";
import { ToolSidebarHeader } from "@/features/editor/components/ToolSidebarHeader";
import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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
        <form className="p-4 space-y-6">
          <Textarea
            placeholder="An astronaut riding a horse on mars, hd, dramatic lighting"
            cols={30}
            rows={10}
            required
            minLength={3}
          />

          <Button variant="primary" type="submit" className="w-full">
            Generate
          </Button>
        </form>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
