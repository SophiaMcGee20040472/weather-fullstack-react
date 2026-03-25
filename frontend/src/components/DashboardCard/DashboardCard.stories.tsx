import type { Meta, StoryObj } from "@storybook/react";
import type { WeatherResponse } from "../../types/weather";
import DashboardCard from "../DashboardCard/DashboardCard";

const mockData: WeatherResponse = {
  weather: {
    location: {
      name: "Dublin",
      country: "Ireland",
    },
    current: {
      temp_c: 18,
      condition: {
        text: "Partly cloudy",
      },
      humidity: 65,
      wind_kph: 12,
    },
  },
  timezone: {
    location: {
      localtime: "2024-03-25 14:30",
    },
  },
  astronomy: {
    astronomy: {
      astro: {
        sunrise: "06:45 AM",
        sunset: "07:30 PM",
      },
    },
  },
};

const meta: Meta<typeof DashboardCard> = {
  title: "Components/DashboardCard",
  component: DashboardCard,
};

export default meta;

type Story = StoryObj<typeof DashboardCard>;

export const Default: Story = {
  args: {
    data: mockData,
    image: "/images/dublin.webp",
  },
};

export const WithPadding: Story = {
  render: (args: any) => (
    <div style={{ padding: 20 }}>
      <DashboardCard {...args} />
    </div>
  ),
  args: {
    data: mockData,
    image: "/images/dublin.webp",
  },
};