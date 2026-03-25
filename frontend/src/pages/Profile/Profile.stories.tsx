import type { Meta, StoryObj } from "@storybook/react";
import Profile from "./Profile";

const meta: Meta<typeof Profile> = {
  title: "Pages/Profile",
  component: Profile,
};

export default meta;

type Story = StoryObj<typeof Profile>;

export const Default: Story = {};

export const CloudBackground: Story = {
  render: () => (
    <div
      style={{
        backgroundImage: "url('/images/cloudy.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        padding: 20,
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        <Profile />
      </div>
    </div>
  ),
};

export const MobileView: Story = {
  render: () => (
    <div
      style={{
        backgroundImage: "url('/images/cloudy.jpg')",
        backgroundSize: "cover",
        minHeight: "100vh",
        padding: 10,
      }}
    >
      <div style={{ maxWidth: 375, margin: "0 auto" }}>
        <Profile />
      </div>
    </div>
  ),
};