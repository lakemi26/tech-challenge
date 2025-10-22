// components/Spacer.tsx
interface SpacerProps {
  size?: "sm" | "md" | "lg" | "xl";
  horizontal?: boolean;
}

const sizeClasses = {
  sm: "h-4 w-full",
  md: "h-8 w-full",
  lg: "h-16 w-full",
  xl: "h-32 w-full",
};

export const Spacer = ({ size = "md", horizontal = false }: SpacerProps) => {
  const base = sizeClasses[size];
  const className = horizontal
    ? base.replace("h-", "w-").replace("w-full", "h-full")
    : base;

  return <div className={className} aria-hidden="true" />;
};
