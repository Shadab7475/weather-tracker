import React, { useState } from 'react'
import toast, { Toaster } from "react-hot-toast";
import { IoSearch } from "react-icons/io5";
import humidity from "./assets/humidity.png"
import wind from "./assets/wind.png"
import clean from "./assets/sun.png"
import fog from "./assets/foggy.png"
import haze from "./assets/haze.png"
import snow from "./assets/snow.png"
import rain from "./assets/heavy-rain.png"
import cloud from "./assets/cloud.png"
import cloudy from "./assets/cloudy1.png"




const App = () => {
  const [city, setCity] = useState("")
  const [AddRess, setAddRess] = useState("")
  const [Temp, setTemp] = useState("")
  const [Humidity, setHumidity] = useState("")
  const [Wind, setWind] = useState("")
  const [Country, setCountry] = useState("")
  const [TempIcon, setTempIcon] = useState("")
  const Api = import.meta.env.VITE_APIKEY
  const ApiData = import.meta.env.VITE_APIURL
 
  
  const fetchData = async()=>{
    const res = await fetch(`${ApiData}${city}${Api}`)
    const data = await res.json()
    setAddRess(data?.name)
    setCountry(data?.sys?.country)
    setHumidity(data?.main?.humidity)
    setTemp(data?.main?.temp)
    setWind(data?.wind?.speed);
    setTempIcon(data?.weather?.[0]?.main)
    console.log(data);
    
    setCity("")
    if (!res.ok) {
        
        

     
      toast.error("City not found ❌");
      return;
    }
    
  }


  

  let image = clean;
  switch (TempIcon) {
    case "Fog":
        image = fog;
         break;
    case "Haze":
        image = haze;
         break;
    case "Smoke":
        image = fog;
         break;
    case "Sunshower":
        image = cloudy;
         break;
    case "Snow":
        image = snow;
         break;
    case "Rain":
        image = rain;
         break;
    case "Clouds":
        image = cloud;
         break;
    default:
        break;
  }

  


  return (
    <div className='bg-[#222] h-screen w-full'>
       <div className='card flex flex-col gap-5 '>
            <div className=" flex items-center gap-2 ">
                <input className='bg-[#ebfffc] indent-6 text-xl pl-6 w-[80%] outline-none border-none text-[#555] h-[55px] rounded-full' type="text" placeholder='Enter City Name' value={city} onChange={(e)=>setCity(e.target.value)} />
                <button onClick={fetchData} className="bg-white h-14 w-14 rounded-full flex items-center justify-center cursor-pointer"><IoSearch size={30} className="text-gray-500" /></button>   
            </div>
            {
                AddRess ? <div>
            <div className="flex flex-col items-center gap-3 rounded-2xl bg-white/10 backdrop-blur-md px-8 py-6 shadow-lg border border-white/20 text-white">
                <img src={image} alt="weather" className="h-20 w-20 drop-shadow-lg"/>
                <h1 className="text-5xl font-semibold tracking-wide">
                    {Temp}
                    <span className="text-3xl align-top">°C</span>
                </h1>
                <p className="text-3xl font-medium text-[#64FFDA]">
                    {AddRess}
                </p> 
                <p className="text-lg uppercase tracking-widest text-gray-300">
                    {Country}
                </p>
            </div>

            <div className=' flex items-center gap-3'>
                <div className='w-[50%] items-center justify-evenly flex'>
                    <img className='h-12' src={humidity} alt="Humidity" />
                    <div className='flex flex-col'>
                        <p className='text-[19px]'>{Humidity}%</p>
                        <p className='text-[20px]'>Humidity</p>
                    </div>
                    
                </div>
                <div className='w-[50%] flex items-center justify-evenly '>
                    <img src={wind} className='h-12' alt="Wind" />
                    <div className='flex flex-col'>
                        <p className='text-[19px]'>{Wind} Km/h</p>
                        <p className='text-[18px] flex'>Wind Speed</p>
                    </div>
                </div>

            </div>
            </div> : <Toaster position="top-center" />
            }
            
         
        </div>

    </div>
  )
}


export default App