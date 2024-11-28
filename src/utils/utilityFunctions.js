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
  if (ratings.length === 0) return 0;
  const totalReviewCount = ratings.reduce((acc, curr) => {
    acc += curr.rating;
    return acc;
  }, 0);

  const multiplier = Math.pow(10, 1);
  const averageRatingCount =
    Math.round((totalReviewCount / ratings.length) * multiplier) / multiplier;
  return averageRatingCount;
};
