import { useState, lazy, Suspense } from "react";
import {
  Box,
  Heading,
  VStack,
  Text,
  Flex,
  Button,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import type { ChakraProps } from "@chakra-ui/react";

import type { WeatherResponse } from "./types/weather";
import SpinLoader from "./components/Spinner/SpinLoader";

const DashboardCard = lazy(
  () => import("./components/DashboardCard/DashboardCard"),
);
const Sidebar = lazy(() => import("./components/Sidebar/Sidebar"));
const TopNav = lazy(() => import("./components/TopNav/TopNav"));
const Profile = lazy(() => import("./pages/Profile/Profile"));

export type Page = "dashboard" | "profile";

const cityImages: Record<string, string> = {
  Dublin: "/images/dublin.webp",
  Sydney: "/images/sydney.webp",
  Toronto: "/images/toronto.webp",
};

const cache: Record<string, WeatherResponse> = {};

type Styles = Record<string, ChakraProps>;

function App() {
  const [entered, setEntered] = useState(false);
  const [page, setPage] = useState<Page>("dashboard");
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const cities = ["Dublin", "Sydney", "Toronto"];

  const API_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:5168"
      : "https://mycityweatherapp.onrender.com";

  const helperText = useBreakpointValue({
    base: "To view the weather, select a city from the dropdown above",
    md: "To view the weather, choose a city from the dropdown on the left",
  });

  const fetchData = async () => {
    if (!city) return;

    setSelectedCity(city);
    setPage("dashboard");
    setError(false);

    if (cache[city]) {
      setData(cache[city]);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/weather/${city}`);
      const result = await res.json();

      if (!res.ok || result.error) {
        console.error("API returned error:", result);
        setData(null);
        setError(true);
        return;
      }

      cache[city] = result;
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(true);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  if (!entered) {
    return (
      <Box {...styles.fullScreenCenter} {...styles.backgroundImage}>
        <Box {...styles.darkOverlayStrong} />

        <VStack spacing={6} {...styles.centerStack}>
          <Heading {...styles.landingHeading}>City Weather App</Heading>

          <Text {...styles.landingSubtext}>
            Real-time forecasts for cities around the world
          </Text>

          <Image
            src="https://media1.giphy.com/media/v1.Y2lkPTZjMDliOTUyNGR6Z2E2c2ozcWgyY2Jxa3BhdnZrZHBxdmJraTR0cnp1ZHU5anVoOCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/buItT9l7x6OXMSz1Ez/giphy.gif"
            alt="Rain umbrella"
            {...styles.landingImage}
          />

          <Button
            size="lg"
            {...styles.primaryButton}
            onClick={() => setEntered(true)}
          >
            Explore Forecasts
          </Button>
        </VStack>
      </Box>
    );
  }

  return (
    <Suspense
      fallback={
        <Flex {...styles.fullScreenCenter}>
          <SpinLoader />
        </Flex>
      }
    >
      <Box {...styles.appContainer}>
        <Box {...styles.darkOverlay} />

        <Flex {...styles.mainLayout}>
          <TopNav
            city={city}
            setCity={setCity}
            fetchData={fetchData}
            isDisabled={!city}
            cities={cities}
            setPage={setPage}
            page={page}
          />

          <Sidebar
            city={city}
            setCity={setCity}
            fetchData={fetchData}
            isDisabled={!city}
            cities={cities}
            setPage={setPage}
            page={page}
          />

          <Box {...styles.contentArea}>
            {page === "dashboard" && (
              <VStack spacing={8} align="stretch">
                <Heading {...styles.dashboardHeading}>
                  City Weather Dashboard
                </Heading>

                {!selectedCity && (
                  <VStack spacing={4} align="flex-start">
                    <Text {...styles.helperText}>{helperText}</Text>

                    <Image
                      src="/images/umbrella.png"
                      alt="Rain"
                      {...styles.placeholderImage}
                    />
                  </VStack>
                )}

                {loading && (
                  <Flex justify="center" align="center" minH="200px">
                    <SpinLoader />
                  </Flex>
                )}

                {error && !loading && !data && (
                  <Text color="pink.100" ml='16px'>
                    Unable to fetch weather data. API limit may be reached.
                  </Text>
                )}

                {error && data && (
                  <Text color="yellow.300">
                    Showing saved data (API limit reached)
                  </Text>
                )}

                {data && !loading && (
                  <VStack spacing={4} align="flex-start">
                    <Text {...styles.weatherTitle}>
                      Weather in {selectedCity}
                    </Text>

                    <DashboardCard
                      data={data}
                      image={cityImages[selectedCity]}
                    />
                  </VStack>
                )}
              </VStack>
            )}

            {page === "profile" && <Profile />}
          </Box>
        </Flex>
      </Box>
    </Suspense>
  );
}

export default App;

const styles: Styles = {
  fullScreenCenter: {
    bg: "white",
    h: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

    backgroundImage: {
    bgImage: "url('/images/cloudy.jpg')",
    bgSize: "cover",
    bgPosition: "center",
    position: "relative",
  },

  appContainer: {
    minH: "100vh",
    position: "relative",
    bgImage: "url('/images/cloudy.jpg')",
    bgSize: "cover",
    bgPosition: "center",
  },

  darkOverlay: {
    position: "absolute",
    inset: "0",
    bg: "rgba(0,0,0,0.4)",
  },

  darkOverlayStrong: {
    position: "absolute",
    inset: "0",
    bg: "rgba(0,0,0,0.5)",
  },

  mainLayout: {
    position: "relative",
    minH: "100vh",
    flexDirection: { base: "column", md: "row" },
  },

  contentArea: {
    flex: "1",
    ml: { md: "260px" },
    p: 6,
  },

  dashboardHeading: {
    mt: { base: "0", md: "20px" },
    fontSize: { base: "26px", md: "40px" },
    color: "white",
    ml: { md: "16px", lg: "14px" },
  },

  helperText: {
    color: "white",
    fontSize: "lg",
    ml: { md: "20px" },
    mt: { md: "12px" },
    mb: { md: "24px" },
  },

  weatherTitle: {
    color: "white",
    fontSize: "lg",
    fontWeight: "semibold",
    ml: { md: "16px" },
    mt: { base: "-10px", md: "-10px" },
  },

  placeholderImage: {
    w: "100%",
    maxW: "500px",
    maxH: "400px",
    objectFit: "contain",
  },

  centerStack: {
    p: 12,
    position: "relative",
    zIndex: 1,
    textAlign: "center",
  },

  landingHeading: {
    fontSize: { base: "3xl", md: "4xl" },
    bgGradient: "linear(to-r, white)",
    bgClip: "text",
    fontWeight: "extrabold",
  },
  
  landingSubtext: {
    color: "white",
    fontSize: "md",
  },

  landingImage: {
    maxW: "200px",
    objectFit: "contain",
    filter: "drop-shadow(0 0 20px rgba(0,0,0,0.8))",
    animation: "float 4s ease-in-out infinite",
  },

  primaryButton: {
    px: 8,
    bgGradient: "linear(to-r, '#4A6E7A', 'blue.500')",
    color: "#2C5D71",
    _hover: { transform: "scale(1.05)" },
    transition: "all 0.3s ease",
  },
};
