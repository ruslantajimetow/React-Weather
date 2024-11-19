import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Weather, { WeatherInfo } from './components/Weather';

function App() {
  const [input, setInput] = useState('');
  const [searchedWeather, setSearchedWeather] = useState<WeatherInfo>(
    {} as WeatherInfo
  );
  const [searchedLoading, setSearchedLoading] = useState<boolean | null>(null);
  return (
    <>
      <Header
        setSearchedWeather={setSearchedWeather}
        input={input}
        setInput={setInput}
        setSearchedLoading={setSearchedLoading}
      />
      <Weather
        searchedLoading={searchedLoading}
        searchedWeather={searchedWeather}
        input={input}
      />
    </>
  );
}

export default App;
