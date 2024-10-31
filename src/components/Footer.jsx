const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 body-font px-20 py-5">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <a
          className="flex title-font font-medium items-center md:justify-start justify-center text-white"
          href="/"
        >
          <h1 className="text-xl font-bold text-orange-600">
            MEGA<span className="text-white">.news</span>
          </h1>
        </a>
        <p className="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">
          Keeping you informed, wherever you are. Your news, your way.
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <a href="https://facebook.com" className="text-gray-400">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" className="ml-4 text-gray-400">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" className="ml-4 text-gray-400">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://linkedin.com" className="ml-4 text-gray-400">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </span>
      </div>
      <div className="container mx-auto py-4 flex flex-wrap flex-col sm:flex-row">
        <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center">
          <a
            href="/category/top"
            className="mr-4 text-gray-400 hover:text-white"
          >
            Top News
          </a>
          <a
            href="/category/world"
            className="mr-4 text-gray-400 hover:text-white"
          >
            World
          </a>
          <a
            href="/category/technology"
            className="mr-4 text-gray-400 hover:text-white"
          >
            Technology
          </a>
          <a
            href="/category/business"
            className="mr-4 text-gray-400 hover:text-white"
          >
            Business
          </a>
          <a
            href="/category/health"
            className="mr-4 text-gray-400 hover:text-white"
          >
            Health
          </a>
          <a
            href="/category/entertainment"
            className="text-gray-400 hover:text-white"
          >
            Entertainment
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
