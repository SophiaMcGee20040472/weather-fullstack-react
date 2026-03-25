import { useState, useMemo, memo } from "react";
import type { ReactNode } from "react";
import {
  Box,
  Text,
  Heading,
  HStack,
  Button,
  Image,
  Flex,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import {
  WiThermometer,
  WiCloud,
  WiHumidity,
  WiStrongWind,
  WiSunrise,
  WiSunset,
  WiTime3,
} from "react-icons/wi";
import { styles } from "../../styles/styles";
import { MdDateRange } from "react-icons/md";

import type { WeatherResponse } from "../../types/weather";

type Props = {
  data: WeatherResponse;
  image: string;
};

type TabType = "weather" | "time" | "astro";

type InfoCardProps = {
  icon: ReactNode;
  label: string;
  value: string;
  color: string;
};

function WeatherDashboardCard({ data, image }: Props) {
  const [tab, setTab] = useState<TabType>("weather");

  const { formattedDate, formattedTime } = useMemo(() => {
    const localTime = new Date(data.timezone.location.localtime);

    return {
      formattedDate: localTime.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      }),
      formattedTime: localTime.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  }, [data.timezone.location.localtime]);

  const tabs: readonly TabType[] = ["weather", "time", "astro"];

  return (
    <Flex sx={styles.card}>
      <Image
        src={image}
        alt={`Weather in ${data.weather.location.name}`}
        sx={styles.image}
      />

      <VStack align="stretch" spacing={3} flex="1">
        <HStack sx={styles.tabs}>
          {tabs.map((t) => (
            <Button
              key={t}
              sx={tab === t ? styles.activeTab : styles.tab}
              onClick={() => setTab(t)}
              transition="0.2s ease"
            >
              {t === "weather"
                ? "Weather"
                : t === "time"
                ? "Timezone"
                : "Astronomy"}
            </Button>
          ))}
        </HStack>
        <HStack align="baseline" spacing={2}>
          <Heading sx={styles.heading}>
            {data.weather.location.name}
          </Heading>
          <Text sx={styles.subheading}>- Weather Conditions</Text>
        </HStack>
        <Box minH="120px">
          <Box hidden={tab !== "weather"}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
              <InfoCard
                icon={<WiThermometer />}
                label="Temp"
                value={`${data.weather.current.temp_c}°C`}
                color="orange.400"
              />
              <InfoCard
                icon={<WiCloud />}
                label="Condition"
                value={data.weather.current.condition.text}
                color="gray.500"
              />
              <InfoCard
                icon={<WiHumidity />}
                label="Humidity"
                value={`${data.weather.current.humidity}%`}
                color="blue.400"
              />
              <InfoCard
                icon={<WiStrongWind />}
                label="Wind"
                value={`${data.weather.current.wind_kph} kph`}
                color="cyan.500"
              />
            </SimpleGrid>
          </Box>
          <Box hidden={tab !== "time"}>
            <HStack sx={styles.timeRow}>
              <HStack spacing={2}>
                <Box
                  fontSize={{ base: "18px", md: "20px" }}
                  color="green.500"
                >
                  <MdDateRange />
                </Box>
                <Text sx={styles.value}>{formattedDate}</Text>
              </HStack>

              <HStack spacing={2}>
                <Box
                  fontSize={{ base: "12px", md: "20px" }}
                  color="blue.500"
                >
                  <WiTime3 />
                </Box>
                <Text sx={styles.value}>{formattedTime}</Text>
              </HStack>
            </HStack>
          </Box>
          <Box hidden={tab !== "astro"}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
              <InfoCard
                icon={<WiSunrise />}
                label="Sunrise"
                value={data.astronomy.astronomy.astro.sunrise}
                color="orange.300"
              />
              <InfoCard
                icon={<WiSunset />}
                label="Sunset"
                value={data.astronomy.astronomy.astro.sunset}
                color="purple.400"
              />
            </SimpleGrid>
          </Box>
        </Box>
      </VStack>
    </Flex>
  );
}

const InfoCard = ({ icon, label, value, color }: InfoCardProps) => (
  <HStack sx={styles.infoCard} justify="space-between" align="center">
    <HStack spacing={2.5}>
      <Box fontSize={{ base: "18px", md: "30px" }} color={color}>
        {icon}
      </Box>
      <Text sx={styles.label}>{label}</Text>
    </HStack>
    <Text sx={styles.value}>{value}</Text>
  </HStack>
);

export default memo(WeatherDashboardCard);