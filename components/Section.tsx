export default function Section({
  children,
  variant = "flex",
  minHeight = "min-h-[80vh]",
  horizontalSpace = "",
  flexDirection = "flex-row",
  backgroundColor = "",
  className = "",
}: {
  children?: React.ReactNode;
  variant?: "flex" | "grid";
  minHeight?: string;
  horizontalSpace?: string;
  flexDirection?: string;
  backgroundColor?: string;
  className?: string;
}) {
  return (
    <section
      className={`${className} ${variant} items-center ${minHeight} ${horizontalSpace} ${flexDirection}`}
      style={{ background: backgroundColor }}
    >
      {children}
    </section>
  );
}
