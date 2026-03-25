import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import type { ReactNode } from "react";
import { WeatherMock } from "./mockData/WeatherMock";

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

vi.mock("@chakra-ui/react", async () => {
  const actual = await vi.importActual<typeof import("@chakra-ui/react")>(
    "@chakra-ui/react"
  );
  return {
    ...actual,
    useBreakpointValue: () =>
      "To view the weather, select a city from the dropdown above",
  };
});

vi.mock("./components/DashboardCard/DashboardCard", () => ({
  default: ({ data }: { data: typeof WeatherMock }) => (
    <div>
      <p>{data.weather.location.name}</p>
      <p>{data.weather.current.temp_c}</p>
      <p>{data.weather.current.condition.text}</p>
    </div>
  ),
}));

vi.mock("./components/Sidebar/Sidebar", () => ({
  default: ({
    setCity,
  }: {
    setCity: (city: string) => void;
  }): ReactNode => (
    <button onClick={() => setCity("Dublin")}>Select Dublin</button>
  ),
}));

vi.mock("./components/TopNav/TopNav", () => ({
  default: ({
    fetchData,
  }: {
    fetchData: () => void;
  }): ReactNode => (
    <button onClick={fetchData}>Fetch Weather</button>
  ),
}));

vi.mock("./pages/Profile/Profile", () => ({
  default: (): ReactNode => <div>Profile Page</div>,
}));

const renderApp = () =>
  render(
    <ChakraProvider>
      <App />
    </ChakraProvider>
  );

const createMockFetch = (): typeof fetch => {
  return vi.fn(async () => {
    return new Response(JSON.stringify(WeatherMock), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as unknown as typeof fetch;
};

beforeEach(() => {
  globalThis.fetch = createMockFetch();
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("App", () => {
  test("renders landing screen initially", () => {
    renderApp();

    expect(
      screen.getByText(/explore forecasts/i)
    ).toBeInTheDocument();
  });

  test("enters app when clicking Explore Forecasts", async () => {
    renderApp();

    await userEvent.click(
      screen.getByText(/explore forecasts/i)
    );

    expect(
      await screen.findByText(/fetch weather/i)
    ).toBeInTheDocument();
  });

  test("shows helper text before selecting a city", async () => {
    renderApp();

    await userEvent.click(
      screen.getByText(/explore forecasts/i)
    );

    expect(
      screen.getByText(/to view the weather/i)
    ).toBeInTheDocument();
  });

  test("fetches and displays weather data from WeatherMock", async () => {
    renderApp();

    await userEvent.click(
      screen.getByText(/explore forecasts/i)
    );

    await userEvent.click(screen.getByText(/select dublin/i));
    await userEvent.click(screen.getByText(/fetch weather/i));

    expect(await screen.findByText("Dublin")).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();
    expect(
      screen.getByText(/partly cloudy/i)
    ).toBeInTheDocument();
  });

  test("shows weather title after fetching data", async () => {
    renderApp();

    await userEvent.click(screen.getByText(/explore forecasts/i));
    await userEvent.click(screen.getByText(/select dublin/i));
    await userEvent.click(screen.getByText(/fetch weather/i));

    expect(
      await screen.findByText(/weather in dublin/i)
    ).toBeInTheDocument();
  });

  test("hides helper text after selecting a city", async () => {
    renderApp();

    await userEvent.click(screen.getByText(/explore forecasts/i));

    expect(
      screen.getByText(/to view the weather/i)
    ).toBeInTheDocument();

    await userEvent.click(screen.getByText(/select dublin/i));
    await userEvent.click(screen.getByText(/fetch weather/i));

    expect(
      screen.queryByText(/to view the weather/i)
    ).not.toBeInTheDocument();
  });

  test("does not fetch if no city is selected", async () => {
    const fetchMock = createMockFetch();
    globalThis.fetch = fetchMock;

    renderApp();

    await userEvent.click(screen.getByText(/explore forecasts/i));

    await userEvent.click(screen.getByText(/fetch weather/i));

    expect(fetchMock).not.toHaveBeenCalled();
  });
});