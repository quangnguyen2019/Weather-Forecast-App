import { useState, useRef } from 'react';
import classNames from 'classnames';

import { ReactComponent as SearchIcon } from '../images/Icons/search.svg';
import { ReactComponent as GPSIcon } from '../images/Icons/gps.svg';
import { PS_access_key, IData, Units, replaceWhitespace } from '../global';

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
    const {
        dataApp,
        handleChangeUnit,
        getWeatherData,
        getWeatherDataFromCoord,
    } = props;
    const inputEl = useRef<HTMLInputElement>(null);
    const [is_C_Deg_Active, setIs_C_Deg_Active] = useState(true);

    const search = async (e: any) => {
        let value = replaceWhitespace(e.target.value);

        if (e.key === 'Enter' && value.length >= 3 && inputEl.current) {
            getWeatherData(value, dataApp.unit);
            inputEl.current.value = '';
        }
    };

    const onClickSearchBtn = () => {
        if (inputEl.current) {
            const searchValue = replaceWhitespace(inputEl.current.value);

            if (searchValue.length >= 3) {
                getWeatherData(searchValue, dataApp.unit);
                inputEl.current.value = '';
            }
        }
    };

    const onClickDetectBtn = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (pos) => {
                let newAddress = '';
                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;
                const urlReverseGeocoding =
                    `http://api.positionstack.com/v1/reverse` +
                    `?access_key=${PS_access_key}&limit=1` +
                    `&query=${lat},${lon}`;

                await fetch(urlReverseGeocoding)
                    .then((res) => res.json())
                    .then((res) => {
                        const dataSeperated = res.data[0];
                        if (dataSeperated.county) {
                            newAddress = `${dataSeperated.county}, ${dataSeperated.region}, ${dataSeperated.country}`;
                        } else {
                            newAddress = `${dataSeperated.region}, ${dataSeperated.country}`;
                        }
                    });

                getWeatherDataFromCoord(lat, lon, dataApp.unit, newAddress);
            });
        }
    };

    const changeUnit = (e: any) => {
        const unit = e.target.getAttribute('data-unit');

        if (unit === 'C' && dataApp.unit === Units.C) return;
        if (unit === 'F' && dataApp.unit === Units.F) return;

        unit === 'C' ? handleChangeUnit(Units.C) : handleChangeUnit(Units.F);
        setIs_C_Deg_Active(!is_C_Deg_Active);
    };

    return (
        <header className="header row">
            <div className="col d-flex justify-content-center position-relative">
                <input
                    type="text"
                    className="search-box"
                    placeholder="Search for location"
                    onKeyUp={search}
                    ref={inputEl}
                />
                <span className="small-note">
                    The search value must be at least 3 characters
                </span>

                <button
                    className="btn-detect-location"
                    onClick={onClickDetectBtn}
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Detect your location"
                >
                    <GPSIcon width={15} height={15} />
                </button>
                <button
                    className="btn-search"
                    onClick={onClickSearchBtn}
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Search for location"
                >
                    <SearchIcon width={15} />
                </button>
            </div>

            <div className="unit-switch">
                <button
                    data-unit="C"
                    onClick={changeUnit}
                    className={classNames('btn-unit', {
                        active: is_C_Deg_Active,
                    })}
                >
                    &deg;C
                </button>
                <span> | </span>
                <button
                    data-unit="F"
                    onClick={changeUnit}
                    className={classNames('btn-unit', {
                        active: !is_C_Deg_Active,
                    })}
                >
                    &deg;F
                </button>
            </div>
        </header>
    );
};

export default Header;
