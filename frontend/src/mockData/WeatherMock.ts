import type { WeatherResponse } from "../types/weather";

export const WeatherMock: WeatherResponse = {
   weather: {
    location: {
      name: 'Dublin',
      country: 'Ireland',
    },
    current: {
      temp_c: 15,
      condition: { text: "Partly cloudy" },
      humidity: 70,
      wind_kph: 20,
    },
  },
  timezone: {
    location: {
      localtime: "2024-06-25 14:30",
    },
  },
  astronomy: {
    astronomy: {
      astro: {
        sunrise: "05:00 AM",
        sunset: "09:30 PM",
      },
    },
  },
};