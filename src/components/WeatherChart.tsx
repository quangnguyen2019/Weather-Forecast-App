import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { IData } from '../global';
import { useState } from 'react';

interface IInitialValue {
    times: string[];
    temps: number[];
    pop: number[]; //  Probability of precipitation
}

Chart.register(...registerables, ChartDataLabels);

const WeatherChart = ({ dataApp }: { dataApp: IData }) => {
    const [isDataset2Hidden, setIsDataset2Hidden] = useState(true);
    const hourlyData = dataApp.weatherData.hourly;
    const timesTempsPops = hourlyData.reduce(
        (total, data, index) => {
            // Show labels on chart as 19 PM -> 21 PM -> 23 PM...
            if (index % 2 === 0) {
                const hour = new Date(data.dt * 1000).getHours();
                return {
                    times: [...total.times, hour + (hour <= 12 ? ' AM' : ' PM')],
                    temps: [...total.temps, data.temp],
                    pop: [...total.pop, data.pop * 100],
                };
            }
            return total;
        },
        { times: [], temps: [], pop: [] } as IInitialValue
    );

    const numLabelsDisplayed = 12;
    const timeLabels = timesTempsPops.times.slice(0, numLabelsDisplayed);
    timeLabels[0] = 'Now';
    const tempDataNested = timesTempsPops.temps.slice(0, numLabelsDisplayed);
    const popDataNested = timesTempsPops.pop.slice(0, numLabelsDisplayed);

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
                            fill: true,
                            datalabels: {
                                align: 'end',
                                anchor: 'end',
                                backgroundColor: '#dc3545',
                                formatter: (value) => Math.round(value) + '°',
                            },
                            hidden: !isDataset2Hidden,
                        },
                        {
                            label: 'Precipitation ( % )',
                            data: popDataNested,
                            borderColor: '#36a2eb',
                            backgroundColor: '#36a2eb80',
                            tension: 0.4,
                            fill: true,
                            datalabels: {
                                align: 'right',
                                anchor: 'center',
                                backgroundColor: '#36a2eb',
                                formatter: (value) => Math.round(value) + '%',
                            },
                            hidden: isDataset2Hidden,
                        },
                    ],
                }}
                options={{
                    scales: {
                        x: {
                            grid: { display: false },
                        },
                        x1: {
                            position: 'bottom',
                            grid: { display: false },
                        },
                        y: {
                            position: 'left',
                        },
                    },
                    layout: {
                        padding: {
                            top: 50,
                        },
                    },
                    plugins: {
                        legend: {
                            onClick: () => {
                                setIsDataset2Hidden(!isDataset2Hidden);
                            },
                        },
                        datalabels: {
                            borderRadius: 4,
                            color: 'white',
                            font: {
                                weight: 'bold',
                            },
                            padding: 6,
                        },
                    },
                }}
                plugins={[ChartDataLabels]}
            />
        </div>
    );
};

export default WeatherChart;
