interface SPLogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function SPLogo({ size = "md", className = "" }: SPLogoProps) {
  const sizeClasses = {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-sm",
    lg: "w-12 h-12 text-lg",
  }

  return (
    <div
      className={`${sizeClasses[size]} ${className} bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center font-bold text-white shadow-lg`}
    >
      SP
    </div>
  )
}
