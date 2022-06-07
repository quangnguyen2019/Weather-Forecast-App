import { MouseEvent, useState, UIEvent, useEffect } from 'react';

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
    const [scrollToEnd, setScrollToEnd] = useState({ left: true, right: false });

    const scrollPrev = () => {
        const list = document.querySelector('.extra-address-card-list');
        if (list) {
            list.scrollLeft -= 300;
        }
    };

    const scrollNext = () => {
        const list = document.querySelector('.extra-address-card-list');
        if (list) {
            list.scrollLeft += 300;
        }
    };

    const hideOrShowScrollBtn = (element: Element) => {
        const clientWidth = element.clientWidth;
        const scrollLeft = element.scrollLeft;
        const scrollWidth = element.scrollWidth;

        if (scrollLeft === 0 && clientWidth + scrollLeft >= scrollWidth) {
            // end left, end right
            setScrollToEnd({ left: true, right: true });
        } else if (scrollLeft === 0) {
            // end left
            setScrollToEnd({ left: true, right: false });
        } else if (clientWidth + scrollLeft >= scrollWidth) {
            // end right
            setScrollToEnd({ left: false, right: true });
        } else if (scrollToEnd.left === true || scrollToEnd.right === true) {
            // not end left, not end right
            setScrollToEnd({ left: false, right: false });
        }
    };

    const onScroll = ({ target }: UIEvent) => {
        hideOrShowScrollBtn(target as HTMLDivElement);
    };

    useEffect(() => {
        const extraCardList = document.getElementsByClassName(
            'extra-address-card-list'
        )[0];
        hideOrShowScrollBtn(extraCardList);
    }, [dataApp]);

    useEffect(() => {
        const reRender = () => {};

        window.addEventListener('resize', () => reRender());
        return () => reRender();
    }, []);

    return (
        <div
            className="extra-address-card-list row gx-2 gy-2 gy-md-0 gy-xl-2"
            onScroll={onScroll}
        >
            {dataApp.slice(1).map((data, index) => {
                const currendData = data.weatherData.current;
                return (
                    <div
                        className="col-4 col-md-6 col-lg-4 col-xl-12"
                        key={index}
                    >
                        <div
                            className="extra-address-card "
                            key={index}
                            // starting position of the extra address card is 1 => index + 1
                            data-index={index + 1}
                            onClick={onClickCard}
                        >
                            <div className="row gx-0 align-items-center">
                                <div className="col d-none d-xl-block">
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

                                <div className="col col-xl-5 d-flex align-items-center d-md-block">
                                    <p className="address address--smaller mb-md-3 mb-xl-1">
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
                                            className="button-options d-none d-md-inline-block"
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
                                                        onClickRemoveCard(
                                                            index + 1
                                                        )
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
                                    <div className="d-flex d-xl-none justify-content-center">
                                        <img
                                            className="extra-card-image"
                                            src={`http://openweathermap.org/img/wn/${currendData.weather[0].icon}@2x.png`}
                                            alt=""
                                        />
                                    </div>
                                    <span className="temperature-number-smaller">
                                        {Math.round(currendData.temp)}
                                        &deg;
                                    </span>

                                    <button
                                        className="button-options d-md-none"
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
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
            {!scrollToEnd.left && (
                <button
                    className="btn-prev btn-prev--second d-xl-none"
                    onClick={scrollPrev}
                >
                    &lt;
                </button>
            )}
            {!scrollToEnd.right && (
                <button
                    className="btn-next btn-next--second d-xl-none"
                    onClick={scrollNext}
                >
                    &gt;
                </button>
            )}
        </div>
    );
};

export default ExtraAddressCard;
