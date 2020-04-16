import React from 'react';
import './App.css';
const Snake=(props)=>
{
	return (
	props.snakedots.map((arr,i)=>
	{
		return <div className="box" key={i} style={{left:`${arr[0]}%` , top:`${arr[1]}%`}}></div>;
	})
	);
}

export default Snake;