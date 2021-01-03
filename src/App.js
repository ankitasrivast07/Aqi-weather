import React, { useState,  useRef } from 'react';
import { useAQIAPIs } from './useAqiApi';

import { TOKEN, SEARCH_CITIES_BASE_URL, api } from './AllApi';

import CityAQIList from './TownList';
import './App.css';


function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [url, setUrl] = useState('');
  const [cities , loading, initial, error] = useAQIAPIs(url);
  const [searchText, setSearchText] = useState('');
  const searchInput = useRef(null);


  const searchCityName = (event) => {
      event.preventDefault();
      setUrl(`${SEARCH_CITIES_BASE_URL}?token=${TOKEN}&keyword=${weather.name}`);
  }

  const handleSearchTextChange = (event) => {
      setSearchText(event.target.value);
  }
  const search = evt => {
    if (evt.key === "Enter" ) {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
        
    }
  }




  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  
  
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app warm'}>
       {/* <div className={(( weather.weather[].main === "Clouds") ? 'app rain' : 'app warm')} > */}

      <main>
        
      <div id="cover" >
      
        <div class="tb ">
        <div class="td">
          <input 
            type="text"
            className="search-bar"
            placeholder=""
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          /></div>
           <div class="td" id="s-cover">
       <button type="submit"  >
         <div id="s-circle"></div>
         <span></span>
       </button>
     </div>
             
          
          </div>
        
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
       
            <div className="container mtop">
          <div className="row">
<div className="col-md-12">
  <div className="card he1">
    <div className="row">
      <div className="col-md-4">
      <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className="location1">{dateBuilder(new Date())}</div>
      </div>
      <div className="col-md-4">
      <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
      </div>
      <div className="col-md-4">
      <div className="weather">{weather.weather[0].main}</div>
      <img className="img3" src="https://manage-website.s3.amazonaws.com/436ca560-df6d-444e-94fa-ce448eb36f20weather1.png"/>
    
      </div>
    </div>
  </div>
</div>
<div className="col-md-12">
  <div className="card he1">
    <div className="row">
      <div className="col-md-4">
      <div className="location">Sunrise {new Date(weather.sys.sunrise * 1000).toLocaleTimeString().slice(0, 5)} AM </div>
        <img className="img1" src="https://manage-website.s3.amazonaws.com/9022bbec-5d7b-4152-bd15-3c3a7baf49achalf-sun.png"/>
    
      </div>
      <div className="col-md-4">
      <div className="location">
             Wind: {weather.wind.speed}Km/hr
            </div>
          <div className="location1">Humidity: {weather.main.humidity}% </div>

      </div>
      <div className="col-md-4">
          <div className="location">Sunset {new Date(weather.sys.sunset * 1000).toLocaleTimeString().slice(0, 5)} PM</div>
          <img className="img2" src="https://manage-website.s3.amazonaws.com/fe00ac73-9f13-4d1d-acb0-a0126f435b82sunset1.png"/>
    
      </div>
    </div>
  </div>
</div>
</div>
          </div>

            <div className="App">
   
         
      <div>
        
            { error }
           
            <form onSubmit={ e => searchCityName(e)}>
                <label className="nothing">
               
                <input 
                
                    type="text" 
                    ref={ searchInput }
                    value={ searchText } 
                    placeholder= ""
                    onChange={ e => handleSearchTextChange(e) }
                   />
                </label>
              
                <input type="submit" value="Want to Know AQI of your city" />
            </form>
           
            {
                loading ?
                    (<span>loading...</span>)
                    :
                    !initial && (<CityAQIList data={ cities.data }/>)
            }
        </div>
    </div>
          </div>
       
        ) : ('')}
      </main>
      </div>
    // </div>
  );



}

export default App;

