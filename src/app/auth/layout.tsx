import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <main className="mx-auto">{children}</main>;
};

export default layout;
