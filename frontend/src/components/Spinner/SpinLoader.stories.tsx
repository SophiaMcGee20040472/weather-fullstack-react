import SpinLoader from "./SpinLoader";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/SpinLoader",
  component: SpinLoader,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SpinLoader>;

export default meta;

type Story = StoryObj<typeof SpinLoader>;

export const Default: Story = {};