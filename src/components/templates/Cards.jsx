import { Link } from "react-router-dom";
import noimage from "/noimage.webp";

const Cards = ({ data, title }) => {
  
  return (
    <div className="w-full min-h-screen flex flex-wrap gap-8 mt-10 bg-[#1F1E24] overflow-hidden py-5">
      {data &&
        data.map((c, i) => (
          <Link
            to={`/${c.media_type || title}/details/${c.id}`}
            key={i}
            className="relative z-0 w-56 min-h-72 shadow-[8px_8px_18px_8px_rgba(0,0,0,0.5)]"
          >
            <img
              className="h-3/4 w-full object-cover object-center"
              src={
                c.poster_path || c.backdrop_path || c.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      c.poster_path || c.backdrop_path || c.profile_path
                    }`
                  : noimage
              }
              alt=""
            />
            <h1 className="text-sm font-bold text-zinc-400 mt-5 mb-5 px-1">
              {c.title || c.original_title || c.name || c.original_name}
            </h1>
            {c.vote_average && c.vote_average != 0 && (
              <div className="h-10 w-10 rounded-full bg-yellow-600 text-white text-sm font-semibold flex justify-center items-center absolute right-[-10%] bottom-32">
                {((c.vote_average + 1) * 10).toFixed()}
                <sup>%</sup>
              </div>
            )}
          </Link>
        ))}
    </div>
  );
};

export default Cards;
