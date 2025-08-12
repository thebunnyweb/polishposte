
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
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
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
    const { data, error } = await supa!.from("documents").select("*").eq("id", id).single();
    if (error) return NextResponse.json({ error: error.message }, { status: 404 });
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unknown" }, { status: 500 });
  }
}
