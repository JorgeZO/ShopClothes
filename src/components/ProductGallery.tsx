"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const has = images.length > 0;

  return (
    <div>
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 bg-ink-800">
        {has ? (
          <Image
            src={images[active]}
            alt={alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-zinc-600">
            Sin imagen
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActive(i)}
              className={`relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                i === active ? "border-brand-400" : "border-white/10"
              }`}
            >
              <Image
                src={img}
                alt={`${alt} ${i + 1}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
