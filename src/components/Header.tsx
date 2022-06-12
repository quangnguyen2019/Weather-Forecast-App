import { useEffect, useRef, useState } from 'react';

import { getTimeString, IData, Units } from '../global';
import { ReactComponent as SearchIcon } from '../images/Icons/search.svg';
import SearchBox from './SeachBox';
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
    checkAddressExists: (newAddress: string) => boolean;
}

const Header = (props: IPropHeader) => {
    const {
        dataApp,
        handleChangeUnit,
        getWeatherData,
        getWeatherDataFromCoord,
        checkAddressExists,
    } = props;
    const [time, setTime] = useState('00:00 AM');
    const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);
    const dateRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const setTimeString = () => {
            setTime(getTimeString()); // 09:10 AM
        };
        setTimeString();

        // update time string after 30s
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

        document.addEventListener('click', () => {
            setIsSearchBoxVisible(false);
        });
    }, []);

    const displaySearchBox = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsSearchBoxVisible(true);
    };

    const hideSearchBox = () => {
        setIsSearchBoxVisible(false);
    };

    return (
        <header className="header row">
            <div className="col">
                <div className="current-time-container">
                    <h1 className="current-time">{time}</h1>
                    <p className="current-date" ref={dateRef}></p>
                </div>
            </div>
            <div className="col-3 col-md-8 header-actions">
                {isSearchBoxVisible && (
                    <div className="overlay">
                        <div className="overlay-content">
                            <SearchBox
                                dataApp={dataApp}
                                getWeatherData={getWeatherData}
                                getWeatherDataFromCoord={getWeatherDataFromCoord}
                                checkAddressExists={checkAddressExists}
                                hideSearchBox={hideSearchBox}
                            />
                        </div>
                    </div>
                )}
                <button
                    className="d-inline-block d-md-none btn btn-display-search-box"
                    onClick={displaySearchBox}
                >
                    <SearchIcon width={16} height={16} />
                </button>

                <div
                    className="d-none d-md-block d-xl-none"
                    style={{ width: '60%' }}
                >
                    <SearchBox
                        dataApp={dataApp}
                        getWeatherData={getWeatherData}
                        getWeatherDataFromCoord={getWeatherDataFromCoord}
                        checkAddressExists={checkAddressExists}
                    />
                </div>

                <UnitSwitch
                    dataApp={dataApp}
                    handleChangeUnit={handleChangeUnit}
                />
            </div>
        </header>
    );
};

export default Header;
