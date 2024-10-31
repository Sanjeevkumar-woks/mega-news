import megaNews from "../assets/mega-logo.svg";

const Hero = () => {
  return (
    <section className="text-gray-600 body-font bg-gradient-to-r from-black to-white rounded-md px-10">
      <div className="container mx-auto flex px-5 py-24  justify-around items-center gap-10 sm:flex-col md:flex-row lg:flex-row sm:my-5 my-2">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
            Stay Informed, Stay Ahead
          </h1>
          <p className="mb-8 leading-relaxed text-gray-300">
            Discover news as it happens, handpicked and curated to match your
            interests. Mega.News offers personalized notifications, real-time
            updates, and easy access to all the stories that matter. Your news,
            your way.
          </p>
          <div className="flex justify-center">
            <button
              className="inline-flex text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded text-lg"
              onClick={() => (window.location.href = "/login")}
            >
              Get Started
            </button>
            <button
              className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded text-lg"
              onClick={() => (window.location.href = "/about")}
            >
              Learn More
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <img
            className="object-cover object-center rounded w-1/2  h-1/2 "
            alt="hero"
            src={megaNews}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
