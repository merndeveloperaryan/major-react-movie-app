import { Link } from "react-router-dom";

const Banner = ({ data }) => {
  

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.poster_path
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full h-2/3 bg-green-600 flex justify-end items-start flex-col p-10 text-white"
    >
      <h1 className="text-3xl font-bold">
        {data.name || data.title || data.original_name || data.original_title}
      </h1>
      <p className="w-2/3 text-sm font-semibold mt-3 text-zinc-300">
        {data.overview.slice(0, 150)} ...{" "}
        <Link
          to={`/${data.media_type}/details/${data.id}`}
          className="text-blue-400 text-sm font-semibold"
        >
          more
        </Link>
      </p>
      <div className="my-2">
        <i className="ri-megaphone-fill text-yellow-400 text-lg mr-1"></i>{" "}
        {data.first_air_date || "Coming soon..."}
        <i className="ml-3 ri-album-fill text-yellow-400 text-lg mr-1"></i>{" "}
        {data.media_type}
      </div>
      <Link
        to={`/${data.media_type}/details/${data.id}/trailer`}
        className="px-5 py-3 bg-[#6556cd] rounded text-sm text-white font-bold"
      >
        🔥 Watch Trailer
      </Link>
    </div>
  );
};

export default Banner;



