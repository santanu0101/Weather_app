import React, { useState, useEffect } from "react";
import {
  Cloud,
  Sun,
  CloudRain,
  CloudSnow,
  Wind,
  Eye,
  Thermometer,
  Droplets,
  MapPin,
  Search,
  Zap,
  Sunrise,
  Sunset,
} from "lucide-react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Weather = () => {
  const [weather, setWeather] = useState(false);


  function convertUnixToTime(unix, timezoneOffset = 0) {
    // Multiply by 1000 to convert to milliseconds
    const date = new Date((unix + timezoneOffset) * 1000);
    return date.toLocaleTimeString(); // Local time format like 6:42:18 AM
  }

  // console.log("Sunrise:", convertUnixToTime(sunrise, timezone));
  // console.log("Sunset:", convertUnixToTime(sunset, timezone));

  const handleSearch = async (city) => {
    if (!city?.trim()) return;
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();
      // const uvIndexUrl = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely,alerts&appid=${import.meta.env.VITE_APP_ID}`)
      // const uvIndex = await uvIndexUrl.json()
      console.log(data);

      if (data.cod === "404") {
      toast.error("City not found. Please enter a valid city name.");
      return;
    }

      const sunrise = data.sys.sunrise;
      const sunset = data.sys.sunset;
      const timezone = data.timezone;
      // console.log(uvIndex)
      setIsLoading(true);
      setWeather({
        location: data.name,
        temperature: Math.floor(data.main.temp),
        condition: data.weather[0].main,
        humidity: data.main.humidity,
        windSpeed: (data.wind.speed * 3.6).toFixed(2),
        visibility: (data.visibility / 1000).toFixed(1),
        feelsLike: data.main.feels_like,
        // uvIndex: 7,
        pressure: data.main.pressure,
        sunrise: convertUnixToTime(sunrise, timezone),
        sunset: convertUnixToTime(sunset, timezone),
      });
      setIsLoading(false);
      setSearchQuery('');
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  // const [particles, setParticles] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
    
  }, []);

  // useEffect(() => {
  //   // Generate floating particles
  //   const newParticles = Array.from({ length: 15 }, (_, i) => ({
  //     id: i,
  //     x: Math.random() * 100,
  //     y: Math.random() * 100,
  //     size: Math.random() * 4 + 2,
  //     delay: Math.random() * 5,
  //     duration: Math.random() * 10 + 10
  //   }));
  //   setParticles(newParticles);
  // }, [weather.condition]);

  const getWeatherIcon = (condition, size = 'w-8 h-8') => {
    const iconClass = `${size} text-white drop-shadow-2xl filter brightness-110`;
    switch (condition) {
      case 'Sunny':
        return <Sun className={`${iconClass} animate-pulse`} />;
      case 'Clouds':
        return <Cloud className={iconClass} />;
      case 'Rain':
        return <CloudRain className={`${iconClass} animate-bounce`} />;
      case 'Snowy':
        return <CloudSnow className={iconClass} />;
      default:
        return <Sun className={`${iconClass} animate-pulse`} />;
    }
  };

  const getBackgroundGradient = (condition) => {
    switch (condition) {
      case 'Sunny':
        return 'from-amber-400 via-orange-500 to-pink-600';
      case 'Clouds':
        return 'from-slate-600 via-slate-700 to-slate-800';
      case 'Rain':
        return 'from-indigo-800 via-purple-800 to-slate-900';
      case 'Snow':
        return 'from-cyan-400 via-blue-500 to-indigo-600';
      default:
        return 'from-amber-400 via-orange-500 to-pink-600';
    }
  };

  // const getParticleColor = (condition) => {
  //   switch (condition) {
  //     case 'Sunny':
  //       return 'bg-yellow-300/30';
  //     case 'Rainy':
  //       return 'bg-blue-300/40';
  //     case 'Snowy':
  //       return 'bg-white/50';
  //     default:
  //       return 'bg-white/20';
  //   }
  // };


  useEffect(()=>{
    handleSearch("kolkata");
  },[])

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient(weather.condition)} relative overflow-hidden transition-all duration-1000`}>
      {/* Animated Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10"></div>

      {/* Dynamic Particles */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map(particle => (
          <div
            key={particle.id}
            className={`absolute rounded-full ${getParticleColor(weather.condition)} blur-sm`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`
            }}
          ></div>
        ))}
      </div> */}

      {/* Mesh Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -right-32 w-80 h-80 bg-gradient-to-l from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-32 left-1/3 w-72 h-72 bg-gradient-to-t from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 p-6">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <h1 className="text-5xl md:text-8xl font-black text-white mb-4 drop-shadow-2xl bg-gradient-to-r from-white via-white to-white/80 bg-clip-text">
              WeatherLux
            </h1>
            <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/10 blur-lg rounded-lg"></div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-full px-8 py-4 inline-block border border-white/20 shadow-2xl">
            <p className="text-white/90 text-xl font-medium">
              {currentTime.toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <p className="text-white/70 text-lg font-light">
              {formatTime(currentTime)}
            </p>
          </div>
        </div>

        {/* Premium Search Bar */}
        <div className="mb-12 flex justify-center">
          <div className="relative w-full max-w-lg group">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            <div className="relative">
              <input
                type="text"
                placeholder="Discover weather in any city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                className="w-full px-8 py-6 rounded-2xl bg-white/15 backdrop-blur-2xl border border-white/30 text-white text-lg placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-500 shadow-2xl"
              />
              <button
                onClick={() => handleSearch(searchQuery)}
                disabled={isLoading}
                className="absolute right-3 top-3 p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 shadow-xl transform hover:scale-110"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                ) : (
                  <Search className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>


        <div className="flex justify-center px-4 py-8">
          {/* Hero Weather Card */}
          <div className="xl:col-span-2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative bg-white/15 backdrop-blur-2xl rounded-3xl p-10 border border-white/30 shadow-2xl transform hover:scale-[1.02] transition-all duration-700">
                {/* Location Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-500 shadow-lg">
                      <MapPin className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white">{weather.location}</h2>
                      <p className="text-white/70">Current conditions</p>
                    </div>
                  </div>
                </div>

                {/* Main Temperature Display */}
                <div className="flex items-center justify-between mb-12">
                  <div className="relative">
                    <div className="text-8xl md:text-9xl font-black text-white mb-4 drop-shadow-2xl">
                      {weather.temperature}
                      <span className="text-6xl text-white/80">°C</span>
                    </div>
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent text-2xl font-bold capitalize mb-2">
                      {weather.condition}
                    </div>
                    <div className="text-white/70 text-lg">
                      Feels like {weather.feelsLike}°C
                    </div>
                  </div>
                  <div className="relative transform hover:rotate-12 hover:scale-110 transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-full blur-xl"></div>
                    {getWeatherIcon(weather.condition, 'w-32 h-32 md:w-40 md:h-40 relative z-10')}
                  </div>
                </div>

                {/* Enhanced Weather Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { icon: Wind, label: 'Wind Speed', value: `${weather.windSpeed} km/h`, color: 'from-cyan-400 to-blue-500' },
                    { icon: Droplets, label: 'Humidity', value: `${weather.humidity}%`, color: 'from-blue-400 to-indigo-500' },
                    { icon: Eye, label: 'Visibility', value: `${weather.visibility} km`, color: 'from-purple-400 to-pink-500' },
                    { icon: Thermometer, label: 'Pressure', value: `${weather.pressure} mb`, color: 'from-pink-400 to-red-500' }
                  ].map((stat, index) => (
                    <div key={index} className="relative group/stat">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl blur opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} mb-3 shadow-lg`}>
                          <stat.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-white/80 text-sm font-medium mb-1">{stat.label}</div>
                        <div className="text-white text-xl font-bold">{stat.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sun Times */}
                <div className="flex justify-between mt-8 space-x-4">
                  <div className="flex-1 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 backdrop-blur-xl rounded-2xl p-4 border border-orange-300/30">
                    <div className="flex items-center space-x-3">
                      <Sunrise className="w-6 h-6 text-orange-300" />
                      <div>
                        <div className="text-orange-200 text-sm">Sunrise</div>
                        <div className="text-white font-bold">{weather.sunrise}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 bg-gradient-to-r from-purple-400/20 to-pink-400/20 backdrop-blur-xl rounded-2xl p-4 border border-purple-300/30">
                    <div className="flex items-center space-x-3">
                      <Sunset className="w-6 h-6 text-purple-300" />
                      <div>
                        <div className="text-purple-200 text-sm">Sunset</div>
                        <div className="text-white font-bold">{weather.sunset}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          {/* <div className="space-y-8"> */}
            
            {/* <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative bg-white/15 backdrop-blur-2xl rounded-3xl p-8 border border-white/30 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mr-3 animate-pulse"></div>
                  5-Day Forecast
                </h3>
                <div className="space-y-4">
                  {weather.forecast.map((day, index) => (
                    <div
                      key={index}
                      className="group/day relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl opacity-0 group-hover/day:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center justify-between p-5 rounded-2xl bg-white/10 hover:bg-white/15 transition-all duration-300 border border-white/20">
                        <div className="flex items-center space-x-4">
                          <div className="transform group-hover/day:scale-110 transition-transform duration-300">
                            {getWeatherIcon(day.condition, 'w-8 h-8')}
                          </div>
                          <div>
                            <span className="text-white font-semibold text-lg">{day.day}</span>
                            <div className="text-white/60 text-sm">{day.precipitation}% rain</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-3 text-white">
                            <span className="font-bold text-xl">{day.high}°</span>
                            <span className="text-white/60 text-lg">{day.low}°</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div> */}

            {/* Premium UV Index Card */}
            {/* <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative bg-white/15 backdrop-blur-2xl rounded-3xl p-8 border border-white/30 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Zap className="w-6 h-6 text-yellow-400 mr-3" />
                  UV Index
                </h3>
                <div className="relative">
                  <div className="flex justify-between text-white/60 text-sm mb-4">
                    <span>Low</span>
                    <span>Moderate</span>
                    <span>High</span>
                    <span>Extreme</span>
                  </div>
                  <div className="relative w-full bg-white/20 rounded-full h-4 mb-6 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-yellow-400 via-orange-500 to-red-500 rounded-full"></div>
                    <div
                      className="bg-white rounded-full h-6 w-6 absolute top-1/2 transform -translate-y-1/2 shadow-lg border-2 border-white transition-all duration-1000"
                      style={{ left: `calc(${(weather.uvIndex / 11) * 100}% - 12px)` }}
                    ></div>
                  </div>
                  <div className="text-center">
                    <span className="text-5xl font-black text-white mb-2 block">{weather.uvIndex}</span>
                    <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
                      weather.uvIndex <= 2 ? 'bg-green-500/30 text-green-200' :
                      weather.uvIndex <= 5 ? 'bg-yellow-500/30 text-yellow-200' :
                      weather.uvIndex <= 7 ? 'bg-orange-500/30 text-orange-200' :
                      'bg-red-500/30 text-red-200'
                    }`}>
                      {weather.uvIndex <= 2 ? 'Low Risk' : weather.uvIndex <= 5 ? 'Moderate' : weather.uvIndex <= 7 ? 'High Risk' : 'Extreme'}
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          {/* </div> */}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }
      `}</style>
    </div>
  );
};

export default Weather;
