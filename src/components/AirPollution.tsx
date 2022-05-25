import { useEffect, useState } from 'react';

import { IData, Openweathermap_key } from '../global';
import { ReactComponent as WindIcon } from '../images/Icons/wind.svg';

interface IProps {
    dataApp: IData;
}

const aqiLevels = {
    good: {
        level: 'Good',
        desc: 'Air quality is satisfactory, and air pollution poses little or no risk.',
    },
    fair: {
        level: 'Fair',
        desc: 'Air quality is acceptable. Members of sensitive groups may experience health effects.',
    },
    moderate: {
        level: 'Moderate',
        desc: 'Members of sensitive groups may experience health effects.',
    },
    poor: {
        level: 'Poor',
        desc: 'Health warnings of emergency conditions.',
    },
    veryPoor: {
        level: 'Very Poor',
        desc: 'Health alert: everyone may experience more serious health effects',
    },
};

const AirPollution = ({ dataApp }: IProps) => {
    const [airQualityData, setAirQualityData] = useState({
        components: {
            co: 0,
            no2: 0,
            o3: 0,
            so2: 0,
            pm2_5: 0,
            pm10: 0,
        },
        info: { level: '', desc: '' },
        color: '',
    });

    const getAirQualityData = async () => {
        const urlAirPollution = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${dataApp.weatherData.lat}&lon=${dataApp.weatherData.lon}&appid=${Openweathermap_key}`;

        try {
            const response1 = await fetch(urlAirPollution);
            const response2 = await response1.json();

            const components = response2.list[0].components;
            delete components.co;
            delete components.nh3;

            const aqi = response2.list[0].main.aqi;

            if (aqi === 1) {
                setAirQualityData({
                    components,
                    info: aqiLevels.good,
                    color: '#05d75a',
                });
            } else if (aqi === 2) {
                setAirQualityData({
                    components,
                    info: aqiLevels.fair,
                    color: '#fdd64b',
                });
            } else if (aqi === 3) {
                setAirQualityData({
                    components,
                    info: aqiLevels.moderate,
                    color: 'orange',
                });
            } else if (aqi === 4) {
                setAirQualityData({
                    components,
                    info: aqiLevels.poor,
                    color: '#e10303',
                });
            } else if (aqi === 5) {
                setAirQualityData({
                    components,
                    info: aqiLevels.veryPoor,
                    color: '#ad00ad',
                });
            }
        } catch {
            console.error('error ne: air pollution');
        }
    };

    useEffect(() => {
        getAirQualityData();
    }, [dataApp]);

    return (
        <div
            className="air-pollution"
            style={{ color: `${airQualityData.color}` }}
        >
            <h5 className="air-pollution-caption"> Air Quality Index </h5>
            <div className="evaluation row align-items-center gx-0">
                <div className="col-2 d-flex justify-content-center">
                    <WindIcon
                        width={40}
                        height={40}
                        fill={airQualityData.color}
                    />
                </div>
                <div className="col-10">
                    <div className="evaluation-info mx-3">
                        <span>{airQualityData.info.level}</span>
                        <span>{airQualityData.info.desc}</span>
                    </div>
                </div>
            </div>
            <div className="components row gx-2">
                {Object.keys(airQualityData.components).map((key, index) => {
                    return (
                        <div className="col" key={index}>
                            <div className="component-item">
                                <span>
                                    {
                                        airQualityData.components[
                                            key as keyof typeof airQualityData.components
                                        ]
                                    }
                                </span>
                                <span>{key}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AirPollution;
