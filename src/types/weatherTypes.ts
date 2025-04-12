export interface WeatherData {
    location: {
      name: string;
      country: string;
      localtime: string;
    };
    current: {
      temperature: number;
      weather_icons: string[];
      weather_descriptions: string[];
      wind_speed: number;
      humidity: number;
      feelslike: number;
    };
  }
  
  export interface ForecastOrHistoryData {
    date: string;
    temperature: number;
    weather_icon: string;
    description: string;
  }
  