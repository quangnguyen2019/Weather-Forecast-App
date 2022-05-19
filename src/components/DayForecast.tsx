import classNames from 'classnames';
import { useState } from 'react';
import { IData } from '../global';

interface IProps {
    dataApp: IData;
}

const DayForecast = ({ dataApp }: IProps) => {
    const dailyWeatherData = dataApp.weatherData.daily;

    const getDate = (unixTime: number) => {
        // unixTime: seconds (s) * 1000 => miliseconds (ms)
        const d = new Date(unixTime * 1000);
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const day = days[d.getDay()];
        const date = d.getDate();

        // compare today with d
        const today = new Date();

        if (today.getDate() === date && today.getDay() === d.getDay()) {
            return 'Today';
        }
        return `${day} ${date}`;
    };

    const scrollPrev = () => {
        const list = document.querySelector('.row-forecast-list');
        if (list) {
            list.scrollLeft -= 300;
        }
    };

    const scrollNext = (e: any) => {
        const list = document.querySelector('.row-forecast-list');
        if (list) {
            list.scrollLeft += 300;
        }
    };

    return (
        <section className="day-forecast mt-5">
            <p className="day-forecast-caption"> 8 day forecast </p>
            <div className="day-forecast-list">
                <div className="row gx-2 row-forecast-list">
                    {dailyWeatherData.map((data, index) => (
                        <div className="col-4 col-sm-3 col-md-2" key={index}>
                            <div className="day-forecast-item">
                                <div className="date">{getDate(data.dt)}</div>
                                <div className="row gx-2">
                                    <div className="col item-img">
                                        <img
                                            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                                            alt=""
                                        />
                                    </div>
                                    <div className="col day-temperature">
                                        <span>
                                            {Math.round(data.temp.max)}&deg;
                                        </span>
                                        <span>
                                            {Math.round(data.temp.min)}&deg;
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button className="btn-prev" onClick={scrollPrev}>
                        &lt;
                    </button>
                    <button className="btn-next" onClick={scrollNext}>
                        &gt;
                    </button>
                </div>
            </div>
        </section>
    );
};

export default DayForecast;
