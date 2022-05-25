import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
// import ChartDataLabels from 'chartjs-plugin-datalabels';

import { IData } from '../global';

interface IInitialValue {
    times: string[];
    temps: number[];
    pop: number[]; //  Probability of precipitation
}

Chart.register(...registerables);

const WeatherChart = ({ dataApp }: { dataApp: IData }) => {
    // const [isDataset2Hidden, setIsDataset2Hidden] = useState(true);
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

    const numLabelsDisplayed = 10;
    const timeLabels = timesTempsPops.times.slice(0, numLabelsDisplayed);
    timeLabels[0] = 'Now';
    const tempDataNested = timesTempsPops.temps.slice(0, numLabelsDisplayed);
    const popDataNested = timesTempsPops.pop.slice(0, numLabelsDisplayed);

    const legendMarginBottom = {
        id: 'legendMarginBottom',
        beforeInit(chart: any) {
            const fitValue = chart.legend.fit;

            chart.legend.fit = function fit() {
                fitValue.bind(chart.legend)();
                return (this.height += 2);
            };
        },
    };

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
                            // datalabels: {
                            //     align: 'end',
                            //     anchor: 'end',
                            //     backgroundColor: '#dc3545',
                            //     formatter: (value) => Math.round(value) + '°',
                            // },
                            // hidden: !isDataset2Hidden,
                        },
                        {
                            label: 'Precipitation ( % )',
                            data: popDataNested,
                            borderColor: '#36a2eb',
                            backgroundColor: '#36a2eb80',
                            tension: 0.4,
                            fill: false,
                            // datalabels: {
                            //     align: 'end',
                            //     anchor: 'end',
                            //     backgroundColor: '#36a2eb',
                            //     formatter: (value) => Math.round(value) + '%',
                            // },
                            // hidden: isDataset2Hidden,
                        },
                    ],
                }}
                options={{
                    scales: {
                        x: {
                            grid: { display: false },
                        },
                    },
                    layout: {
                        padding: {
                            // top: 4,
                        },
                    },
                    plugins: {
                        legend: {
                            labels: {
                                boxWidth: 15,
                                boxHeight: 10,
                            },
                            // onClick: () => {
                            //     setIsDataset2Hidden(!isDataset2Hidden);
                            // },
                        },
                        // datalabels: {
                        //     borderRadius: 4,
                        //     color: 'white',
                        //     font: {
                        //         weight: 'bold',
                        //     },
                        //     // padding: 6,
                        // },
                    },
                }}
                // plugins={[ChartDataLabels]}
                plugins={[legendMarginBottom]}
            />
        </div>
    );
};

export default WeatherChart;
