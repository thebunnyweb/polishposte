
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://sljntkzrgtyzuaobarol.supabase.co";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsam50a3pyZ3R5enVhb2Jhcm9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3MTExMDQsImV4cCI6MjA3MDI4NzEwNH0.jsw0_SUDJmUl_6t0avAhakzBTY8It3D59TksIioFsFY";
const supa = url && key ? createClient(url, key) : null;

export async function POST(req: Request) {
  try {
    if (!supa) return NextResponse.json({ error: "Supabase not configured" }, { status: 400 });
    const body = await req.json();
    const { data, error } = await supa!.from("documents").insert(body).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unknown" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    if (!supa) return NextResponse.json({ error: "Supabase not configured" }, { status: 400 });
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const search = searchParams.get("search");

    if (search) {
      const { data, error } = await supa!.from("documents")
        .select("id,filename,lang,theme,font_size,content,is_public")
        .eq("is_public", true)
        .or(`filename.ilike.%${search}%,content.ilike.%${search}%`)
        .order("created_at", { ascending: false })
        .limit(25);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json(data);
    }

    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
    const { data, error } = await supa!.from("documents").select("*").eq("id", id).single();
    if (error) return NextResponse.json({ error: error.message }, { status: 404 });
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unknown" }, { status: 500 });
  }
}
