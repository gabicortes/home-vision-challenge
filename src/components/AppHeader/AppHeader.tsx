import homeVisionLogo from "../../assets/home-vision-logo.png";

export const AppHeader = () => {
  return (
    <header className="bg-white py-4 px-8">
      <div className="mx-auto flex w-full items-center justify-between">
        <div className="flex items-center">
          <img
            src={homeVisionLogo}
            alt="Home Vision logo"
            className="size-18 object-contain"
          />
          <p className="m-0 text-8 mt-3 leading-[1.1] font-bold tracking-[-0.02em] text-green-600">
            Home Vision
          </p>
        </div>
      </div>
    </header>
  );
};
