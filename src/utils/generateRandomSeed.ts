export default function generateRandomSeed() {
  return Math.floor(Math.random() * new Date().getTime());
}
