export default function calculatePageSeed(
  page: number,
  pageSize: number,
  userSeed: number
) {
  return userSeed + page * pageSize;
}
