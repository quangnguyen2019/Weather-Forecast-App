import React from 'react';

import './App.css';

import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import DayForecast from './components/DayForecast';

function App() {
    return (
        <div className="App">
            <div className="app-background"></div>
            <div className="container app-container">
                <Header />
                <CurrentWeather />
                <DayForecast />
            </div>
        </div>
    );
}

export default App;
