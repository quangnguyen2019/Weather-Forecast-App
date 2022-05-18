import { IData } from '../commonInterface';

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

    return (
        <section className="day-forecast mt-5">
            <p className="day-forecast-caption"> 7 day forecast </p>
            <div className="row gx-2 day-forecast-list">
                {dailyWeatherData.map((data, index) => (
                    <div className="col" key={index}>
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
            </div>
        </section>
    );
};

export default DayForecast;
