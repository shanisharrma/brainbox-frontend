import { useParams } from "react-router-dom";
import { Footer } from "../components/common";
import { useEffect, useState } from "react";
import { getCatalogPageData } from "../services/operations/pageDataApi";
import { capitalizeWord } from "../utils/utilityFunctions";
import { CategoryCourseCard, CourseSlider } from "../components/core/Catalog";

const Catalog = () => {
  const { category } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(1);

  // * fetchAllCategory
  useEffect(() => {
    const getCategoryDetails = async () => {
      setLoading(true);
      const result = await getCatalogPageData(category);
      if (result.success) {
        console.log("response ==>", result.data);
        setCatalogPageData(result.data);
      }
      setLoading(false);
    };
    getCategoryDetails();
  }, [category]);

  return (
    <div>
      {/* Hero Section */}
      <div className=" box-content bg-rich-black-500 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
          <p className="text-sm text-rich-black-100">
            {`Home / Catalog / `}
            <span className="text-crimsonRed-50">
              {capitalizeWord(category)}
            </span>
          </p>
          <h2 className="text-3xl text-rich-black-5">
            {capitalizeWord(category)}
          </h2>
          <p className="max-w-[870px] text-rich-black-100">
            {!loading &&
              catalogPageData &&
              catalogPageData.selectedCategory &&
              catalogPageData.selectedCategory.description}
          </p>
        </div>
      </div>

      <div>
        {catalogPageData ? (
          <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            {/* section 1 */}
            <div>
              <h3 className="text-2xl font-bold text-rich-black-5 lg:text-4xl">
                Top Courses in {capitalizeWord(category)}
              </h3>
              <div className="py-8">
                {catalogPageData && catalogPageData.selectedCategory && (
                  <CourseSlider
                    courses={catalogPageData.selectedCategory.courses}
                  />
                )}
              </div>
            </div>
            {/* Section 2 */}
            <div>
              <h3 className="text-2xl font-bold text-rich-black-5 lg:text-4xl">
                Course to get Started
              </h3>
              <div className="my-4 flex border-b border-b-rich-black-300 text-sm">
                <p
                  className={`px-4 py-2 ${
                    active === 1
                      ? "border-b border-b-crimsonRed-50 text-crimsonRed-50"
                      : "text-rich-black-50"
                  } cursor-pointer`}
                  onClick={() => setActive(1)}
                >
                  Most Popular
                </p>
                <p
                  className={`px-4 py-2 ${
                    active === 2
                      ? "border-b border-b-crimsonRed-50 text-crimsonRed-50"
                      : "text-rich-black-50"
                  } cursor-pointer`}
                  onClick={() => setActive(2)}
                >
                  New
                </p>
              </div>

              <div className="my-8">
                {catalogPageData.otherCategory.map((category, index) => (
                  <CourseSlider key={index} courses={category.courses} />
                ))}
              </div>
            </div>

            {/* SEction 3 */}
            <div>
              <h3 className="text-2xl font-bold text-rich-black-5 lg:text-4xl">
                Frequently Bought Courses Together
              </h3>
              <div className="py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {catalogPageData.mostSelling.map((course, index) => (
                    <CategoryCourseCard key={index} course={course} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="Spinner"></div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Catalog;
