import React, { useEffect } from "react";
import { asyncLoadPerson, removePerson } from "../store/actions/personAction";
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

const PersonDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(asyncLoadPerson(id));

    return () => {
      dispatch(removePerson());
    };
  }, [id]);

  console.log(info);

  return info ? (
    <div className="w-full min-h-screen bg-[#1F1E24] p-10 text-white">
      <nav className="w-full text-white flex gap-10 mb-10">
        <Link
          onClick={() => navigate(-1)}
          className="text-xl ri-arrow-left-fill"
        >
          <span className="ml-3">Stars</span>
        </Link>
        {/* <a target="_blank" href={info.details.homepage}>
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
        </a> */}
      </nav>

      {/* Part - 1 Poster and details */}
      <div className="w-full flex items-start">
        <div className="relative">
          <img
            className="rounded-lg shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[50vh] object-cover"
            src={`https://image.tmdb.org/t/p/original/${
              info.details.profile_path || info.details.backdrop_path
            }`}
          />
          <span className="absolute top-[6%] right-[-6%] z-20 w-10 h-10 rounded-full bg-yellow-600 text-white flex items-center justify-center">
            {info.details.popularity.toFixed()}%
          </span>
          <div className="flex flex-col gap-2 text-2xl py-3">
            {info.externalids.wikidata_id && (
              <a
                target="_blank"
                href={`https://www.wikidata.org/wiki/${info.externalids.wikidata_id}`}
                className="cursor-pointer ri-external-link-fill"
              >
                <small className="text-sm ml-2 text-zinc-300">Wikidata</small>
              </a>
            )}

            {info.externalids.imdb_id && (
              <a
                target="_blank"
                href={`https://www.imdb.com/name/${info.externalids.imdb_id}`}
                className="cursor-pointer ri-corner-right-up-fill"
              >
                <small className="text-sm ml-2 text-zinc-300">Imdb</small>
              </a>
            )}

            {info.externalids.instagram_id && (
              <a
                target="_blank"
                href={`https://www.instagram.com/${info.externalids.instagram_id}/`}
                className="cursor-pointer ri-instagram-fill"
              >
                <small className="text-sm ml-2 text-zinc-300">Instagram</small>
              </a>
            )}

            {info.externalids.facebook_id && (
              <a
                target="_blank"
                href={`https://www.facebook.com/${info.externalids.facebook_id}/`}
                className="cursor-pointer ri-facebook-circle-fill"
              >
                <small className="text-sm ml-2 text-zinc-300">Facebook</small>
              </a>
            )}

            {info.externalids.twitter_id && (
              <a
                target="_blank"
                href={`https://www.twitter.com/${info.externalids.twitter_id}/`}
                className="cursor-pointer ri-twitter-x-fill"
              >
                <small className="text-sm ml-2 text-zinc-300">Twitter</small>
              </a>
            )}

            {info.externalids.youtube_id && (
              <a
                target="_blank"
                href={`https://www.youtube.com/${info.externalids.youtube_id}/`}
                className="cursor-pointer ri-youtube-fill"
              >
                <small className="text-sm ml-2 text-zinc-300">Youtube</small>
              </a>
            )}
          </div>
        </div>

        <div className="ml-10 w-2/3">
          <h1 className="text-2xl font-bold">{info.details.name} </h1>
          <p className="py-2 text-sm text-zinc-400">
            <b className="pr-2 block py-1 text-white">Known for</b>{" "}
            {info.details.known_for_department}
          </p>
          <p className="text-sm text-zinc-400 py-1">
            <b className="pr-2 block text-zinc-200">Career</b>
            {info.details.biography.slice(0, 400)}..
          </p>
          <p className="text-sm text-zinc-400 py-1">
            <b className="pr-2 block text-zinc-200">Birthday</b>
            {info.details.birthday}
          </p>
          <p className="text-sm text-zinc-400 py-1">
            <b className="pr-2 block text-zinc-200">Birthday Place</b>
            {info.details.place_of_birth}
          </p>
          <p className="text-sm text-zinc-400 py-1">
            <b className="pr-2 block text-zinc-200">Gender</b>
            {info.details.gender === 1 ? "Female" : "Male"}
          </p>

          <div className="bg-zinc-900 p-5 rounded-xl mt-3">
            <h2 className="ml-4 text-xl font-bold py-5">Movies</h2>
            <HorizontalCards data={info.movieCredits.cast} />
            <div className="my-3 text-left">
              <HorizontalCards data={info.movieCredits.crew} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;
