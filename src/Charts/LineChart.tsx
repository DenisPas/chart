import React, {FC} from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler, CoreChartOptions, ChartData, ChartConfiguration, ChartOptions, ScatterDataPoint, BubbleDataPoint
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler
);

const LineChart: FC<{ data: Array<{date: string, value: number}>, title:string }> = ({ title, data }) => {

    let dataChartJS: any = {
        labels: (data.map(x => new Date(x.date).toLocaleDateString("en-US", {day: 'numeric', month: 'short' })).reverse()) as string[],
        datasets: [{
            data: data.map(() => Math.random()),
            backgroundColor: 'rgba(100,63,187,0.48)',
            fill: true,
            borderColor: 'rgb(215, 80, 255)',

            borderWidth: 2,
            tension: 0.4,
            radius: 1,
            pointHitRadius: 2,
        }]
    };

    let options: any= {
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: title,
                color: 'white'
            },
            tooltip:{
                display: true
            },
        },
        interaction: {
            intersect: false,
        },
        scales: {
            y:{
                ticks:{
                    color: 'rgb(178, 189, 255)',
                    font:{
                        size:14
                    }
                },
                grid:{
                    color:"rgb(107, 107, 178)"
                }
            },
            x:{
                max:10,
                ticks:{
                    color: 'rgb(178, 189, 255)',
                    font:{
                        size:14
                    }
                },
                grid:{
                    color:"rgb(107, 107, 178)"
                },
            }
        },

    }

    return (
        <div>
            <Line
                className='chart'
                data={dataChartJS}
                height={400}
                options={options}

            />
        </div>
    )
}

export default LineChart
