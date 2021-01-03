import React from 'react';

import CityAQI from './TownAqi';
import NoDataFound from './NoData';

const CityAQIList = props => {
    let  cityList = [];    
    if (props.data) {
        cityList = props.data;
    }
        
    return (
           
          <div className="cityList">
          
            <ul>
            {
                cityList.length > 0
                ?
                cityList.map((cityInfo, i) => (
                    <li key={i}>
                        <CityAQI cityInfo={cityInfo} />
                    </li>
                ))
                :
                <NoDataFound />
            }
            </ul>
            </div>
       

    )
};

export default CityAQIList;