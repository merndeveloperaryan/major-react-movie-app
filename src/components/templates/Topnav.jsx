import axios from "../../utils/Axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimage from '/noimage.webp'

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  const getData = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      
      setSearches(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getData();
  }, [query]);

  return (
    <div className="w-full h-[10vh] text-lg relative flex justify-start items-center text-zinc-200 pl-[25%]">
      <i className="text-zinc-200 ri-search-line"></i>
      <input
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        value={query}
        type="text"
        className="w-[49%] mx-10 p-3 outline-none border-none bg-transparent"
        placeholder="Search anything"
      />
      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          className="flex justify-center items-center w-7 rounded-full hover:bg-zinc-700 bg-zinc-800 ri-close-line"
        ></i>
      )}
      {query.length > 0 && (
        <div className="absolute z-40 w-[48%] h-[50vh] top-[100%] rounded overflow-auto bg-zinc-800">
          {searches &&
            searches.map((s, i) => (
              <Link
                to={`/${s.media_type}/details/${s.id}`}
                key={i}
                className="flex gap-3 px-1 py-1 h-20 items-center bg-zinc-700 duration-300 hover:bg-zinc-800 w-full border-b-2 border-zinc-200 text-zinc-400 hover:text-zinc-200"
              >
                <div className="h-16 w-16 rounded overflow-hidden">
                  <img
                    className="h-full w-full object-cover object-center"
                    src={
                      s.backdrop_path ||
                      s.poster_path ? `https://image.tmdb.org/t/p/original/${
                        s.backdrop_path || s.poster_path
                      }` : noimage
                    }
                    alt=""
                  />
                </div>
                <span className="text-xs font-semibold ">
                  {s.name || s.title || s.original_name || s.original_title}
                </span>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default Topnav;
