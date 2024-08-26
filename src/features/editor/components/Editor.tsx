"use client";

import { fabric } from "fabric";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useRef, useState } from "react";

import { StrokeColorSidebar } from "@/features/editor//components/StrokeColorSidebar";
import { AISidebar } from "@/features/editor/components/AISidebar";
import { DrawSidebar } from "@/features/editor/components/DrawSidebar";
import { FillColorSidebar } from "@/features/editor/components/FillColorSidebar";
import { FilterSidebar } from "@/features/editor/components/FilterSidebar";
import { FontSidebar } from "@/features/editor/components/FontSidebar";
import { Footer } from "@/features/editor/components/Footer";
import { ImageSidebar } from "@/features/editor/components/ImageSidebar";
import { Navbar } from "@/features/editor/components/Navbar";
import { OpacitySidebar } from "@/features/editor/components/OpacitySidebar";
import { RemoveBackgroundSidebar } from "@/features/editor/components/RemoveBgSidebar";
import { SettingsSidebar } from "@/features/editor/components/SettingsSidebar";
import { ShapeSidebar } from "@/features/editor/components/ShapeSidebar";
import { Sidebar } from "@/features/editor/components/Sidebar";
import { StrokeWidthSidebar } from "@/features/editor/components/StrokeWidthSidebar";
import { TextSidebar } from "@/features/editor/components/TextSidebar";
import { Toolbar } from "@/features/editor/components/Toolbar";
import { useEditor } from "@/features/editor/hooks/useEditor";
import { ActiveTool, selectionDependentTools } from "@/features/editor/types";
import { ResponseType } from "@/features/projects/api/useGetProject";
import { useUpdateProject } from "@/features/projects/api/useUpdateProject";

interface EditorProps {
  initialData: ResponseType["data"];
}

export const Editor = ({ initialData }: EditorProps) => {
  const { mutate: mutateUpdateProject } = useUpdateProject(initialData.id);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSave = useCallback(
    debounce((values: { json: string; height: number; width: number }) => {
      mutateUpdateProject(values);
    }, 500),
    [mutateUpdateProject]
  );

  const [activeTool, setActiveTool] = useState<ActiveTool>("select");

  const onClearSelection = useCallback(() => {
    if (selectionDependentTools.includes(activeTool)) {
      setActiveTool("select");
    }
  }, [activeTool]);

  const { init, editor } = useEditor({
    defaultState: initialData.json,
    defaultWidth: initialData.width,
    defaultHeight: initialData.height,
    clearSelectionCallback: onClearSelection,
    saveCallback: debouncedSave,
  });

  const onChangeActiveTool = useCallback(
    (tool: ActiveTool) => {
      // Enable draw mode
      if (tool === "draw") {
        editor?.enableDrawingMode();
      }

      // Disable draw mode
      if (activeTool === "draw") {
        editor?.disableDrawingMode();
      }

      if (tool === activeTool) return setActiveTool("select");

      setActiveTool(tool);
    },
    [activeTool, editor]
  );

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
      <Navbar
        id={initialData.id}
        editor={editor}
        activeTool={activeTool}
        onChangeActiveTool={onChangeActiveTool}
      />

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
        <StrokeWidthSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <OpacitySidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <TextSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <FontSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <ImageSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <FilterSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <AISidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <RemoveBackgroundSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <DrawSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <SettingsSidebar
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

          <Footer editor={editor} />
        </main>
      </div>
    </div>
  );
};
