import { AlertTriangle, Loader } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ToolSidebarClose } from "@/features/editor/components/ToolSidebarClose";
import { ToolSidebarHeader } from "@/features/editor/components/ToolSidebarHeader";
import { ActiveTool, Editor } from "@/features/editor/types";
import { useGetImages } from "@/features/images/api/useGetImages";
import { cn } from "@/lib/utils";

interface ImageSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const ImageSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: ImageSidebarProps) => {
  const { data, isLoading, isError } = useGetImages();

  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] h-full w-[360px] flex flex-col",
        activeTool === "images" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Images"
        description="Add images to your canvas"
      />

      {isLoading && (
        <div className="flex items-center flex-1 justify-center">
          <Loader className="size-4 text-muted-foreground animate-spin" />
        </div>
      )}
      {isError && (
        <div className="flex items-center flex-col gap-y-2 justify-center flex-1">
          <AlertTriangle className="size-4 text-muted-foreground" />
          <p className="text-muted-foreground text-xs">
            Failed to fetch images
          </p>
        </div>
      )}

      <ScrollArea>
        <div className="p-4 space-y-1 border-b"></div>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
