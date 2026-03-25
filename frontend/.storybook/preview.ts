import { ChakraProvider } from "@chakra-ui/react";
import type { Preview } from "@storybook/react-vite";
import React from "react";

const preview: Preview = {
  decorators: [
    (Story) =>
      React.createElement(
        ChakraProvider,
        null,
        React.createElement(Story)
      ),
  ],
};

export default preview;