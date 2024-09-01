import React from 'react'
import transaction from "../assets/transactions.svg";
function NoTransaction() {
  return (
    <div  style={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        flexDirection:"column",
        marginBottom:"2rem"
    }}>
       <img  className="noTransaction" src={transaction} />
       <p style={{textAlign:"center",fontSize:"1.2rem"}}>You have no transaction currently</p>
    </div>
  )
}

export default NoTransaction