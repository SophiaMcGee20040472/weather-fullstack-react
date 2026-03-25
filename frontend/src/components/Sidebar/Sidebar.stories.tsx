import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Sidebar from "./Sidebar";

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  render: () => {
    const [city, setCity] = useState("");
    const [page, setPage] = useState<"dashboard" | "profile">("dashboard");

    const cities = ["Dublin", "Sydney", "Toronto"];

    const fetchData = () => {
      console.log("Fetching weather for:", city);
    };

    return (
      <div style={{ height: "100vh" }}>
        <Sidebar
          city={city}
          setCity={setCity}
          fetchData={fetchData}
          isDisabled={!city}
          cities={cities}
          setPage={setPage}
          page={page}
        />
      </div>
    );
  },
};