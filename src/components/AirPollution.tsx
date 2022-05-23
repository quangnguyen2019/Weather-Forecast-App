import { useEffect, useState } from 'react';
import { AirVisual_key, IData } from '../global';

interface IProps {
    dataApp: IData;
}

const aqiLevels = {
    good: {
        level: 'Good',
        desc: 'Air quality is satisfactory, and air pollution poses little or no risk.',
    },
    moderate: {
        level: 'Moderate',
        desc: 'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.',
    },
    sensitive: {
        level: 'Unhealthy for Sensitive Groups',
        desc: 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.',
    },
    unhealthy: {
        level: 'Unhealthy',
        desc: 'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.',
    },
    veryUnhealthy: {
        level: 'Very Healthy',
        desc: 'Health alert: The risk of health effects is increased for everyone.',
    },
    hazardous: {
        level: 'Hazardous',
        desc: 'Health warning of emergency conditions: everyone is more likely to be affected.',
    },
};

const AirPollution = ({ dataApp }: IProps) => {
    const [airQualityData, setAirQualityData] = useState({
        aqi: 0,
        info: { level: '', desc: '' },
        color: '',
    });

    const getAirQualityData = async () => {
        const urlAirPollution =
            `http://api.airvisual.com/v2/nearest_city` +
            `?lat=${dataApp.weatherData.lat}&lon=${dataApp.weatherData.lon}` +
            `&key=${AirVisual_key}`;

        try {
            const response1 = await fetch(urlAirPollution);
            const response2 = await response1.json();
            const aqi = response2.data.current.pollution.aqius;

            if (aqi >= 0 && aqi <= 50) {
                setAirQualityData({
                    aqi,
                    info: aqiLevels.good,
                    color: '#a8e05f',
                });
            } else if (aqi >= 51 && aqi <= 100) {
                setAirQualityData({
                    aqi,
                    info: aqiLevels.moderate,
                    color: '#fdd64b',
                });
            } else if (aqi >= 101 && aqi <= 150) {
                setAirQualityData({
                    aqi,
                    info: aqiLevels.sensitive,
                    color: 'orange',
                });
            } else if (aqi >= 151 && aqi <= 200) {
                setAirQualityData({
                    aqi,
                    info: aqiLevels.unhealthy,
                    color: '#f20303',
                });
            } else if (aqi >= 201 && aqi <= 300) {
                setAirQualityData({
                    aqi,
                    info: aqiLevels.veryUnhealthy,
                    color: '#ad00ad',
                });
            } else {
                setAirQualityData({
                    aqi,
                    info: aqiLevels.hazardous,
                    color: '#a20101',
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
        <div className="air-pollution mt-5">
            <p className="caption"> Air Quality Index </p>
            <div
                className="air-pollution-info"
                style={{ color: `${airQualityData.color}` }}
            >
                <span className="index">{airQualityData.aqi}</span>
                <div className="info">
                    <span>{airQualityData.info.level}</span>
                    <span>{airQualityData.info.desc}</span>
                </div>
            </div>
        </div>
    );
};

export default AirPollution;
