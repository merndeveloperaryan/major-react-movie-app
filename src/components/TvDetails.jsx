import React, { useEffect } from "react";
import { asyncLoadTv, removeTv } from "../store/actions/tvAction";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./templates/Loading";
import HorizontalCards from "./templates/HorizontalCards";

const TvDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);
  const { pathname } = useLocation();
  console.log(id)

  useEffect(() => {
    dispatch(asyncLoadTv(id));

    return () => {
      dispatch(removeTv());
    };
  }, [id]);

  console.log(info);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7), rgba(0,0,0,0.6)), url(https://image.tmdb.org/t/p/original/${info.details.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="relative min-h-screen p-10 w-full bg-[#1F1E24]"
    >
      <nav className="w-full mb-10 text-white flex gap-10">
        <Link
          onClick={() => navigate(-1)}
          className="text-xl ri-arrow-left-fill"
        ></Link>
        <a target="_blank" href={info.details.homepage}>
          <i className="ri-external-link-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalids.wikidata_id}`}
        >
          <i className="ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalids.imdb_id}`}
        >
          imdb
        </a>
      </nav>

      {/* Part - 1 Poster and details */}
      <div className="w-full flex items-start">
        <img
          className="rounded-lg shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[50vh] object-cover"
          src={`https://image.tmdb.org/t/p/original/${
            info.details.poster_path || info.details.backdrop_path
          }`}
          alt=""
        />
        <div className="ml-10 w-3/4 py-5 text-white pt-1">
          <p className="text-sm font-medium mb-4">
            <span className="text-[#7684e4]">
              {info.details.production_companies[0].name}
            </span>{" "}
            Presents...
          </p>
          <h1 className="text-2xl font-bold leading-none">
            {info.details.name ||
              info.details.title ||
              info.details.original_name ||
              info.details.original_title}
          </h1>
          <div className="flex gap-5 items-center  mt-5">
            <span className="flex justify-center items-center w-8 h-8 rounded-full bg-yellow-600 text-zinc-200">
              <span className="text-sm">
                {(info.details.vote_average * 10).toFixed()}%
              </span>
            </span>
            <span className="text-sm">Reviews: {info.details.vote_count}</span>
          </div>
          <p className="py-2 text-sm">
            Release on : {info.details.first_air_date}
          </p>
          <p className="pb-4 pt-2 mb-10 text-sm w-2/3">
            {info.details.overview}
          </p>
          <Link
            to={
              info.videos
                ? `${pathname}/trailer`
                : `${pathname}/trailer/notfound`
            }
            className="p-3 bg-[#6556cd] rounded text-sm text-white font-bold"
          >
            <i className=" ri-play-fill"></i> Watch Trailer
          </Link>
        </div>
      </div>

      <h1 className="text-white text-xl font-semibold my-10 px-3">
        Seasons
      </h1>
      {info.details.seasons ? (
        <HorizontalCards data={info.details.seasons} />
      ) : (
        <p className="text-xl font-semibold text-white">
          New season coming soon....
        </p>
      )}

      <h1 className="text-white text-xl font-semibold my-10 px-3">
        Recommendations or Similar Tvs
      </h1>
      {(info.recommendations || info.similar).length > 0 ? (
        <HorizontalCards data={info.recommendations || info.similar} />
      ) : (
        <p className="text-sm ml-3 font-semibold text-zinc-400  ">
          Recommendations Not Available
        </p>
      )}
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default TvDetails;
