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
    const [sizeConditionLabel, setSizeConditionLabel] = useState(10);
    const hourlyData = dataApp.weatherData.hourly;
    const chartData = hourlyData.reduce(
        (total, data) => {
            return {
                times: [...total.times, getTimeString(data.dt, false)],
                temps: [...total.temps, Math.round(data.temp)],
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
                return (this.height += 10);
            };
        },
    };

    const changeFontSize = () => {
        if (window.innerWidth >= 1271) {
            setSizeConditionLabel(10);
        } else if (window.innerWidth >= 1250) {
            setSizeConditionLabel(9.5);
        } else if (window.innerWidth >= 1200) {
            setSizeConditionLabel(9);
        } else if (window.innerWidth >= 1015) {
            setSizeConditionLabel(11);
        } else if (window.innerWidth >= 992) {
            setSizeConditionLabel(10);
        } else if (window.innerWidth >= 915) {
            setSizeConditionLabel(11);
        } else if (window.innerWidth >= 860) {
            setSizeConditionLabel(10);
        } else if (window.innerWidth >= 800) {
            Chart.defaults.font.size = 11;
            setSizeConditionLabel(9);
        } else if (window.innerWidth >= 771) {
            setSizeConditionLabel(8.7);
        } else if (window.innerWidth >= 768) {
            Chart.defaults.font.size = 11;
        } else if (window.innerWidth >= 470) {
            Chart.defaults.font.size = 12;
            setSizeConditionLabel(11);
        } else if (window.innerWidth >= 442) {
            Chart.defaults.font.size = 12;
            setSizeConditionLabel(10);
        } else if (window.innerWidth >= 412) {
            setSizeConditionLabel(9);
        } else {
            Chart.defaults.font.size = 10.5;
            setSizeConditionLabel(9);
        }
    };

    useEffect(() => {
        Chart.defaults.font.size = 12;
        window.addEventListener('resize', changeFontSize);
        return () => window.removeEventListener('resize', changeFontSize);
    }, []);

    useEffect(() => {
        changeFontSize();
    }, [dataApp]);

    const dataChart = {
        labels: timeLabels,
        datasets: [
            {
                label: `Temperature ( °${
                    dataApp.unit === 'metric' ? 'C' : 'F'
                } ) `,
                data: tempDataNested,
                borderColor: '#dc3545',
                backgroundColor: 'rgba(255,0,0,0.5)',
                tension: 0.4,
                fill: false,
            },
            {
                label: 'Precipitation ( % ) ',
                data: popDataNested,
                borderColor: '#36a2eb',
                backgroundColor: '#36a2eb80',
                tension: 0.4,
                fill: false,
            },
        ],
    };

    return (
        <div className="chart-container">
            <Line
                data={dataChart}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            grid: { display: false, drawBorder: false },
                            position: 'top',
                        },
                        x1: {
                            grid: { display: false, drawBorder: false },
                            position: 'bottom',
                            labels: conditionLabels,
                            ticks: {
                                font: { size: sizeConditionLabel },
                            },
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
                                boxWidth: 8,
                                boxHeight: 8,
                                usePointStyle: true,
                            },
                            align: 'end',
                        },
                    },
                    interaction: {
                        mode: 'index',
                        intersect: false,
                    },
                }}
                plugins={[legendMarginBottom]}
            />
        </div>
    );
};

export default WeatherChart;
