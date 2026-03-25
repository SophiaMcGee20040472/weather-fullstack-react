import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChakraProvider } from "@chakra-ui/react";
import { describe, test, expect, vi } from "vitest";
import TopNav from "./TopNav";

const renderTopNav = (props: React.ComponentProps<typeof TopNav>) =>
  render(
    <ChakraProvider>
      <TopNav {...props} />
    </ChakraProvider>
  );

const defaultProps: React.ComponentProps<typeof TopNav> = {
  city: "",
  setCity: vi.fn(),
  fetchData: vi.fn(),
  isDisabled: false,
  cities: ["Dublin", "Sydney", "Toronto"],
  setPage: vi.fn(),
  page: "dashboard",
};

describe("TopNav", () => {
  test("renders navigation items", () => {
    renderTopNav(defaultProps);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  test("calls setPage when Home is clicked", async () => {
    const setPage = vi.fn();
    renderTopNav({ ...defaultProps, setPage });

    await userEvent.click(screen.getByText("Home"));

    expect(setPage).toHaveBeenCalledWith("dashboard");
  });

  test("calls setPage when Profile is clicked", async () => {
    const setPage = vi.fn();
    renderTopNav({ ...defaultProps, setPage });

    await userEvent.click(screen.getByText("Profile"));

    expect(setPage).toHaveBeenCalledWith("profile");
  });

  test("renders select dropdown", () => {
    renderTopNav(defaultProps);

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
  });

  test("renders all cities in dropdown", () => {
    const cities = ["Dublin", "London", "Paris"];
    renderTopNav({ ...defaultProps, cities });

    const select = screen.getByRole("combobox");

    cities.forEach((city) => {
      expect(within(select).getByText(city)).toBeInTheDocument();
    });
  });

  test("calls setCity when selecting a city", async () => {
    const setCity = vi.fn();
    renderTopNav({ ...defaultProps, setCity });

    const select = screen.getByRole("combobox");

    await userEvent.selectOptions(select, "Dublin");

    expect(setCity).toHaveBeenCalledWith("Dublin");
  });

  test("renders Go button", () => {
    renderTopNav(defaultProps);

    expect(
      screen.getByRole("button", { name: /go/i })
    ).toBeInTheDocument();
  });

  test("calls fetchData when Go is clicked", async () => {
    const fetchData = vi.fn();
    renderTopNav({ ...defaultProps, fetchData, city: "Dublin" });

    await userEvent.click(screen.getByRole("button", { name: /go/i }));

    expect(fetchData).toHaveBeenCalled();
  });

  test("disables button when no city is selected", () => {
    renderTopNav({ ...defaultProps, city: "" });

    const button = screen.getByRole("button", { name: /go/i });

    expect(button).toBeDisabled();
  });

  test("enables button when city is selected", () => {
    renderTopNav({ ...defaultProps, city: "Dublin" });

    const button = screen.getByRole("button", { name: /go/i });

    expect(button).not.toBeDisabled();
  });

  test("forceVisible makes component visible", () => {
    renderTopNav({ ...defaultProps, forceVisible: true });

    const nav = screen.getByText("Home").closest("div");

    expect(nav).toBeInTheDocument();
  });
});