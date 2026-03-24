import { Image, VStack, Text } from "@chakra-ui/react";

const SpinLoader = () => {
  return (
    <VStack justify="center" align="center" minH="300px" spacing={4}>
      <Text color="blue.500" fontSize="lg">
       Fetching the latest weather data...
      </Text>
      <Image
        src="./images/logo.webp"
        boxSize="230px"
        objectFit="contain"
      />

      <Text color="blue.500" fontSize="lg">
        Loading Weather...
      </Text>
    </VStack>
  );
};

export default SpinLoader;
