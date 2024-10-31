import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import NewsCard from "./newsCard";

const NewsList = ({ news, category }) => {
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  // Scroll function to handle left and right scroll
  const scroll = (direction) => {
    const { current } = carouselRef;
    if (current) {
      if (direction === "left") {
        current.scrollLeft -= current.offsetWidth;
      } else {
        current.scrollLeft += current.offsetWidth;
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header with Category and View All Button */}
      <div className="flex justify-between items-center px-4 md:px-10 py-4">
        <p className="text-lg md:text-xl font-semibold text-gray-800 flex items-center space-x-2">
          {category} news &nbsp;
          <i className="fa-solid fa-caret-right"></i>
        </p>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-500 transition-colors"
          onClick={() => {
            navigate(`/${category}`);
          }}
        >
          View All
        </button>
      </div>

      {/* Responsive News Cards Layout */}
      <div className="relative px-4 md:px-10">
        <button
          onClick={() => scroll("left")}
          className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white rounded-full p-2 z-10 hover:bg-gray-600 transition duration-300"
        >
          <i className="fas fa-chevron-left"></i>
        </button>

        {/* News Cards - Responsive carousel on medium and larger screens, list on small screens */}
        <div
          ref={carouselRef}
          className={`flex ${
            news.length > 1
              ? "overflow-x-hidden md:overflow-x-hidden"
              : "flex-wrap"
          } gap-4 p-4 scroll-smooth scrollbar-hide flex-col md:flex-row`}
        >
          {news.map((newsItem) => (
            <div
              className={`w-full ${
                news.length > 1
                  ? "min-w-[280px] sm:min-w-[320px] md:min-w-[340px] lg:min-w-[280px]"
                  : "w-full"
              }`}
              key={newsItem.article_id}
            >
              <NewsCard news={newsItem} />
            </div>
          ))}
        </div>

        {/* Right Arrow - Hidden on small screens */}
        <button
          onClick={() => scroll("right")}
          className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white rounded-full p-2 z-10 hover:bg-gray-600 transition duration-300"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default NewsList;
