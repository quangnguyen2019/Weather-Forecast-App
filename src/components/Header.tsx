import { useState, useRef } from 'react';
import classNames from 'classnames';

import { IData, Units } from '../commonInterface';
import { ReactComponent as SearchIcon } from '../images/Icons/search.svg';

interface IPropHeader {
    dataApp: IData;
    handleChangeUnit: (newUnit: Units) => void;
    getWeatherData: (searchValue: string, unit: Units) => Promise<void>;
}

const Header = ({ dataApp, handleChangeUnit, getWeatherData }: IPropHeader) => {
    const inputEl = useRef<HTMLInputElement>(null);
    const [is_C_Deg_Active, setIs_C_Deg_Active] = useState(true);

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
        setIs_C_Deg_Active(!is_C_Deg_Active);
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
