// Glassmorphism utility classes and components
export const glassmorphismStyles = {
  // Main container styles
  container: "backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl",

  // Card variations
  card: "backdrop-blur-lg bg-white/15 border border-white/25 rounded-2xl shadow-xl",
  cardHover:
    "hover:bg-white/20 hover:border-white/30 transition-all duration-300",

  // Input field styles
  input:
    "backdrop-blur-md bg-white/20 border border-white/30 text-white placeholder:text-white/60 focus:bg-white/25 focus:border-white/40",
  inputDark:
    "backdrop-blur-md bg-black/20 border border-white/20 text-white placeholder:text-white/50",

  // Button styles
  button:
    "backdrop-blur-md bg-white/20 hover:bg-white/30 border border-white/30 hover:border-white/40",
  buttonPrimary:
    "backdrop-blur-md bg-gradient-to-r from-blue-500/80 to-purple-600/80 hover:from-blue-600/90 hover:to-purple-700/90 border border-white/30",

  // Label styles
  label: "text-white/90 font-medium",
  labelDark: "text-white/80",

  // Error styles
  error: "text-red-300 bg-red-500/20 border border-red-400/30 backdrop-blur-sm",

  // Section styles
  section: "backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl",

  // Header styles
  header:
    "backdrop-blur-xl bg-gradient-to-b from-white/20 to-white/10 border-b border-white/20",
};

// Glassmorphism background component
export const GlassmorphismBackground = ({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "dark" | "gradient";
}) => {
  const backgrounds = {
    default:
      "bg-gradient-to-br from-blue-400/20 via-purple-500/20 to-pink-500/20",
    dark: "bg-gradient-to-br from-gray-900/40 via-blue-900/30 to-purple-900/40",
    gradient:
      "bg-gradient-to-br from-cyan-400/30 via-blue-500/30 to-purple-600/30",
  };

  return (
    <div
      className={`min-h-screen ${backgrounds[variant]} backdrop-blur-3xl relative overflow-hidden`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// Glassmorphism input component
export const GlassInput = ({
  className = "",
  error = false,
  ...props
}: any) => (
  <input
    className={`
      w-full px-4 py-4 sm:py-3 rounded-xl
      backdrop-blur-md bg-white/20 
      border ${error ? "border-red-400/50" : "border-white/30"}
      text-white placeholder:text-white/60
      focus:bg-white/25 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20
      transition-all duration-200
      /* Mobile optimizations */
      text-base sm:text-sm
      touch-manipulation
      /* Prevent zoom on iOS */
      text-16 sm:text-sm
      /* Better touch feedback */
      active:bg-white/30
      ${className}
    `}
    {...props}
  />
);

// Glassmorphism textarea component
export const GlassTextarea = ({
  className = "",
  error = false,
  ...props
}: any) => (
  <textarea
    className={`
      w-full px-4 py-4 sm:py-3 rounded-xl resize-none
      backdrop-blur-md bg-white/20 
      border ${error ? "border-red-400/50" : "border-white/30"}
      text-white placeholder:text-white/60
      focus:bg-white/25 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20
      transition-all duration-200
      /* Mobile optimizations */
      text-base sm:text-sm
      touch-manipulation
      /* Better mobile scrolling */
      overscroll-contain
      /* Prevent zoom on iOS */
      text-16 sm:text-sm
      /* Better touch feedback */
      active:bg-white/30
      ${className}
    `}
    {...props}
  />
);

// Glassmorphism button component
export const GlassButton = ({
  children,
  variant = "primary",
  className = "",
  ...props
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  [key: string]: any;
}) => {
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-500/80 to-purple-600/80 hover:from-blue-600/90 hover:to-purple-700/90 text-white border-white/30",
    secondary: "bg-white/20 hover:bg-white/30 text-white border-white/30",
    outline:
      "bg-transparent hover:bg-white/10 text-white border-white/40 hover:border-white/60",
  };

  return (
    <button
      className={`
        px-6 py-4 sm:py-3 rounded-xl font-medium
        backdrop-blur-md border
        transition-all duration-200
        hover:shadow-lg hover:scale-[1.02]
        focus:outline-none focus:ring-2 focus:ring-white/30
        disabled:opacity-50 disabled:cursor-not-allowed
        /* Mobile optimizations */
        touch-manipulation
        /* Larger touch target */
        min-h-[48px] sm:min-h-[40px]
        /* Better mobile feedback */
        active:scale-[0.98] active:bg-opacity-80
        /* Prevent text selection */
        select-none
        /* Font size optimization */
        text-base sm:text-sm
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
