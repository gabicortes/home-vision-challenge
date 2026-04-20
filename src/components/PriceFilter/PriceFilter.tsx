type PriceFilterProps = {
  minPriceInput: string;
  maxPriceInput: string;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onClear: () => void;
};

export const PriceFilter = ({
  minPriceInput,
  maxPriceInput,
  onMinPriceChange,
  onMaxPriceChange,
  onClear,
}: PriceFilterProps) => {
  const isClearDisabled = minPriceInput === "" && maxPriceInput === "";

  return (
    <section className="mb-6 rounded-2xl bg-white p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <label className="flex flex-1 flex-col gap-2 text-small font-semibold text-neutral-800">
          Min price
          <input
            type="number"
            min={0}
            value={minPriceInput}
            onChange={(event) => onMinPriceChange(event.target.value)}
            className="w-full rounded-2xl border border-neutral-260 px-3 py-2 text-body text-neutral-900 outline-none transition focus:border-blue-500"
            placeholder="e.g. 300000"
          />
        </label>
        <label className="flex flex-1 flex-col gap-2 text-small font-semibold text-neutral-800">
          Max price
          <input
            type="number"
            min={0}
            value={maxPriceInput}
            onChange={(event) => onMaxPriceChange(event.target.value)}
            className="w-full rounded-2xl border border-neutral-260 px-3 py-2 text-body text-neutral-900 outline-none transition focus:border-blue-500"
            placeholder="e.g. 900000"
          />
        </label>
        <button
          type="button"
          className={`rounded-2xl bg-blue-600 px-4 py-2 text-small font-semibold text-white transition ${
            isClearDisabled
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-blue-700"
          }`}
          disabled={isClearDisabled}
          onClick={onClear}
        >
          Clear
        </button>
      </div>
    </section>
  );
};
