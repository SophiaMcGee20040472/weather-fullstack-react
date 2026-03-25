import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import DashboardCard from "./DashboardCard";
import { WeatherMock } from "../../mockData/WeatherMock";

const renderComponent = () =>
  render(<DashboardCard data={WeatherMock} image="/test.jpg" />);

describe("DashboardCard", () => {
  it("renders location and default weather data", () => {
    renderComponent();

    expect(screen.getByText("Dublin")).toBeInTheDocument();
    expect(screen.getByText(/Weather Conditions/i)).toBeInTheDocument();

    expect(screen.getByText("Temp")).toBeInTheDocument();
    expect(screen.getByText("15°C")).toBeInTheDocument();
    expect(screen.getByText("Partly cloudy")).toBeInTheDocument();
    expect(screen.getByText("Humidity")).toBeInTheDocument();
    expect(screen.getByText("70%")).toBeInTheDocument();
  });

  it("renders all tabs", () => {
    renderComponent();

    expect(screen.getByRole("button", { name: /weather/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /timezone/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /astronomy/i })).toBeInTheDocument();
  });

  it("switches to timezone tab and shows date & time", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByRole("button", { name: /timezone/i }));
    expect(screen.getByText(/Jun/i)).toBeInTheDocument();
    expect(screen.getByText("14:30")).toBeInTheDocument();
  });

  it("switches to astronomy tab and shows astro data", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByRole("button", { name: /astronomy/i }));

    expect(screen.getByText("Sunrise")).toBeInTheDocument();
    expect(screen.getByText("05:00 AM")).toBeInTheDocument();
    expect(screen.getByText("Sunset")).toBeInTheDocument();
    expect(screen.getByText("09:30 PM")).toBeInTheDocument();
  });

  it("renders the weather image correctly", () => {
    renderComponent();

    const image = screen.getByRole("img", {
      name: /weather in dublin/i,
    });

    expect(image).toHaveAttribute("src", "/test.jpg");
  });

  it("defaults to weather tab on first render", () => {
    renderComponent();

    expect(screen.getByText("Temp")).toBeInTheDocument();
    expect(screen.queryByText("Time")).not.toBeInTheDocument();
  });

  it("updates UI when switching tabs multiple times", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByRole("button", { name: /astronomy/i }));
    expect(screen.getByText("Sunrise")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /weather/i }));
    expect(screen.getByText("Temp")).toBeInTheDocument();
  });
});