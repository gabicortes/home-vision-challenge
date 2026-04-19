import type { House } from "../../types";
import { Card } from "../Card/Card";

type CardGridProps = {
  items: House[];
};

export const CardGrid = ({ items }: CardGridProps) => {
  return (
    <section
      className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
      aria-label="House listings"
    >
      {items.map((item, index) => (
        <Card key={item.id} item={item} index={index} />
      ))}
    </section>
  );
};
