// Simple background component
export const SimpleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background" />

      {/* Optional subtle pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)`,
        }}
        aria-hidden="true"
      />
    </div>
  );
};