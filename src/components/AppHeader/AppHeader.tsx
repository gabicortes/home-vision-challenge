import { House } from "lucide-react";

export const AppHeader = () => {
  return (
    <header className="bg-white py-4 px-8">
      <div className="mx-auto flex w-full items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid size-12 place-items-center rounded-full bg-blue-100 text-blue-600">
            <House className="size-8" aria-hidden="true" />
          </div>
          <p className="m-0 text-8 leading-[1.1] font-bold tracking-[-0.02em] text-blue-600">
            Home Vision
          </p>
        </div>
      </div>
    </header>
  );
};
