/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAverageRating } from "../../../utils/utilityFunctions";
import { RatingStars } from "../../common";

const CategoryCourseCard = ({ course }) => {
  const [averageReviewCount, setAverageReviewCount] = useState(0);

  useEffect(() => {
    const count = getAverageRating(course.ratings);
    setAverageReviewCount(count);
  }, [course]);

  return (
    <div>
      <Link to={`/course/${course.id}`}>
        <div className="rounded-lg">
          <img
            src={course.thumbnail}
            alt={course.name}
            className={`h-64 w-full rounded-xl object-cover `}
          />
        </div>
        <div className="flex flex-col gap-2 px-1 py-3">
          <p className="text-xl text-rich-black-5">{course.name}</p>
          <p className="text-sm text-rich-black-50">
            {course.instructor.firstName + " " + course.instructor.lastName}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-crimsonRed-25">
              {averageReviewCount || 0}
            </span>
            <RatingStars reviewCount={averageReviewCount} />
            <span className="text-rich-black-100">
              {course.ratings.length} Ratings
            </span>
          </div>
          <p className="text-xl text-rich-black-5">Rs. {course.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCourseCard;
