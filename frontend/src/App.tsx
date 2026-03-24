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

const WeatherDashboardCard = lazy(
  () => import("./components/WeatherDashboardCard/WeatherDashboardCard"),
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

  const cities = ["Dublin", "Sydney", "Toronto"];

  const helperText = useBreakpointValue({
    base: "To view the weather, select a city from the dropdown above",
    md: "To view the weather, choose a city from the dropdown on the left",
  });

  const fetchData = async () => {
    if (!city) return;

    setSelectedCity(city);
    setPage("dashboard");

    if (cache[city]) {
      setData(cache[city]);
      return;
    }

    setLoading(true);

    try {
      // to connect the backend locally, use:
      // const res = await fetch(`http://localhost:5168/api/weather/${city}`);
      const res = await fetch(`https://mycityweatherapp.onrender.com/api/weather/${city}`);
      const result: WeatherResponse = await res.json();

      cache[city] = result;
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!entered) {
    return (
      <Box {...styles.fullScreenCenter} {...styles.backgroundImage}>
        <Box {...styles.darkOverlayStrong} />

        <VStack spacing={6} {...styles.centerStack}>
          <Heading {...styles.landingHeading}>
            City Weather App
          </Heading>

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
          <SpinLoader/>
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
                  <Text color="gray.300">
                    Loading weather for {selectedCity}...
                  </Text>
                )}

                {data && !loading && (
                  <VStack spacing={4} align="flex-start">
                    <Text {...styles.weatherTitle}>
                      Weather in {selectedCity}
                    </Text>

                    <WeatherDashboardCard
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
    bgGradient: "linear(to-r, blue.700, cyan.600)",
    color: "white",
    _hover: { transform: "scale(1.05)" },
    transition: "all 0.3s ease",
  },
};