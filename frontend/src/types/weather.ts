export type WeatherResponse = {
  weather: {
    location: {
      name: string;
      country: string;
    };
    current: {
      temp_c: number;
      condition: {
        text: string;
      };
      humidity: number;
      wind_kph: number;
    };
  };
  timezone: {
    location: {
      localtime: string;
    };
  };
  astronomy: {
    astronomy: {
      astro: {
        sunrise: string;
        sunset: string;
      };
    };
  };
};