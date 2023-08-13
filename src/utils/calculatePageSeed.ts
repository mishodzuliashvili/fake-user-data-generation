export default function calculatePageSeed(page: number, userSeed: number) {
  return userSeed + page;
}
