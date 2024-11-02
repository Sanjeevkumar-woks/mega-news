import { useEffect } from "react";
import Hero from "../components/hero";
import NewsList from "../components/newsList";
import SubscriptionForm from "../components/subscribe";

import useNews from "../hooks/useNews";

const Home = () => {
  const { topNews, entertainment, lifeStyle, business, loading } = useNews();

  useEffect(() => {
    // Scroll to the top when loading
    if (loading) {
      window.scrollTo(0, 0);
    }
  }, [loading]); // Add loading as a dependency

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen ">
          <i className="fa-solid fa-spinner fa-spin text-4xl"></i>
        </div>
      ) : (
        <div className="flex flex-col gap-4 px-4">
          <Hero />
          <NewsList news={topNews} category="top" />
          <NewsList news={entertainment} category="entertainment" />
          {/* <WeatherDashboard /> */}
          <NewsList news={lifeStyle} category="lifestyle" />
          <NewsList news={business} category="business" />
          <SubscriptionForm />
        </div>
      )}
    </>
  );
};

export default Home;
