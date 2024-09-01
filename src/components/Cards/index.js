import React from 'react'
import "./style.css";
import {Card,Row} from "antd";
import Button from "../button";
function Cards( {income,expense,balance,showExpenseModal,showIncomeModal,resetBalance}) {
  return (
    <div>
        <Row className='my-row'>
           <Card className='my-card' title="Current balance">
            <p>₹{balance}</p>
            <Button text="Reset Balance" blue={true} onClick={resetBalance} />
           </Card>
           <Card className='my-card' title="Income">
            <p>₹{income}</p>
            <Button text="Add Income" blue={true} onClick={showIncomeModal} />
           </Card>
           <Card className='my-card' title="Total Expenses">
            <p>₹{expense}</p>
            <Button text="Add Expenses" blue={true} onClick={showExpenseModal} />
           </Card>
        </Row>
    </div>
  )
}
export default Cards