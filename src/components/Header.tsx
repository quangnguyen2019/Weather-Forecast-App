import { useRef } from 'react';

import { IData, Units } from '../commonInterface';
import { ReactComponent as SearchIcon } from '../images/Icons/search.svg';

interface IPropHeader {
    dataApp: IData;
    handleChangeUnit: (newUnit: Units) => void;
    getWeatherData: (searchValue: string, unit: Units) => Promise<void>;
}

const Header = ({ dataApp, handleChangeUnit, getWeatherData }: IPropHeader) => {
    const inputEl = useRef<HTMLInputElement>(null);

    const replaceWhitespace = (searchValue: string) => {
        // replace whitespace ( '\s' in regex ) with '%20'
        return searchValue.trim().replace(/\s/g, '%20');
    };

    const search = async (e: any) => {
        let value = replaceWhitespace(e.target.value);

        if (e.key === 'Enter' && value !== '' && inputEl.current) {
            getWeatherData(value, dataApp.unit);
            inputEl.current.value = '';
        }
    };

    const onClickSearchBtn = () => {
        if (inputEl.current) {
            const searchValue = replaceWhitespace(inputEl.current.value);
            getWeatherData(searchValue, dataApp.unit);
            inputEl.current.value = '';
        }
    };

    const changeUnit = (e: any) => {
        const unit = e.target.getAttribute('data-unit');

        if (unit === 'C' && dataApp.unit === Units.C) return;
        if (unit === 'F' && dataApp.unit === Units.F) return;

        unit === 'C' ? handleChangeUnit(Units.C) : handleChangeUnit(Units.F);
    };

    return (
        <header className="header row mb-4">
            <div className="col d-flex justify-content-center">
                <input
                    type="text"
                    className="search-box"
                    placeholder="Search for location"
                    onKeyUp={search}
                    ref={inputEl}
                />
                <button className="btn-search" onClick={onClickSearchBtn}>
                    <SearchIcon className="search-icon" width={15} />
                </button>
            </div>
            <div className="unit-switch">
                <button className="btn-unit" data-unit="C" onClick={changeUnit}>
                    &deg;C
                </button>
                <span> | </span>
                <button className="btn-unit" data-unit="F" onClick={changeUnit}>
                    &deg;F
                </button>
            </div>
        </header>
    );
};

export default Header;
