import Card from './Card';

export const shortenCount = (count) => {
  let countNumber = Number(count);
  if (countNumber >= 1000) {
    const countRounded = Math.round(countNumber / 100) / 10;
    return `${countRounded}k`
  }
  return `${countNumber}`
}

const RepositoryItem = ({ item }) => (
  <Card item={item} />
);

export default RepositoryItem;
