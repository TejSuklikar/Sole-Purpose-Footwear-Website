// Helper function to format shoe sizes for display
export function formatSizeDisplay(size: string, sizeCategory: string): string {
  // For kids sizes, just return the size as-is
  if (sizeCategory === "Kids") {
    return size
  }

  // For adult sizes, show both men's and women's sizes
  const mensSize = Number.parseFloat(size)
  if (isNaN(mensSize)) return size

  const womensSize = mensSize + 1.5
  return `M ${mensSize} / W ${womensSize}`
}
