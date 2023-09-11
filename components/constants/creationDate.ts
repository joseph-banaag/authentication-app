const currentDate = new Date();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const creationDate = `${
  months[currentDate.getMonth()]
} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;