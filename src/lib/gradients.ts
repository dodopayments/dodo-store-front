export const productGradients = [
  "bg-gradient-to-tr from-blue-400 to-purple-500",
  "bg-gradient-to-tr from-green-400 to-cyan-500",
  "bg-gradient-to-tr from-orange-400 to-pink-500",
  "bg-gradient-to-tr from-indigo-400 to-rose-500",
  "bg-gradient-to-tr from-teal-400 to-yellow-500",
] as const;

export const getRandomGradient = (id: string) => {
  return productGradients[parseInt(id) % productGradients.length];
};
