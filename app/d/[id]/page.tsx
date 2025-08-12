// ===============================
// FILE: src/app/d/[id]/page.tsx
// ===============================
import React from "react";
import { createClient } from "@supabase/supabase-js";
import PrismPreview from "@/components/PrismPreview";

const CARBON_BG = {
  midnight: "bg-[#0e1116]",
  onedark: "bg-[#282c34]",
  dracula: "bg-[#282a36]",
  solarized: "bg-[#002b36]",
  nord: "bg-[#2e3440]",
} as const;

type Params = { params: { id: string } };

export default async function DocPage({ params }: Params) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supa = createClient(url, key);
  const { data } = await supa.from("documents").select("*").eq("id", params.id).single();
  if (!data) return <div className="p-10 text-sm text-muted-foreground">Document not found.</div>;

  const theme = (data.theme as keyof typeof CARBON_BG) || "onedark";
  const fontSize = Number(data.font_size ?? 16);
  const lang = String(data.lang || "typescript");
  const code = String(data.content || "");
  const filename = data.filename || (data.type === "markdown" ? "document.md" : `snippet.${lang}`);

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="mx-auto max-w-4xl">
        <div className={`rounded-2xl p-6 md:p-8 shadow-2xl ring-1 ring-black/10 border relative overflow-hidden ${CARBON_BG[theme]}`}>
          <div className="absolute left-4 top-4 flex items-center gap-2 opacity-70">
            <span className="size-3 rounded-full bg-red-400" />
            <span className="size-3 rounded-full bg-yellow-400" />
            <span className="size-3 rounded-full bg-green-400" />
            <span className="ml-2 text-xs text-white/70 select-none">{filename}</span>
          </div>
          <div className="mt-5">
            <PrismPreview code={code} lang={lang} fontSize={fontSize} />
          </div>
        </div>
        <div className="mt-4 text-xs text-muted-foreground">Share this link to show a read‑only code card.</div>
      </div>
    </div>
  );
}