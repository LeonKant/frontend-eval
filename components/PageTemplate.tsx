import { PropsWithChildren } from "react";

interface Props {
  header?: string;
}
export default function PageTemplate({
  header,
  children,
}: Props & PropsWithChildren) {
  return (
    <div
      className={`flex flex-col items-center flex-1 justify-items-center min-h-screen`}
    >
      <h1 className={`font-bold text-3xl`}>{header}</h1>
      <div className={`flex-1 w-full`}>{children}</div>
    </div>
  );
}
