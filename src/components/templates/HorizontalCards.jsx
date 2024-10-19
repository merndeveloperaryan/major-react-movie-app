import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.webp";

const HorizontalCards = ({ data }) => {
  return (
    <div className="w-full flex overflow-x-auto gap-2 rounded px-4">
      {data.map((item, index) => (
        <Link
          to={`/${item.media_type}/details/${item.id}`}
          key={index}
          className="min-w-[15%] rounded bg-black mb-5 pb-5"
        >
          <img
            className="w-full h-28 rounded object-cover object-center"
            src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : noimage}
            alt={item.title}
          />
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-medium text-gray-600 mt-2 leading-none px-2 tracking-tight my-2">
              <span className="text-xs font-semibold text-white">
                {(item.title || item.name || item.original_name)?.slice(0, 20)}
              </span>
            </h2>
            <p className="text-xs font-medium text-gray-400 px-2 tracking-tight leading-none">
              {item.overview?.slice(0, 40)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HorizontalCards;


