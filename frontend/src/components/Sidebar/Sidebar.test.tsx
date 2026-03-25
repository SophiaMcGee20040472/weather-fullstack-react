import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChakraProvider } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { describe, test, expect, vi, beforeAll } from "vitest";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation(() => ({
      matches: false,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    })),
  });
});

const renderSidebar = (props: React.ComponentProps<typeof Sidebar>) =>
  render(
    <ChakraProvider>
      <Sidebar {...props} />
    </ChakraProvider>,
  );

const defaultProps: React.ComponentProps<typeof Sidebar> = {
  city: "",
  setCity: vi.fn(),
  fetchData: vi.fn(),
  isDisabled: false,
  cities: ["Dublin", "Sydney", "T"],
  setPage: vi.fn(),
  page: "dashboard",
};

describe("Sidebar", () => {
  test("renders sidebar with logo and title", () => {
    renderSidebar(defaultProps);
    expect(screen.getByText("City Weather App")).toBeInTheDocument();
  });

  test("renders home and profile navigation items", () => {
    renderSidebar(defaultProps);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  test("calls setPage with dashboard when home is clicked", async () => {
    const setPage = vi.fn();
    renderSidebar({ ...defaultProps, setPage });
    await userEvent.click(screen.getByText("Home"));
    expect(setPage).toHaveBeenCalledWith("dashboard");
  });

  test("calls setPage with profile when profile is clicked", async () => {
    const setPage = vi.fn();
    renderSidebar({ ...defaultProps, setPage });
    await userEvent.click(screen.getByText("Profile"));
    expect(setPage).toHaveBeenCalledWith("profile");
  });
  test("calls setCity when city is selected", async () => {
    const setCity = vi.fn();
    renderSidebar({ ...defaultProps, setCity });
    const select = screen.getByDisplayValue("Select city");
    await userEvent.selectOptions(select, "Dublin");
    expect(setCity).toHaveBeenCalledWith("Dublin");
  });

  test("renders Get Weather button", () => {
    renderSidebar(defaultProps);
    expect(screen.getByText("Get Weather")).toBeInTheDocument();
  });

  test("calls fetchData when Get Weather button is clicked", async () => {
    const fetchData = vi.fn();
    renderSidebar({ ...defaultProps, fetchData });
    await userEvent.click(screen.getByText("Get Weather"));
    expect(fetchData).toHaveBeenCalled();
  });

  test("disables Get Weather button when isDisabled is true", () => {
    renderSidebar({ ...defaultProps, isDisabled: true });
    expect(screen.getByText("Get Weather")).toBeDisabled();
  });

  test("highlights active page in navigation", () => {
    renderSidebar({ ...defaultProps, page: "profile" });
    const profileItem = screen.getByText("Profile").closest("div");
    expect(profileItem).toHaveStyle("background-color: rgb(242, 167, 43)");
  });
});
