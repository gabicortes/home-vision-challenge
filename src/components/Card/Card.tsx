import { useState } from "react";
import { DollarSign, MapPin, UserRound } from "lucide-react";
import type { House } from "../../types";

type CardProps = {
  item: House;
  index: number;
};

const FALLBACK_IMAGE_URL =
  "https://placehold.co/800x500?text=Image+Unavailable";

export const Card = ({ item, index }: CardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isAboveFold = index < 3;

  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-soft-lg">
      <div className="relative h-[230px] w-full overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-slate-200" />
        )}
        <img
          className={`block h-[230px] w-full origin-center object-cover bg-neutral-50 transform-gpu transition-opacity duration-300 ${imageLoaded ? "opacity-100 transition-transform duration-500 ease-out hover:scale-[1.015]" : "opacity-0"}`}
          src={item.photoURL}
          alt={`House at ${item.address}`}
          width={800}
          height={500}
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          loading={isAboveFold ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={isAboveFold ? "high" : "auto"}
          onLoad={() => {
            setImageLoaded(true);
          }}
          onError={(event) => {
            if (event.currentTarget.src !== FALLBACK_IMAGE_URL) {
              event.currentTarget.src = FALLBACK_IMAGE_URL;
              return;
            }

            setImageLoaded(true);
          }}
        />
      </div>
      <div className="p-5">
        <p className="m-0 flex items-start gap-2 text-title text-neutral-850 font-extrabold">
          <MapPin
            aria-hidden="true"
            className="mt-1 size-4 shrink-0 text-neutral-500"
          />
          <span>{item.address}</span>
        </p>
        <p className="mt-3 m-0 flex items-start gap-2 text-small text-neutral-500">
          <UserRound
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-neutral-400"
          />
          <span>{item.homeowner}</span>
        </p>
        <p className="mt-3 m-0 flex items-center gap-2 text-price leading-[1.1] font-extrabold text-green-600">
          <DollarSign
            aria-hidden="true"
            className="size-4 shrink-0 text-green-600"
          />
          <span>{item.price}</span>
        </p>
      </div>
    </article>
  );
};
