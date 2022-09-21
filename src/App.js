import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const apiKey = "f56f24967aaf51182d1d4df628297c6d";
  const [inputCity, setInputCity] = useState("");
  const [data, setdata] = useState([]);
const [errorMesage,setErrorMessage] = useState("")

const [loading,setLoading] = useState(false)

  const getWeatherDetails = (cityName) => {
    setLoading(true)
    
    const apiURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      apiKey;
    axios
      .get(apiURL)
      .then((res) => {
        // console.log("response", res.data);
         setLoading(false)
         setInputCity("")
         setErrorMessage("")
        setdata(res.data);
      })
      .catch((err) => {
         setLoading(false)
         setInputCity("")
         setErrorMessage(cityName + " " +err?.response?.data?.message)
        console.log("err", err);
      });
  };
  const handleChangeInput = (e) => {
    // console.log("value", e.target.value);
    setInputCity(e.target.value);
  };
  const handleSerch = () => {
    getWeatherDetails(inputCity);
  };
  useEffect(() => {
    getWeatherDetails("delhi");
  }, []);


  return (
    <div className="col-md-12">
      <div className="weatherBg">
        <h1 className="heading">weather App</h1>
        <div className="d-grid gap-3 col-4 mt-4">
          <input
            type="text"
            className="form-control"
            value={inputCity}
            onChange={handleChangeInput}
            required
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSerch}
            disabled={inputCity?false:true}
            // style={{"cursor":!inputCity?"pointer":"not-allowed"}}
          >
            {" "}
            {loading?"Loading...":"Search"}
          </button>
          <h1 style={{"color":"red"}}>{errorMesage}</h1>
        </div>
      </div>

      <div className="col-md-12 text-centre mt-5">
        <div className="shadow rounded wetherResultBox">
          <img
            className="weatherIcon"
            src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png"
          />

          <h5 className="weatherCity">{data?.name}</h5>
          <h6 className="weatherTem">
            {(data?.main?.temp - 275.15).toFixed(2)}°C
          </h6>
        </div>
      </div>
    </div>
  );
}

export default App;
