import React from 'react'
import "./style.css";
function Input({ type, label, state, setState, placeholder }) {
  return (
    <div className='input-wrapper'>
      <p className='label'>{label}</p>
      <input type={type} className="custom-input" value={state} placeholder={placeholder} onChange={(e) => setState(e.target.value)} />
    </div>
  )
}

export default Input