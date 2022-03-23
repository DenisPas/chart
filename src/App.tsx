import React, { useEffect, useState} from 'react';

import './App.css';
import LineChart from './Charts/LineChart';
import ChartProps from "./types";


const API = "https://api.multifarm.fi/jay_flamingo_random_6ix_vegas/get_assets?pg=1&tvl_min=50000&sort=tvlStaked&sort_order=desc&farms_tvl_staked_gte=10000000"

function App():JSX.Element {
    const [charts, setChart] = useState<ChartProps[]>([])
    useEffect(() => {
        const fetchCoins = async (): Promise<void> => {
            await fetch(API)
                .then((response:Response) => {
                    if (response.ok) {
                        response.json().then((json) => {
                            const obj = json.data.find((el:any) => el?.assetId === "TERRA_Lido__LUNA")
                            const arr:ChartProps[] = []
                            if(obj.tokenAHoldersHistory.length > 0 && obj.tokenAPriceHistory.length > 0){
                               arr.push({data: obj.tokenAHoldersHistory, title: 'HoldersHistory'  }, {data: obj.tokenAPriceHistory, title: 'PriceHistory'  })
                            }
                            setChart(arr)
                        });
                    }
                }).catch((error) => {
                    console.log(error);
                });
        };
        fetchCoins()
    }, [])


  return (
      <div className="App">
          <div className='container'>
              <div className='header'>
                  Chart Task
              </div>
              <div className='main-content'>
                  {
                      charts && charts.map((chart:ChartProps ,index: number)=> (
                          <div key={chart.title + index} className='container-chart'>
                              <LineChart title={chart.title}  data={chart.data} />
                          </div>
                      ))
                  }
              </div>
          </div>
      </div>
  );
}

export default App;
