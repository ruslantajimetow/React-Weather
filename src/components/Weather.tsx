import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import './Weather.scss';
import { Loader } from 'lucide-react';
import { Pagination } from '@mui/material';
import { citiesId } from '../cities';
import SearchedWeather from './SearchedWeather';

type Main = {
  temp: number;
  feels_like: number;
  humidity: number;
};

type Weather = {
  description: string;
  icon: string;
  main: string;
};

type Wind = {
  speed: number;
};

export type WeatherInfo = {
  name: string;
  main: Main;
  id: number;
  weather: Weather[];
  wind: Wind;
};

type WeatherProps = {
  input: string;
  searchedWeather: WeatherInfo;
  searchedLoading: boolean | null;
};

function Weather({ input, searchedWeather, searchedLoading }: WeatherProps) {
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const requests = [
      axios.get(
        `https://api.openweathermap.org/data/2.5/group?id=${citiesId.slice(0, 20).join(',')}&appid=${import.meta.env.VITE_API_KEY}&units=metric`
      ),
      axios.get(
        `https://api.openweathermap.org/data/2.5/group?id=${citiesId.slice(20).join(',')}&appid=${import.meta.env.VITE_API_KEY}&units=metric`
      ),
    ];

    Promise.all(requests)
      .then((res) => {
        setWeatherInfo(res.flatMap((res) => res.data.list));
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  }, []);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangeValue = (e: ChangeEvent<unknown>, val: number) =>
    setCurrentPage(val);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentWeatherItems = weatherInfo.slice(startIndex, endIndex);

  return (
    <>
      {loading && weatherInfo.length === 0 && (
        <div className="loading">
          <Loader className="loading_icon" />
          <span>Loading</span>
        </div>
      )}
      {!input && (
        <>
          <section className="weather">
            {currentWeatherItems.map((item) => {
              return (
                <div key={item.id} className="weather_wrapper">
                  <div className="weather_logo">
                    <img
                      src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                      alt="icon"
                    />
                    <p className="weather_city">{item.name}</p>
                  </div>
                  <div className="weather_info">
                    <p className="weather_info-temp">
                      Temp: {Math.floor(item.main.temp)} <sup>o</sup>C
                    </p>
                    <p className="weather_info-feels">
                      Feels like: {Math.floor(item.main.feels_like)}{' '}
                      <sup>o</sup>C
                    </p>
                    <p className="weather_info-humidity">
                      Humidity: {item.main.humidity} %
                    </p>
                  </div>
                </div>
              );
            })}
          </section>

          {!loading && (
            <div className="pagination">
              <Pagination
                count={Math.ceil(weatherInfo.length / itemsPerPage)}
                page={currentPage}
                onChange={handleChangeValue}
                shape="rounded"
                variant="outlined"
              />
            </div>
          )}
        </>
      )}

      {searchedLoading === false && (
        <SearchedWeather
          searchedLoading={searchedLoading}
          searchedWeather={searchedWeather}
        />
      )}
      {searchedLoading === true && (
        <div className="searchedLoading">
          <Loader className="loading" />
        </div>
      )}
    </>
  );
}

export default Weather;
