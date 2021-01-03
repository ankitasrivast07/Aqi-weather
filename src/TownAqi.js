import React, { useState } from 'react';



const CityAQI = props => {
    const [showDetails, setShowDetails] = useState(false);

    const aqi = props.cityInfo.aqi;
    const placeName = props.cityInfo.station.name;
  

    const getGroupAQI = aqi => {
        let colorName = 'unknown';
        let level = 'Unknown';

        if (aqi >= 0 && aqi <= 50) {
            level = 'Good';
            colorName = 'good';
        } else if (aqi >= 51 && aqi <= 100) {
            level = 'Moderate';
            colorName = 'moderate';
        } else if (aqi >= 101 && aqi <= 150) {
            level = 'Unhealthy for Sensitive Groups';
            colorName = 'unhealthy-sentitive';
        } else if (aqi >= 151 && aqi <= 200) {
            level = 'Unhealthy';
            colorName = 'unhealthy';
        } else if (aqi >= 201 && aqi <= 300) {
            level = 'Very Unhealthy';
            colorName = 'very-unhealthy';
        } else if (aqi >= 301) {
            level = 'Hazardous';
            colorName = 'hazardous';
        }
        
        let group = {};
        group['level'] = level;
        group['colorName'] = colorName;

        return group;
    };
    
 
    return (
        <div  
            className={`cityInfo ${getGroupAQI(aqi).colorName}`}
            onClick={ () => setShowDetails(!showDetails)}>
            <span>{ placeName } - <b>{ aqi }</b> - <b>{ getGroupAQI(aqi).level }</b></span>
       
        </div>
    )
};

export default CityAQI;