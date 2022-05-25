import { useEffect, useRef, useState } from 'react';
import { getTimeString, IData, Units } from '../global';
import UnitSwitch from './UnitSwitch';

interface IPropHeader {
    dataApp: IData;
    handleChangeUnit: (newUnit: Units) => void;
    getWeatherData: (searchValue: string, unit: Units) => Promise<void>;
    getWeatherDataFromCoord: (
        lat: number,
        lon: number,
        unit: Units,
        newAddress: string
    ) => Promise<void>;
}

const Header = (props: IPropHeader) => {
    const { dataApp, handleChangeUnit } = props;
    const [time, setTime] = useState('00:00 AM');
    const dateRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const setTimeString = () => {
            setTime(getTimeString()); // 09:10 AM
        };
        setTimeString();

        const intervalID = setInterval(() => {
            setTimeString();
        }, 30000);

        return () => clearInterval(intervalID);
    }, [dataApp]);

    useEffect(() => {
        const currentDate = document.getElementsByClassName('current-date')[0];
        const days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];

        const d = new Date();
        const day = days[d.getDay()];
        const date = d.getDate();
        const month = months[d.getMonth()];
        const year = d.getFullYear();

        currentDate.innerHTML = `${day}, ${date} ${month}, ${year}`;
    }, []);

    return (
        <header className="header row">
            <div className="col">
                <div className="current-time-container">
                    <h1 className="current-time">{time}</h1>
                    <p className="current-date" ref={dateRef}></p>
                </div>
            </div>
            <UnitSwitch dataApp={dataApp} handleChangeUnit={handleChangeUnit} />
        </header>
    );
};

export default Header;
