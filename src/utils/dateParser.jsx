export function getDateString(date) {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const hour =
    newDate.getHours() < 10 ? `0${newDate.getHours()}` : newDate.getHours();
  const minute = newDate.getMinutes();
  return `${year} ${day}/${month} ${hour}:${minute}`;
}
