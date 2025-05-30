import axios from "axios";
import React, { useState } from "react";

const News = () => {
  const gnewsApiKey = import.meta.env.VITE_GNEWS_API;
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://gnews.io/api/v4/search?q=${query}&lang=en&apikey=${gnewsApiKey}`
      );
      if (response?.data) {
        setArticles(response?.data?.articles);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    fetchNews();
  };

  return (
    <div className="bg-black w-screen min-h-screen p-5">
      <header className="w-full pt-6">
        <h4 className="text-xl text-center text-blue-400 font-bold">
          React News Website
        </h4>
        <p className="text-gray-400 opacity-80 text-center">
          Search and browse daily news
        </p>
      </header>
      <div className="flex items-center justify-center mt-6 gap-5">
        <input
          type="text"
          className="bg-white w-[40%] p-3 border-none rounded"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleClick}
          className="text-white bg-blue-600 px-6 py-3 rounded font-semibold"
        >
          Search news
        </button>
      </div>
      {/* Cards render */}
      <div className="grid grid-cols-2 max-w-7xl mx-auto md:grid-cols-3 items-center justify-center mt-5 gap-3">
        {isLoading ? (
          <div className="col-span-full flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          articles?.map((article, index) => (
            <div
              key={index}
              className="w-[25rem] h-96 shadow-lg rounded overflow-hidden bg-white relative"
            >
              <div className="w-full h-48 overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={article.image}
                  alt=""
                />
              </div>
              <div className="p-3">
                <h1 className="text-lg font-bold underline">{article.title}</h1>
                <p className="text-md opacity-95 mb-2">
                  {article.description?.substring(0, 100) ||
                    "No description available"}
                  ...
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  className="absolute bottom-3 left-3 text-sm font-semibold rounded text-white underline px-6 py-2 bg-blue-500"
                >
                  Read more
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default News;
