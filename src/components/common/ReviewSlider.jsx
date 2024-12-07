import { useEffect, useState } from "react";
import { allRatingsAndReviews } from "../../services/operations/courseAPI";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import RatingStars from "./RatingStars";

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;

  useEffect(() => {
    const fetchAllReviews = async () => {
      const result = await allRatingsAndReviews();
      if (result.success) {
        setReviews(result.data);
      }
    };
    fetchAllReviews();
  }, []);

  return (
    <div className="text-rich-black-5 w-full">
      <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
        {reviews && reviews.length > 0 ? (
          <Swiper
            slidesPerView={4}
            spaceBetween={24}
            loop={true}
            freeMode={true}
            autoplay={{
              delay: 2500,
            }}
            modules={[FreeMode, Pagination, Autoplay]}
            className="w-full"
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col gap-3 bg-rich-black-500 p-4 text-14 text-rich-black-25 rounded-md">
                  <div className="flex items-center gap-4">
                    <img
                      src={review.students.profileDetails.imageUrl}
                      alt="Profile Pic"
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <p className="font-semibold text-rich-black-5">
                        {review.students.firstName +
                          " " +
                          review.students.lastName}
                      </p>
                      <p className="font-semibold text-rich-black-100 text-sm">
                        {review.course.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center gap-2">
                    <p className="font-semibold text-crimsonRed-25">
                      ({review.rating})
                    </p>
                    <RatingStars reviewCount={review.rating} starSize={24} />
                  </div>
                  <div className="font-medium text-rich-black-25">
                    {review.review.split(" ").length > truncateWords
                      ? review.review
                          .split(" ")
                          .slice(0, truncateWords)
                          .join(" ") + "..."
                      : review.review}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-rich-black-100 text-2xl my-4">
            No Reviews Found
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSlider;
