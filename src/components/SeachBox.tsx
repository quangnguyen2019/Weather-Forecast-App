import { useRef } from 'react';

import { IData, replaceWhitespace, Units } from '../global';
import { ReactComponent as SearchIcon } from '../images/Icons/search.svg';
import { ReactComponent as GPSIcon } from '../images/Icons/gps.svg';

interface IProps {
    dataApp: IData;
    getWeatherData: (searchValue: string, unit: Units) => Promise<void>;
    getWeatherDataFromCoord: (
        lat: number,
        lon: number,
        unit: Units,
        newAddress: string
    ) => Promise<void>;
    checkAddressExists: (newAddress: string) => boolean;
    hideSearchBox?: () => void;
}

const SearchBox = (props: IProps) => {
    const {
        dataApp,
        getWeatherData,
        getWeatherDataFromCoord,
        checkAddressExists,
        hideSearchBox,
    } = props;
    const inputEl = useRef<HTMLInputElement>(null);

    const search = async (e: any) => {
        let value = replaceWhitespace(e.target.value);

        if (e.key === 'Enter' && inputEl.current) {
            getWeatherData(value, dataApp.unit);
            inputEl.current.value = '';
            hideSearchBox?.();
        }
    };

    const onClickSearchBtn = () => {
        if (inputEl.current) {
            const searchValue = replaceWhitespace(inputEl.current.value);

            if (searchValue.length >= 3) {
                getWeatherData(searchValue, dataApp.unit);
                inputEl.current.value = '';
                hideSearchBox?.();
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
                    `https://revgeocode.search.hereapi.com/v1/revgeocode` +
                    `?at=${lat},${lon}&lang=en-US` +
                    `&apiKey=${process.env.REACT_APP_HERE_KEY}`;

                await fetch(urlReverseGeocoding)
                    .then((res) => res.json())
                    .then((res) => {
                        const addressData = res.items[0].address;

                        if (addressData.city) {
                            if (addressData.city !== addressData.county) {
                                newAddress = addressData.state
                                    ? `${addressData.city}, ${addressData.state}`
                                    : `${addressData.city}, ${addressData.county}`;
                            } else {
                                newAddress = `${addressData.county}, ${addressData.countryName}`;
                            }
                        } else if (addressData.county) {
                            newAddress = `${addressData.county}, ${addressData.countryName}`;
                        } else if (addressData.state) {
                            newAddress = `${addressData.state}, ${addressData.countryName}`;
                        }
                    });

                let isExisted = checkAddressExists(newAddress);
                if (!isExisted) {
                    getWeatherDataFromCoord(lat, lon, dataApp.unit, newAddress);
                }
            });
        }
        hideSearchBox?.();
    };

    return (
        <div className="search-box-container mb-5">
            <input
                type="text"
                className="search-box"
                placeholder="Search for location"
                onKeyUp={search}
                ref={inputEl}
                onClick={(e) => e.stopPropagation()}
            />
            <span className="small-note">
                The search value should be at least 3 characters
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
                title="Search for location"
            >
                <SearchIcon width={15} />
            </button>
        </div>
    );
};

export default SearchBox;
