import {
  Box,
  VStack,
  Text,
  Flex,
  Select,
  Button,
  Image,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import { FaHome, FaUserCircle } from "react-icons/fa";

type Page = "dashboard" | "profile";

type SidebarProps = {
  city: string;
  setCity: (city: string) => void;
  fetchData: () => void;
  isDisabled: boolean;
  cities: string[];
  setPage: (page: Page) => void;
  page: Page;
};

const Sidebar = ({
  city,
  setCity,
  fetchData,
  isDisabled,
  cities,
  setPage,
  page,
}: SidebarProps) => {
  const { onClose } = useDisclosure();

  const menuItemStyle = (active: boolean) => ({
    cursor: "pointer",
    px: 4,
    py: 3,
    borderRadius: "md",
    bg: active ? "#F2A72B" : "#E2E8F0",
    _hover: { bg: "#F2A72B" },
    w: "100%",
    transition: "0.2s",
  });

  const handleNavClick = (target: Page) => {
    setPage(target);
    onClose();
  };

  const handleSearch = () => {
    fetchData();
    onClose();
  };

  return (
    <Box
      display={{ base: "none", md: "flex" }}
      flexDirection="column"
      w="260px"
      h="100vh"
      bg="#508899"
      color="#1A202C"
      fontWeight="bold"
      p={6}
      position="fixed"
      left={0}
      top={0}
    >
      <VStack align="start" spacing={8} w="100%" mt="26px">
        <Flex align="center" gap={3}>
          <Image
            src="/images/logo.webp"
            loading="lazy"
            alt="Logo"
            boxSize="50px"
            borderRadius="full"
          />
          <Text fontWeight="bold" fontSize="lg" color="white">
            City Weather App
          </Text>
        </Flex>
        <VStack align="start" spacing={5} w="100%" mt="16px">
          <Flex
            align="center"
            gap={4}
            {...menuItemStyle(page === "dashboard")}
            onClick={() => handleNavClick("dashboard")}
          >
            <FaHome size={18} />
            <Text>Home</Text>
          </Flex>

          <Flex
            align="center"
            gap={4}
            {...menuItemStyle(page === "profile")}
            onClick={() => handleNavClick("profile")}
          >
            <FaUserCircle size={18} />
            <Text>Profile</Text>
          </Flex>
        </VStack>

        <Divider borderColor="whiteAlpha.400" />

        <VStack align="start" spacing={4} w="100%">
          <Select
            placeholder="Select city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            bg="white"
            color="black"
            border="3px solid #FDB933"
            _hover={{ bg: "gray.100" }}
          >
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>

          <Button
            w="100%"
            onClick={handleSearch}
            isDisabled={isDisabled}
            bg="#FDB933"
            _hover={{ bg: "#f2a72b" }}
          >
            Get Weather
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Sidebar;