import { ReactComponent as SearchIcon } from '../images/Icons/search.svg';

const Header = () => {
    return (
        <header className="header row mb-4">
            <div className="col d-flex justify-content-center">
                <input
                    type="text"
                    className="search-box"
                    placeholder="Search for location"
                />
                <button className="btn-search">
                    <SearchIcon className="search-icon" width={15} />
                </button>
            </div>
            <div className="unit-switch">
                <button className="btn-unit btn-unit-c">&deg;C</button>
                <span> | </span>
                <button className="btn-unit btn-unit-f">&deg;F</button>
            </div>
        </header>
    );
};

export default Header;
