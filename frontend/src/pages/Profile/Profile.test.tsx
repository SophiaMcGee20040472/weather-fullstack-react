import { render, screen } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { describe, it, expect } from "vitest";
import Profile from "./Profile";

const renderWithChakra = () =>
  render(
    <ChakraProvider>
      <Profile />
    </ChakraProvider>
  );

describe("Profile", () => {
  it("renders the profile heading", () => {
    renderWithChakra();

    expect(screen.getByText(/user profile/i)).toBeInTheDocument();
  });

  it("renders the user image", () => {
    renderWithChakra();

    const image = screen.getByRole("img", { name: /profile/i });

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "./images/user.webp");
  });

  it("renders the badge", () => {
    renderWithChakra();

    expect(screen.getByText(/explorer/i)).toBeInTheDocument();
  });

  it("renders username section", () => {
    renderWithChakra();

    expect(screen.getByText(/username/i)).toBeInTheDocument();
    expect(screen.getByText(/oatie otter/i)).toBeInTheDocument();
  });

  it("renders list title", () => {
    renderWithChakra();

    expect(
      screen.getByText(/top city search reasons/i)
    ).toBeInTheDocument();
  });

  it("renders all list items", () => {
    renderWithChakra();

    expect(screen.getByText(/fishing trips/i)).toBeInTheDocument();
    expect(screen.getByText(/hanging out washing/i)).toBeInTheDocument();
    expect(screen.getByText(/photography/i)).toBeInTheDocument();
  });

  it("renders exactly 3 list items", () => {
    renderWithChakra();

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);
  });
});