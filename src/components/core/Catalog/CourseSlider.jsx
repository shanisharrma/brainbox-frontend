import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import CategoryCourseCard from "./CategoryCourseCard";
import "swiper/css";
import "swiper/css/pagination";

/* eslint-disable react/prop-types */
const CourseSlider = ({ courses }) => {
  return (
    <div className="">
      {courses && courses.length > 0 ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          pagination={{ clickable: true }}
          modules={[FreeMode, Pagination]}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="max-h-[30rem]"
        >
          {courses.map((course, index) => (
            <SwiperSlide key={index}>
              <CategoryCourseCard course={course} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="h-40">
          <p className="text-rich-black-100 text-xl font-medium">
            No Courses Found
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseSlider;
