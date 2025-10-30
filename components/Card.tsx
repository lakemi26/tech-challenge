import { ReactNode } from "react";

type CardProps = {
  children?: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
} & React.ComponentProps<"div">;

export function Card({ children, title, subtitle, className = "" }: CardProps) {
  return (
    <section
      className={`flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 w-full ${className}`}
    >
      {title && (
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
      )}
      {children}
    </section>
  );
}
