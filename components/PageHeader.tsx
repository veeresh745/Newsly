import React from "react";

type pageHeaderProperty = {
  title: string;
  subtitle: string;
};

type props = {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
};

function PageHeader({ title, subtitle }: props) {
  return (
    <div className="flex flex-col items-center pb-5">
      <h1 className="font-base md:font-bold text-white mt-9 xl:mt-12 text-3xl md:text-4xl mb-3">
        {title}
      </h1>
      {subtitle && (
        <p className="text-gray-400 md:text-xl font-light max-w-sm md:max-w-md">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default PageHeader;
