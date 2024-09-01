import React from 'react'
import { Line,Pie } from '@ant-design/charts';

function ChartComponent({sortTransactions}) {
    const data =sortTransactions.map((item)=>{
      return {date:item.date,amount:item.amount};
    });
    const spendingData=sortTransactions.filter((transaction)=>transaction.type==="expense");
    
    let newSpend=[{tag:"food",amount:0},{tag:"education",amount:0},{tag:"office",amount:0}];
    spendingData.forEach((item)=>{
      if(item.tag==="food"){
        newSpend[0].amount+=item.amount;
      }
      else if(item.tag==="education"){
        newSpend[1].amount+=item.amount;
      }
      else{
        newSpend[2].amount+=item.amount;
      }
    })
      const config = {
        data:data,
        xField: 'date',
        width:300,
        autoFit:true,
        yField: 'amount',
      };
      const spendingConfig = {
        data:newSpend,
        width:300,
        angleField:"amount",
        colorField:"tag",
      };
      let chart;
      let pieChart;
  return (
    <div className='charts-wrapper'>
      <div className="lineChart">
        <h2>Your Analytics</h2>
      <Line {...config} onReady={(chartInstance)=>(chart=chartInstance)} />
      </div>
      <div className="pieChart">
        <h2>Your Spendings</h2>
      <Pie {...spendingConfig} onReady={(chartInstance)=>(pieChart=chartInstance)} />
      </div>
    </div>
  )
}

export default ChartComponent