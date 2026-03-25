import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import TopNav from "./TopNav";

const meta: Meta<typeof TopNav> = {
  title: "Components/TopNav",
  component: TopNav,
};

export default meta;

type Story = StoryObj<typeof TopNav>;

export const Default: Story = {
  render: () => {
    const [city, setCity] = useState("");
    const [page, setPage] = useState<"dashboard" | "profile">("dashboard");

    return (
      <div style={{ maxWidth: 375, margin: "0 auto" }}>
        <TopNav
          city={city}
          setCity={setCity}
          fetchData={() => console.log(city)}
          isDisabled={!city}
          cities={["Dublin", "Sydney", "Toronto"]}
          setPage={setPage}
          page={page}
          forceVisible
        />
      </div>
    );
  },
};