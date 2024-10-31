import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import categories from "../utils/categoriesBar";

const CategoryList = () => {
  const scrollRef = useRef(null);

  const navigate = useNavigate();

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 200, // Reduced scroll distance for smoother scrolling
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.name}`);
  };

  return (
    <div className="relative p-2 border-b border-gray-200 ">
      <div
        className="flex space-x-4 overflow-x-auto p-4 bg-white rounded-md scrollbar-hide"
        ref={scrollRef}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 w-32 h-16 rounded-xl overflow-hidden shadow-md hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => handleCategoryClick(category)}
          >
            <img
              src={category.image}
              alt={category.name}
              className="absolute inset-0 w-full h-full object-cover blur-sm "
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <span className="relative z-10 text-white font-semibold flex items-center justify-center h-full  hover:text-orange-500">
              #{category.name}
            </span>
          </div>
        ))}
      </div>
      {/* left arrow for scrolling visible only when we scroll to the end    */}
      <div
        className={`absolute top-1/2 left-2 transform -translate-y-1/2 z-10 ${
          scrollRef.current?.scrollLeft === 0 ? "0" : "100"
        }`}
      >
        <button
          className="bg-white rounded-full shadow-md p-2 "
          onClick={scrollLeft}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      {/* Right Arrow for Scrolling */}
      <div className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10">
        <button
          className="bg-white rounded-full shadow-md p-2"
          onClick={scrollRight}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CategoryList;
