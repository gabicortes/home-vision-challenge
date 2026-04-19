import { House } from "lucide-react";

export const AppHeader = () => {
  return (
    <header className="flex items-center gap-3 border-b border-border-subtle bg-background-surface px-5 py-6">
      <div className="grid size-8 place-items-center rounded-md text-text-brand">
        <House className="size-6" aria-hidden="true" />
      </div>

      <p className="m-0 text-title leading-[1.2] font-bold text-text-primary">
        Home Vision
      </p>
    </header>
  );
};
