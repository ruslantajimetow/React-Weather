import { Search } from 'lucide-react';
import './Header.scss';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import axios from 'axios';

import { bigCities } from '../cities';
import { WeatherInfo } from './Weather';

type HeaderProps = {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  setSearchedWeather: Dispatch<SetStateAction<WeatherInfo>>;
  setSearchedLoading: Dispatch<SetStateAction<boolean | null>>;
};

function Header({
  input,
  setInput,
  setSearchedWeather,
  setSearchedLoading,
}: HeaderProps) {
  const [onClose, setOnClose] = useState(false);

  const debounceOnChange = (fn: any, ms: number) => {
    let timerId: any;
    return function (...args: any) {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        fn(...args);
      }, ms);
    };
  };

  const handleDebounce = useCallback(
    debounceOnChange(async (value: string) => {
      if (value.trim().length) {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${import.meta.env.VITE_API_KEY}&units=metric`
        );
        setSearchedWeather(res.data);
        setSearchedLoading(false);
      }
    }, 500),
    []
  );

  if (input.length === 0) {
    setSearchedLoading(null);
  }

  const onChangeInput = (e: any) => {
    setInput(e.target.value);
    bigCities.forEach((item) => {
      if (item.toLowerCase().trim() === e.target.value.toLowerCase().trim()) {
        handleDebounce(e.target.value);
      }
    });
    setSearchedLoading(true);
    setOnClose(false);
  };

  return (
    <header className="header">
      <h1 className="header_logo">Weather</h1>
      <div className="header_search">
        <input
          value={input}
          onChange={onChangeInput}
          type="text"
          placeholder="Search..."
        />
        <Search className="header_search-icon" />
        {!onClose && input && (
          <div className="header_search-cities">
            {bigCities
              .filter(
                (item) =>
                  item.toLowerCase().trim()[0] === input.toLowerCase().trim()[0]
              )
              .map((item) => {
                return (
                  <div key={item}>
                    <span
                      onClick={() => {
                        setInput(item);
                        handleDebounce(item);
                        setOnClose(true);
                      }}
                    >
                      {item}
                    </span>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
