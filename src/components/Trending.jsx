import { useNavigate } from "react-router-dom";
import Topnav from "./templates/Topnav";
import Dropdown from "./templates/Dropdown";
import { useEffect, useState } from "react";
import Cards from "./templates/Cards";
import Loading from "./templates/Loading";
import axios from "../utils/Axios";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const GetTrendingData = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );

      if (data.results.length > 0) {
        setTrending((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refreshPageHandler = () => {
    if (trending.length === 0) {
      GetTrendingData();
    } else {
      setPage(1);
      setTrending([]);
      GetTrendingData();
    }
  };

  useEffect(() => {
    refreshPageHandler();
  }, [category, duration]);

  console.log(trending);

  return trending && trending.length > 0 ? (
    <div className="w-full min-h-screen p-10 bg-[#1f1e24] relative">
      <div className="w-full flex items-center justify-between">
        <h1 className="w-[9%] text-xl text-zinc-300 font-semibold flex items-center justify-between">
          <i
            onClick={() => navigate(-1)}
            className="cursor-pointer ri-arrow-left-line"
          ></i>
          Trending
        </h1>
        <div className="flex items-center gap-10 w-[80%] absolute right-10 top-10">
          <Topnav />
          <Dropdown
            title="Category"
            options={["all", "movie", "tv"]}
            func={(e) => setCategory(e.target.value)}
          />
          <Dropdown
            title="Duration"
            options={["day", "week"]}
            func={(e) => setDuration(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={trending.length}
        next={GetTrendingData}
        hasMore={hasMore}
        loader={
          <h1 className="text-center text-white py-10 rounded-lg">
            <span className="inline-block w-5 h-5 animate-spin rounded-full border-b-2 border-green-600"></span>
          </h1>
        }
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
