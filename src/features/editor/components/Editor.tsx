"use client";

import { fabric } from "fabric";
import { useCallback, useEffect, useRef, useState } from "react";

import { StrokeColorSidebar } from "@/features/editor//components/StrokeColorSidebar";
import { FillColorSidebar } from "@/features/editor/components/FillColorSidebar";
import { Footer } from "@/features/editor/components/Footer";
import { Navbar } from "@/features/editor/components/Navbar";
import { ShapeSidebar } from "@/features/editor/components/ShapeSidebar";
import { Sidebar } from "@/features/editor/components/Sidebar";
import { Toolbar } from "@/features/editor/components/Toolbar";
import { useEditor } from "@/features/editor/hooks/useEditor";
import { ActiveTool, selectionDependentTools } from "@/features/editor/types";

export const Editor = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>("select");

  const onChangeActiveTool = useCallback(
    (tool: ActiveTool) => {
      if (tool === activeTool) return setActiveTool("select");

      // Enable draw mode
      if (tool === "draw") {
      }

      // Disable draw mode
      if (activeTool === "draw") {
      }

      setActiveTool(tool);
    },
    [activeTool]
  );

  const onClearSelection = useCallback(() => {
    if (selectionDependentTools.includes(activeTool)) {
      setActiveTool("select");
    }
  }, [activeTool]);

  const { init, editor } = useEditor({
    clearSelectionCallback: onClearSelection,
  });

  const canvasRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });

    init({
      initialCanvas: canvas,
      initialContainer: containerRef.current!,
    });

    return () => {
      canvas.dispose();
    };
  }, [init]);

  return (
    <div className="h-full flex flex-col">
      <Navbar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />

      <div className="absolute h-[calc(100%-68px)] w-full top-[68px] flex">
        <Sidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <ShapeSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <FillColorSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <StrokeColorSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />

        <main className="bg-muted flex-1 overflow-auto relative flex flex-col">
          <Toolbar
            editor={editor}
            activeTool={activeTool}
            onChangeActiveTool={onChangeActiveTool}
            key={JSON.stringify(editor?.canvas.getActiveObject())}
          />

          <div
            ref={containerRef}
            className="flex-1 h-[calc(100%-124px)] bg-muted"
          >
            <canvas ref={canvasRef} />
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
};
