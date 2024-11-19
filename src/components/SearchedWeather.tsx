import { WeatherInfo } from './Weather';
import './SearchedWeather.scss';

type SearchedWeatherProps = {
  searchedWeather: WeatherInfo;
  searchedLoading: boolean | null;
};

function SearchedWeather({ searchedWeather }: SearchedWeatherProps) {
  return (
    <section className="searched">
      <div className="searched_wrapper">
        <div className="searched_name">
          <img
            src={`https://openweathermap.org/img/wn/${searchedWeather.weather[0].icon}@2x.png`}
            alt="logo"
          />
          <p>{searchedWeather.name}</p>
        </div>
        <div className="searched_info">
          <p>{searchedWeather?.weather[0].main}</p>
          <p>{searchedWeather?.weather[0].description}</p>
          <p>
            Temp: {searchedWeather?.main.temp}
            <sup>o</sup>C
          </p>
          <p>
            Feels: {searchedWeather?.main.feels_like}
            <sup>o</sup>C
          </p>
          <p>Humidity: {searchedWeather?.main.humidity}</p>
          <p>Wind speed: {searchedWeather?.wind.speed} m/s</p>
        </div>
      </div>
    </section>
  );
}

export default SearchedWeather;
