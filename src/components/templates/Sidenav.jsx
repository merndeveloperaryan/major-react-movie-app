import React from "react";
import { Link } from "react-router-dom";

const Sidenav = () => {
  return (
    <div className="w-[20%] h-full border-r-2 border-white p-10">
      <h1 className="text-white text-xl select-none">
        <i className="text-[#6556cd] mr-1 ri-tv-2-fill"></i>
        <span className="font-bold ">SCSDB</span>
      </h1>
      <nav className="flex flex-col text-zinc-400 text-lg gap-2">
        <h1 className="text-white select-none text-lg font-semibold mt-5">
          New Feeds
        </h1>

        <Link to='/trending' className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg px-3 py-2">
          <i className="mr-1 ri-fire-fill"></i> Trending
        </Link>
        <Link to='/popular' className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg px-3 py-2">
          <i className="mr-1 ri-sparkling-fill"></i> Popular
        </Link>
        <Link to='/movie' className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg px-3 py-2">
          <i className="mr-1 ri-movie-fill"></i> Movies
        </Link>
        <Link to='/tvshow' className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg px-3 py-2">
          <i className="mr-1 ri-tv-fill"></i> TV Shows
        </Link>
        <Link to='/people' className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg px-3 py-2">
          <i className="mr-1 ri-team-fill"></i> People
        </Link>
      </nav>
      <hr className="border-none h-[1px] bg-zinc-400 my-2" />
      <nav className="flex flex-col text-zinc-400 text-lg gap-2">
        <h1 className="text-white select-none text-lg font-semibold mt-5">
          Websites Information
        </h1>

        <Link className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg px-3 py-2">
          <i className="mr-1 ri-information-2-fill"></i> About SCSDB
        </Link>
        <Link className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg px-3 py-2">
          <i className="mr-1 ri-phone-fill"></i> Contact us
        </Link>
      </nav>
    </div>
  );
};

export default Sidenav;
