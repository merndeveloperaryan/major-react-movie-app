import axios from "../utils/Axios";
import { useEffect, useState } from "react";
import Banner from "./templates/Banner";
import Sidenav from "./templates/Sidenav";
import Topnav from "./templates/Topnav";
import HorizontalCards from "./templates/HorizontalCards";
import Dropdown from "./templates/Dropdown";
import Loading from "./templates/Loading";

const Home = () => {
  document.title = "SCSDB | Movie App";
  const [wallpapers, setWallpapers] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setcategory] = useState("tv");

  const getWallpapers = async () => {
    try {
      const { data } = await axios.get(`/trending/movie/day`);
      const randomData =
        data.results[(Math.random() * data.results.length).toFixed()];

      setWallpapers(randomData);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const GetTrendingData = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results)
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    !wallpapers && getWallpapers();
    GetTrendingData();
  }, [category]);


  return wallpapers && trending ? (
    <div className="w-full h-screen bg-[#1f1e24] flex">
      <Sidenav />

      <div className="w-[80%] h-full overflow-y-auto">
        <Topnav />
        <Banner data={wallpapers} />
        <div className="my-5 flex justify-between px-4">
          <h1 className="text-2xl font-normal text-zinc-300">Trending</h1>
          <Dropdown title="Filter" options={["movie","tv" ]} func={(e)=> setcategory(e.target.value)} />
        </div>
        <HorizontalCards data={trending} />
      </div>
    </div>
  ) : <Loading />
};

export default Home;
