import { AlertTriangle } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useRemoveBackground } from "@/features/ai/api/useRemoveBackground";
import { ToolSidebarClose } from "@/features/editor/components/ToolSidebarClose";
import { ToolSidebarHeader } from "@/features/editor/components/ToolSidebarHeader";
import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { usePaywall } from "@/features/subscriptions/hooks/usePaywall";

interface RemoveBackgroundSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const RemoveBackgroundSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: RemoveBackgroundSidebarProps) => {
  const mutation = useRemoveBackground();
  const { triggerPaywall, shouldBlock } = usePaywall();

  const selectedObject = editor?.selectedObjects[0];

  // @ts-ignore
  const imageSrc = selectedObject?._originalElement?.currentSrc;

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onClick = () => {
    if (shouldBlock) {
      triggerPaywall();
      return;
    }

    mutation.mutate(
      { image: imageSrc },
      {
        onSuccess: ({ data }) => {
          editor?.addImage(data);
        },
      }
    );
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] h-full w-[360px] flex flex-col",
        activeTool === "remove-bg" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Background removal"
        description="Remove background from your images using AI"
      />

      {!imageSrc && (
        <div className="flex flex-col gap-y-4 items-center justify-center flex-1 ">
          <AlertTriangle className="size-4 text-muted-foreground" />

          <p className="text-xs text-muted-foreground">
            Feature not available for this object
          </p>
        </div>
      )}

      {imageSrc && (
        <ScrollArea>
          <div className="p-4 space-y-4">
            <div
              className={cn(
                "relative aspect-square rounded-md overflow-hidden transition bg-muted",
                mutation.isPending && "opacity-50"
              )}
            >
              <Image src={imageSrc} fill alt="image" className="object-cover" />
            </div>

            <Button
              onClick={onClick}
              className="w-full"
              disabled={mutation.isPending}
            >
              Remove background
            </Button>
          </div>
        </ScrollArea>
      )}

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
