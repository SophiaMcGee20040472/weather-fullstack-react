import { render, screen } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { describe, test, expect } from "vitest";
import SpinLoader from "./SpinLoader";

const renderWithChakra = () =>
  render(
    <ChakraProvider>
      <SpinLoader />
    </ChakraProvider>
  );

describe("SpinLoader", () => {
  test("renders loading messages", () => {
    renderWithChakra();

    expect(
      screen.getByText(/fetching the latest weather data/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/loading weather/i)
    ).toBeInTheDocument();
  });

  test("renders the logo image", () => {
    renderWithChakra();

    const image = screen.getByRole("img");

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "./images/logo.webp");
  });

  test("renders content centered vertically", () => {
    renderWithChakra();

    const container = screen.getByText(/loading weather/i).closest("div");

    expect(container).toBeInTheDocument();
  });
});