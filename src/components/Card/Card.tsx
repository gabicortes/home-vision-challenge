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
    <article className="overflow-hidden rounded-lg border border-border-subtle bg-background-surface shadow-card">
      <div className="relative h-[230px] w-full overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-slate-200" />
        )}
        <img
          className={`block h-[230px] w-full object-cover transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
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
      <div className="p-4">
        <p className="m-0 flex items-start gap-2 text-subtitle font-semibold text-text-primary">
          <MapPin
            aria-hidden="true"
            className="size-4 shrink-0 text-text-secondary"
          />
          <span>{item.address}</span>
        </p>
        <p className="mt-2 m-0 flex items-start gap-2 text-body font-medium text-text-secondary">
          <UserRound
            aria-hidden="true"
            className="size-4 shrink-0 text-text-secondary"
          />
          <span>{item.homeowner}</span>
        </p>
        <p className="mt-2 m-0 flex items-center gap-2 text-price leading-[1.1] font-bold text-success">
          <DollarSign
            aria-hidden="true"
            className="size-4 shrink-0 text-success"
          />
          <span>{item.price}</span>
        </p>
      </div>
    </article>
  );
};
