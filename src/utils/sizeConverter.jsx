export default function sizeConverter(size) {
  let sizeIncremented = 0;
  let updatedSize = size;
  while (updatedSize / 1000 > 1) {
    console.log('here');
    updatedSize = updatedSize / 1000;
    sizeIncremented += 1;
  }
  return `${Math.round(updatedSize)} ${getSizeSuffix(sizeIncremented)}`;
}

function getSizeSuffix(incremented) {
  if (incremented === 0) return 'B';
  if (incremented === 1) return 'kB';
  if (incremented === 2) return 'MB';
  return 'unknownB';
}
