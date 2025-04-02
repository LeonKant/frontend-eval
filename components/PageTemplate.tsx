import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface Props {
  header?: string;
  pageClassName?: string;
  innerClassName?: string;
}
export default function PageTemplate({
  header,
  children,
  pageClassName,
  innerClassName,
}: Props & PropsWithChildren) {
  return (
    <div
      className={cn(
        pageClassName,
        `flex flex-col items-center flex-1 justify-center`
      )}
    >
      <h1 className={`font-bold text-3xl my-4`}>{header}</h1>
      <div className={cn(innerClassName, `flex flex-col flex-1 w-full items-center`)}>
        {children}
      </div>
    </div>
  );
}
