import { House } from "lucide-react";

export const AppHeader = () => {
  return (
    <header className="bg-white px-6 py-4">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-full bg-blue-100 text-blue-600">
            <House className="size-8" aria-hidden="true" />
          </div>
          <p className="m-0 text-8 leading-[1.1] font-bold tracking-[-0.02em] text-blue-950">
            HomeVision
          </p>
        </div>
      </div>
    </header>
  );
};
