import { MouseEvent } from 'react';

import { ReactComponent as TemperatureIcon } from '../images/Icons/temperature.svg';
import { ReactComponent as HumidityIcon } from '../images/Icons/humidity.svg';
import { ReactComponent as MapPositionIcon } from '../images/Icons/map-position.svg';
import { ReactComponent as CaretDownIcon } from '../images/Icons/caret-down-fill.svg';
import { ReactComponent as TrashIcon } from '../images/Icons/trash3.svg';
import { IData } from '../global';

interface IProps {
    dataApp: IData[];
    dropdowns: { isOpen: boolean }[];
    onClickDropdownBtn: (e: MouseEvent<HTMLButtonElement>) => void;
    onClickRemoveCard: (index: number) => void;
    onClickCard: (e: MouseEvent<HTMLDivElement>) => void;
}

const ExtraAddressCard = (props: IProps) => {
    const {
        dataApp,
        onClickDropdownBtn,
        dropdowns,
        onClickRemoveCard,
        onClickCard,
    } = props;

    return (
        <div className="extra-address-card-list">
            {dataApp.slice(1).map((data, index) => {
                const currendData = data.weatherData.current;
                return (
                    <div
                        className="extra-address-card mt-2"
                        key={index}
                        // starting position of the extra address card is 1 => index + 1
                        data-index={index + 1}
                        onClick={onClickCard}
                    >
                        <div className="row gx-0 align-items-center">
                            <div className="col">
                                <div className="row detail-item gx-3">
                                    <div className="col">
                                        <TemperatureIcon
                                            width={18}
                                            height={18}
                                            fill={'#fff'}
                                        />
                                        <span> Feels </span>
                                    </div>
                                    <span className="col">
                                        {Math.round(currendData.feels_like)}
                                        &deg;
                                    </span>
                                </div>
                                <div className="row detail-item gx-3 mt-2">
                                    <div className="col">
                                        <HumidityIcon
                                            width={16}
                                            height={16}
                                            fill={'#fff'}
                                        />
                                        <span> Hum </span>
                                    </div>
                                    <span className="col">
                                        {currendData.humidity}%
                                    </span>
                                </div>
                            </div>

                            <div className="col-5">
                                <p className="address address--smaller mb-1">
                                    <MapPositionIcon
                                        width={17}
                                        height={17}
                                        fill={'#fff'}
                                        style={{ marginRight: 6 }}
                                    />
                                    <span title={data.address.split(',')[0]}>
                                        {data.address.split(',')[0]}
                                    </span>
                                    <button
                                        className="button-options"
                                        data-index={index + 1}
                                        onClick={onClickDropdownBtn}
                                    >
                                        <CaretDownIcon
                                            width={10}
                                            height={10}
                                            fill={'#fff'}
                                        />
                                        {dropdowns[index + 1]?.isOpen && (
                                            <span
                                                className="button-remove"
                                                onClick={() =>
                                                    onClickRemoveCard(index + 1)
                                                }
                                            >
                                                <TrashIcon
                                                    width={15}
                                                    height={15}
                                                />
                                                <span>Remove</span>
                                            </span>
                                        )}
                                    </button>
                                </p>
                                <span className="temperature-number-smaller">
                                    {Math.round(currendData.temp)}
                                    &deg;
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ExtraAddressCard;
