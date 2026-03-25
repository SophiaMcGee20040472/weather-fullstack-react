import {
  Box,
  VStack,
  Text,
  Flex,
  Select,
  Button,
  Image,
  HStack,
} from "@chakra-ui/react";
import { FaHome, FaUserCircle } from "react-icons/fa";

type Page = "dashboard" | "profile";

type TopNavProps = {
  city: string;
  setCity: (city: string) => void;
  fetchData: () => void;
  isDisabled: boolean;
  cities: string[];
  setPage: (page: Page) => void;
  page: Page;

  forceVisible?: boolean;
};

const TopNav = ({
  city,
  setCity,
  fetchData,
  cities,
  setPage,
  page,
  forceVisible = false,
}: TopNavProps) => {
  const menuItemStyle = (active: boolean) => ({
    cursor: "pointer",
    px: 3,
    py: 1.5,
    borderRadius: "full",
    bg: active ? "yellow.300" : "#FDB933",
    fontWeight: active ? "semibold" : "medium",
    color: active ? "gray.900" : "gray.700",
    _hover: { bg: active ? "yellow.300" : "gray.100" },
  });

  const iconColor = (active: boolean) =>
    active ? "gray.400" : "gray.500";

  return (
    <Box
      display={forceVisible ? "block" : { base: "block", md: "none" }}
      bg="#a8ccc3"
      px={4}
      py={3}
      position="sticky"
      top={0}
      zIndex={10}
      boxShadow="sm"
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      <VStack spacing={3} align="stretch">
        <Flex align="center" justify="space-between">
          <Image
            src="/images/logo.webp"
            alt="Logo"
            boxSize="50px"
            borderRadius="full"
          />

          <HStack spacing={2}>
            <Flex
              align="center"
              gap={1.5}
              fontSize="sm"
              {...menuItemStyle(page === "dashboard")}
              onClick={() => setPage("dashboard")}
            >
              <FaHome size={14} color={iconColor(page === "dashboard")} />
              <Text>Home</Text>
            </Flex>

            <Flex
              align="center"
              gap={1.5}
              fontSize="sm"
              {...menuItemStyle(page === "profile")}
              onClick={() => setPage("profile")}
            >
              <FaUserCircle size={14} color={iconColor(page === "profile")} />
              <Text>Profile</Text>
            </Flex>
          </HStack>
        </Flex>

        <HStack spacing={2}>
          <Select
            value={city || ""}
            onChange={(e) => setCity(e.target.value)}
            bg="white"
            border="3px solid #FDB933"
          >
            <option value="" disabled>
              Select city
            </option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>

          <Button
            size="md"
            bg="#FDB933"
            color="gray.900"
            onClick={fetchData}
            isDisabled={!city}
          >
            Go
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default TopNav;