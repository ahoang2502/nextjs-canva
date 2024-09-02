"use client";

import { Loader, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  ResponseType,
  useGetTemplates,
} from "@/features/projects/api/useGetTemplates";
import { useCreateProject } from "@/features/projects/api/useCreateProject";

import { TemplateCard } from "./TemplateCard";
import { usePaywall } from "@/features/subscriptions/hooks/usePaywall";

export const TemplatesSection = () => {
  const router = useRouter();

  const { data, isLoading, isError } = useGetTemplates({
    page: "1",
    limit: "4",
  });
  const mutation = useCreateProject();
  const { triggerPaywall, shouldBlock } = usePaywall();

  const onClick = (template: ResponseType["data"][0]) => {
    if (template.isPro && shouldBlock) {
      triggerPaywall();
      return;
    }

    mutation.mutate(
      {
        name: `${template.name} project`,
        json: template.json,
        width: template.width,
        height: template.height,
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/editor/${data.id}`);
        },
      }
    );
  };

  if (isLoading)
    return (
      <div className="space-y-4 ">
        <h3 className="text-lg font-semibold">Start from a template</h3>

        <div className="flex items-center justify-center h-32">
          <Loader className="size-6 text-muted-foreground animate-spin" />
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="space-y-4 ">
        <h3 className="text-lg font-semibold">Start from a template</h3>

        <div className="flex flex-col gap-y-4 items-center justify-center h-32">
          <TriangleAlert className="size-6 text-muted-foreground" />
          <p className="">Failed to load templates</p>
        </div>
      </div>
    );

  if (!data?.length) return null;

  return (
    <div>
      <h3 className="text-lg font-semibold">Start from a template</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 mt-4 gap-4">
        {data.map((template) => (
          <TemplateCard
            imageSrc={template.thumbnailUrl || ""}
            onClick={() => onClick(template)}
            disabled={mutation.isPending}
            description={`${template.width} x ${template.height} px`}
            key={template.id}
            title={template.name}
            width={template.width}
            height={template.height}
            isPro={template.isPro}
          />
        ))}
      </div>
    </div>
  );
};
