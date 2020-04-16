import React from 'react';
import './App.css';
const Food=(props)=>
{
	return (
	<div className="food" style={{left:`${props.food[0]}%` , top:`${props.food[1]}%`}}></div>
	);
}
export default Food;