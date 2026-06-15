"use client";

import Image from "next/image";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured, PRODUCT_BUCKET } from "@/lib/config";

export default function ImageUploader({
  value,
  onChange,
}: {
  value: string[];
  onChange: (urls: string[]) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setError(null);

    if (!isSupabaseConfigured) {
      setError("Configura Supabase para subir imágenes (ver README).");
      return;
    }

    setUploading(true);
    const supabase = createClient();
    const uploaded: string[] = [];

    for (const file of files) {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from(PRODUCT_BUCKET)
        .upload(path, file, { cacheControl: "3600", upsert: false });

      if (upErr) {
        setError(`Error subiendo ${file.name}: ${upErr.message}`);
        continue;
      }
      const { data } = supabase.storage.from(PRODUCT_BUCKET).getPublicUrl(path);
      uploaded.push(data.publicUrl);
    }

    setUploading(false);
    onChange([...value, ...uploaded]);
    e.target.value = "";
  }

  function remove(url: string) {
    onChange(value.filter((u) => u !== url));
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {value.map((url) => (
          <div
            key={url}
            className="relative h-24 w-20 overflow-hidden rounded-lg border border-zinc-200"
          >
            <Image src={url} alt="Producto" fill sizes="80px" className="object-cover" />
            <button
              type="button"
              onClick={() => remove(url)}
              className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-xs text-white hover:bg-black"
              aria-label="Quitar imagen"
            >
              ×
            </button>
          </div>
        ))}

        <label className="flex h-24 w-20 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 text-center text-xs text-zinc-500 hover:border-brand-400">
          {uploading ? "Subiendo…" : "+ Agregar"}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFiles}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
