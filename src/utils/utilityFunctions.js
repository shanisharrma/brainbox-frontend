export const formattedDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", options);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "PM" : "AM";
  const formattedTime = `${hours % 12}:${minutes
    .toString()
    .padStart(2, "0")} ${period}`;

  return `${formattedDate} | ${formattedTime}`;
};

export const capitalizeWord = (string) => {
  return string
    .split("-")
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase()
    )
    .join(" ");
};

export const getAverageRating = (ratings) => {
  if (ratings?.length === 0) return 0;
  const totalReviewCount = ratings?.reduce((acc, curr) => {
    acc += curr.rating;
    return acc;
  }, 0);

  const multiplier = Math.pow(10, 1);
  const averageRatingCount =
    Math.round((totalReviewCount / ratings?.length) * multiplier) / multiplier;
  return averageRatingCount;
};

export const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const remainingSeconds = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${hours}h ${minutes}m ${remainingSeconds}s`;
};

export const findArrayIndex = (data, id) => {
  return data.findIndex((item) => item.id === id);
};

// function to generate random colors
export const getRandomColors = (numColors) => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )},${Math.floor(Math.random() * 256)})`;
    colors.push(color);
  }
  return colors;
};
