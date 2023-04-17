// This magic code is from ChatGPT ;)

import seedrandom from 'seedrandom'

export const getRandomColor = (seed: number) => {
  // Set the seed for the random number generator
  const rng = seedrandom(String(seed))

  // Generate a random hue (0-360)
  const hue = Math.floor(rng() * 361)

  // Generate a random saturation value (40-100)
  const saturation = Math.floor(rng() * 61) + 40

  // Generate a random lightness value (20-80)
  const lightness = Math.floor(rng() * 61) + 20

  // Convert the HSL values to a hex color value
  const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`.toUpperCase()
  return color
}
