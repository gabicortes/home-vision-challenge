import { DollarSign, MapPin, UserRound } from "lucide-react";
import type { House } from "../../types";

type CardProps = {
  item: House;
};

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const Card = ({ item }: CardProps) => {
  return (
    <article className="overflow-hidden rounded-lg border border-border-subtle bg-background-surface shadow-card">
      <img
        className="block h-[230px] w-full object-cover"
        src={item.photoURL}
        alt={`House at ${item.address}`}
        loading="lazy"
      />

      <div className="p-4">
        <p className="m-0 flex items-start gap-2 text-subtitle font-semibold text-text-primary">
          <MapPin
            aria-hidden="true"
            className="mt-[0.2rem] size-4 shrink-0 text-text-secondary"
          />
          <span>{item.address}</span>
        </p>
        <p className="mt-2 m-0 flex items-start gap-2 text-body font-medium text-text-secondary">
          <UserRound
            aria-hidden="true"
            className="mt-[0.2rem] size-4 shrink-0 text-text-secondary"
          />
          <span>{item.homeowner}</span>
        </p>
        <p className="mt-2 m-0 flex items-start gap-2 text-price leading-[1.1] font-bold text-success">
          <DollarSign
            aria-hidden="true"
            className="mt-[0.3rem] size-4 shrink-0 text-success"
          />
          <span>{formatter.format(item.price)}</span>
        </p>
      </div>
    </article>
  );
};
