// ===============================
// FILE: src/components/PrismPreview.tsx
// ===============================
"use client";
import React, { useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-python";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/themes/prism-tomorrow.css";

const fira = "'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace";

type Props = { code: string; lang: string; fontSize?: number };

export default function PrismPreview({ code, lang, fontSize = 16 }: Props) {
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (!preRef.current) return;
    Prism.highlightAllUnder(preRef.current);
  }, [code, lang, fontSize]);

  return (
    <pre ref={preRef} className={`line-numbers rounded-xl border p-4 overflow-auto bg-[#282c34] text-[#abb2bf] language-${lang}`} style={{ fontFamily: fira, fontSize }}>
      <code className={`language-${lang}`}>{code}</code>
    </pre>
  );
}