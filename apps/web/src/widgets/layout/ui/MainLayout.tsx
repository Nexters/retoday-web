import type { PropsWithChildren } from "react";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="mx-4 mt-8 mb-12 flex flex-col gap-5 md:mx-8 md:mt-12 md:mb-20 md:gap-6 xl:mx-17.5 xl:mt-20 xl:mb-35 xl:gap-7">
      {children}
    </div>
  );
};

export default MainLayout;
