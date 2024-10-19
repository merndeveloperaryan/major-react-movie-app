import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import NotFound from "../NotFound";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);
  return (
    <div className="fixed top-0 left-0 flex justify-center items-center bg-[rgba(0,0,0,0.8)] w-full h-screen">
      <Link
        onClick={() => navigate(-1)}
        className="text-2xl text-white ri-close-fill absolute right-20 top-10"
      ></Link>
      <ReactPlayer controls url={`https://www.youtube.com/watch?v=${ytvideo?.key}`} />
    </div>
  );
};

export default Trailer;
