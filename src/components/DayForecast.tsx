import { UIEvent, useState } from 'react';

import { IData } from '../global';
import { ReactComponent as CaretLeftIcon } from '../images/Icons/caret-left.svg';
import { ReactComponent as CaretRightIcon } from '../images/Icons/caret-right.svg';

interface IProps {
    dataApp: IData;
}

const DayForecast = ({ dataApp }: IProps) => {
    const [scrollToEnd, setScrollToEnd] = useState({ left: true, right: false });
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
            list.scrollLeft -= 200;
        }
    };

    const scrollNext = () => {
        const list = document.querySelector('.row-forecast-list');
        if (list) {
            list.scrollLeft += 200;
        }
    };

    const onScroll = ({ target }: UIEvent) => {
        const scrollLeft = Math.round((target as HTMLDivElement).scrollLeft);
        const clientWidth = (target as HTMLDivElement).clientWidth;
        const scrollWidth = (target as HTMLDivElement).scrollWidth;

        if (scrollLeft === 0) {
            setScrollToEnd({ ...scrollToEnd, left: true });
        } else if (clientWidth + scrollLeft >= scrollWidth) {
            setScrollToEnd({ ...scrollToEnd, right: true });
        } else if (scrollToEnd.left === true || scrollToEnd.right === true) {
            setScrollToEnd({ left: false, right: false });
        }
    };

    return (
        <section className="day-forecast">
            <div className="day-forecast-list">
                <div className="row gx-2 row-forecast-list" onScroll={onScroll}>
                    {dailyWeatherData.map((data, index) => (
                        <div className="col-6 col-sm-3 col-md-2" key={index}>
                            <div className="day-forecast-item">
                                <div className="date">{getDate(data.dt)}</div>
                                <div className="row gx-2">
                                    <div className="col item-img">
                                        <img
                                            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
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

                    {!scrollToEnd.left && (
                        <button className="btn-prev" onClick={scrollPrev}>
                            {/* <span>&lt;</span> */}
                            <CaretLeftIcon width={16} height={16} />
                        </button>
                    )}
                    {!scrollToEnd.right && (
                        <button className="btn-next" onClick={scrollNext}>
                            {/* <span>&gt;</span> */}
                            <CaretRightIcon width={16} height={16} />
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default DayForecast;
