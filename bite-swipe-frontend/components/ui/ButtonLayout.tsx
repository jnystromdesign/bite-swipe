import React, { PropsWithChildren } from "react";

type ButtonLayoutProps = PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement>
>;

function ButtonLayout({ children, ...props }: ButtonLayoutProps) {
  return (
    <div className="flex flex-row gap-2 " {...props}>
      {children}
    </div>
  );
}

export default ButtonLayout;
