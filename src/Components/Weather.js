import Axios from "axios";
import { useState, useEffect } from "react";

const Weather = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);

  function cityHandler(e) {
    setCity(e.target.value);
  }

  useEffect(() => {
    Axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=d4c1c99d59fa4bf686881126241709&q=${city}&days=2&aqi=no&alerts=no`
    )
      .then((response) => {
        setData(response.data);
        // console.log(response);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, [city]);

  return (
    <div className=" bg-[#2b2b2b] h-1/2 w-[700px] p-7 rounded-xl absolute top-[50%] left-[50%] text-[whitesmoke] -translate-x-[50%] -translate-y-[50%] ">
      <div className="text-center mb-5 ">
        <input
          type="text"
          value={city}
          onChange={cityHandler}
          placeholder="Search"
          className="px-8 py-2 rounded-2xl text-[#2b2b2b] capitalize outline-none shadow-xl text-center"
        />
      </div>
      <div className="flex justify-between items-center ">
        {data ? (
          <div className=" capitalize font-semibold font-sans flex  relative w-full  justify-between p-4 h-[300px]">
            <div className=" flex flex-col justify-around ">
              <h1 className="text-center mt-2 font-semibold text-[18px] w-[200px]">
                {data.location.country}, {data.location.name}
              </h1>
              <p className="text-center font-bold text-3xl">
                {data.current.temp_c}°C
              </p>
              <p className="text-center font-bold text-3xl">
                {data.current.temp_f}°F
              </p>
            </div>
            <div className="flex flex-col gap-3  justify-around text-lg  ">
              <p>Updated At {data.current.last_updated}</p>
              <p>Sunrise: {data.forecast.forecastday[0].astro.sunrise}</p>
              <p>Sunset: {data.forecast.forecastday[0].astro.sunset}</p>
              <p>Max Temp: {data.forecast.forecastday[0].day.maxtemp_c}°C</p>
              <p>Time: {data.location.localtime}</p>
            </div>
            <img
              className="absolute -top-[25%] -left-2  h-[80px]"
              src={data.current.condition.icon}
              alt=""
            />
          </div>
        ) : (
          <h1 className="text-center pt-52 text-black text-3xl capitalize">
            Weather App, Search city
          </h1>
        )}
      </div>
    </div>
  );
};

export default Weather;
