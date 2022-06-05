import { Chart, registerables } from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import { getTimeString, IData } from '../global';

interface IInitialValue {
    times: string[];
    temps: number[];
    pop: number[]; //  Probability of precipitation
    weatherCondition: string[][];
}

Chart.register(...registerables);

const WeatherChart = ({ dataApp }: { dataApp: IData }) => {
    const hourlyData = dataApp.weatherData.hourly;
    const chartData = hourlyData.reduce(
        (total, data) => {
            return {
                times: [...total.times, getTimeString(data.dt, false)],
                temps: [...total.temps, data.temp],
                pop: [...total.pop, data.pop * 100],
                weatherCondition: [
                    ...total.weatherCondition,
                    data.weather[0].description.split(' '),
                ],
            };
        },
        { times: [], temps: [], pop: [], weatherCondition: [] } as IInitialValue
    );

    const numLabelsDisplayed = 8;
    const timeLabels = chartData.times.slice(0, numLabelsDisplayed);
    timeLabels[0] = 'Now';
    const tempDataNested = chartData.temps.slice(0, numLabelsDisplayed);
    const popDataNested = chartData.pop.slice(0, numLabelsDisplayed);
    const conditionLabels = chartData.weatherCondition.slice(
        0,
        numLabelsDisplayed
    );

    const legendMarginBottom = {
        id: 'legendMarginBottom',
        beforeInit(chart: any) {
            const fitValue = chart.legend.fit;

            chart.legend.fit = function fit() {
                fitValue.bind(chart.legend)();
                return (this.height += 5);
            };
        },
    };

    const myFunc = () => {
        if (window.innerWidth >= 1455) {
            Chart.defaults.font.size = 12;
        } else if (window.innerWidth >= 1365) {
            Chart.defaults.font.size = 11;
        } else if (window.innerWidth >= 1275) {
            Chart.defaults.font.size = 10;
        } else {
            Chart.defaults.font.size = 9;
        }
        // console.log(window.innerWidth);
        // console.log(Chart.defaults.font.size);
    };

    useEffect(() => {
        window.addEventListener('resize', myFunc);
        return () => window.removeEventListener('resize', myFunc);
    }, []);

    return (
        <div className="chart-container">
            <Line
                data={{
                    labels: timeLabels,
                    datasets: [
                        {
                            label: `Temperature ( °${
                                dataApp.unit === 'metric' ? 'C' : 'F'
                            } )`,
                            data: tempDataNested,
                            borderColor: '#dc3545',
                            backgroundColor: 'rgba(255,0,0,0.5)',
                            tension: 0.4,
                            fill: false,
                        },
                        {
                            label: 'Precipitation ( % )',
                            data: popDataNested,
                            borderColor: '#36a2eb',
                            backgroundColor: '#36a2eb80',
                            tension: 0.4,
                            fill: false,
                        },
                    ],
                }}
                options={{
                    scales: {
                        x: {
                            grid: { display: false, drawBorder: false },
                            position: 'top',
                        },
                        x1: {
                            grid: { display: false, drawBorder: false },
                            position: 'bottom',
                            labels: conditionLabels,
                        },
                        y: {
                            grid: { drawBorder: false },
                        },
                    },
                    layout: {
                        // padding: { top: 4 },
                    },
                    plugins: {
                        legend: {
                            labels: {
                                boxWidth: 15,
                                boxHeight: 10,
                            },
                        },
                    },
                }}
                plugins={[legendMarginBottom]}
            />
        </div>
    );
};

export default WeatherChart;
