import { fabric } from "fabric";
import { useCallback, useRef } from "react";

interface UseClipboardProps {
  canvas: fabric.Canvas | null;
}

export const useClipboard = ({ canvas }: UseClipboardProps) => {
  const clipboard = useRef<any>(null);

  const copy = useCallback(() => {
    canvas?.getActiveObject()?.clone((cloned: any) => {
      clipboard.current = cloned;
    });
  }, [canvas]);

  const paste = useCallback(() => {
    if (!clipboard.current) return;

    clipboard.current.cloned((clonedObject: any) => {
      canvas?.discardActiveObject();

      clonedObject.set({
        left: clonedObject.left + 10,
        top: clonedObject.right + 10,
        evented: true,
      });

      if (clonedObject.type == "activeSelection") {
        clonedObject.canvas = canvas;
        clonedObject.forEachObject((obj: any) => {
          canvas?.add(obj);
        });
        clonedObject.setCoords();
      } else {
        canvas?.add(clonedObject);
      }

      clipboard.current.top += 10;
      clipboard.current.left += 10;
      canvas?.setActiveObject(clonedObject);
      canvas?.requestRenderAll();
    });
  }, [canvas]);

  return { copy, paste };
};
