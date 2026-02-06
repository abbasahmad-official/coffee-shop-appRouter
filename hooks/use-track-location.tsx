'use client'
import { useState } from "react";
import { positionType } from "@/types";

const useTrackLocation = () => {
            const [isFindingLocation, setIsFindingLocation] = useState(false);
            const [location, setLocation] = useState({lati:'',long:''});
            const [locationErrorMsg, setLocationErrorMsg] = useState('');
       
            function success(position: positionType) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({lati:latitude.toString(), long:longitude.toString()});
    setIsFindingLocation(false);
    setLocationErrorMsg('');
     console.log(`Latitude: ${latitude} °, Longitude: ${longitude} °`);
  }

  function error() {
    setLocationErrorMsg('Unable to retrieve your location');
    setIsFindingLocation(false);
    console.log("Unable to retrieve your location");
  }

   const handleTrackLocation = () => {
    
   if (!navigator.geolocation) {
     setIsFindingLocation(false);
     setLocationErrorMsg('Geolocation is not supported by your browser');
    console.log("Geolocation is not supported by your browser");
  } else {
    console.log("Locating…");
    setIsFindingLocation(true);
    setLocationErrorMsg('');
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

return {
    // latLong
    setIsFindingLocation,
    locationErrorMsg,
    location,
    isFindingLocation,
    handleTrackLocation
};
}
export default useTrackLocation;