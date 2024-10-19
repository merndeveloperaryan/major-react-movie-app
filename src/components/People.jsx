import { useNavigate } from "react-router-dom";
import Topnav from "./templates/Topnav";
import Dropdown from "./templates/Dropdown";
import { useEffect, useState } from "react";
import Cards from "./templates/Cards";
import Loading from "./templates/Loading";
import axios from "../utils/Axios";
import InfiniteScroll from "react-infinite-scroll-component";

const People = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("popular");
  const [person, setPerson] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const getPersonData = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      console.log(data);
      if (data.results.length > 0) {
        setPerson((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refreshPageHandler = () => {
    if (person.length === 0) {
      getPersonData();
    } else {
      setPage(1);
      setPerson([]);
      getPersonData();
    }
  };

  useEffect(() => {
    refreshPageHandler();
  }, [category]);

  return person && person.length > 0 ? (
    <div className="w-full min-h-screen p-10 bg-[#1f1e24] relative">
      <div className="w-full flex items-center justify-between">
        <h1 className="w-[15%] text-xl text-zinc-300 font-semibold flex items-center gap-2">
          <i
            onClick={() => navigate(-1)}
            className="cursor-pointer ri-arrow-left-line"
          ></i>
          People: <span className="ml-3">{category}</span>
        </h1>
        <div className="flex items-center gap-10 w-[80%] absolute right-10 top-10">
          <Topnav />
        </div>
      </div>

      <InfiniteScroll
        dataLength={person.length}
        next={getPersonData}
        hasMore={hasMore}
        loader={
          <h1 className="text-center text-white py-10 rounded-lg">
            <span className="inline-block w-5 h-5 animate-spin rounded-full border-b-2 border-green-600"></span>
          </h1>
        }
      >
        <Cards data={person} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default People;
