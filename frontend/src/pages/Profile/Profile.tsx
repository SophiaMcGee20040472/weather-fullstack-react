import {
  Box,
  Text,
  Image,
  HStack,
  VStack,
  List,
  ListItem,
  Icon,
  Heading,
  Badge,
} from "@chakra-ui/react";
import type { StackProps } from "@chakra-ui/react";
import { FaUser, FaCamera } from "react-icons/fa";
import { MdNightlife } from "react-icons/md";
import { GiWashingMachine } from "react-icons/gi";

const layoutStyles: StackProps = {
  spacing: { base: 4, md: 6 },
  align: "start",
  direction: { base: "column", md: "row" },
};

const Profile = () => {
  const userImage = "./images/user.webp";

  return (
    <Box {...styles.container}>
      <HStack {...layoutStyles}>
        <Box {...styles.imageWrapper}>
          <Image src={userImage} alt="Profile" {...styles.profileImage} />
          <Badge {...styles.badge}>Explorer</Badge>
        </Box>

        <VStack {...styles.rightColumn}>
          <Box {...styles.headerBox}>
            <Heading {...styles.heading}>User Profile</Heading>
          </Box>

          <Box {...styles.infoBox}>
            <HStack {...styles.infoHeader}>
              <Icon as={FaUser} {...styles.icon} />
              <Text {...styles.label}>Username</Text>
            </HStack>
            <Text {...styles.value}>Oatie Otter</Text>
          </Box>

          <Box {...styles.listBox}>
            <Text {...styles.listTitle}>Top City Search Reasons</Text>

            <List {...styles.list}>
              <ListItem>
                <HStack {...styles.listItemRow}>
                  <Icon as={MdNightlife} {...styles.listIcon} />
                  <Text {...styles.listText}>Nights Out</Text>
                </HStack>
              </ListItem>

              <ListItem>
                <HStack {...styles.listItemRow}>
                  <Icon as={GiWashingMachine} {...styles.listIcon} />
                  <Text {...styles.listText}>Hanging Out Washing</Text>
                </HStack>
              </ListItem>

              <ListItem>
                <HStack {...styles.listItemRow}>
                  <Icon as={FaCamera} {...styles.listIcon} />
                  <Text {...styles.listText}>Photography</Text>
                </HStack>
              </ListItem>
            </List>
          </Box>
        </VStack>
      </HStack>
    </Box>
  );
};
const styles = {
  container: {
    p: { base: 3, md: 4 },
    maxW: "900px",
    mx: "auto",
    mt: { base: 0,md: "120px", lg: "120px" },
    bg: "white",
    borderRadius: "xl",
    boxShadow: "md",
  },

  imageWrapper: {
    position: "relative",
  },

  profileImage: {
    borderRadius: "lg",
    objectFit: "cover",
    w: { base: "120px", sm: "160px", md: "220px" },
    h: { base: "205px", sm: "220px", md: "260px" },
  },

  badge: {
    position: "absolute",
    bottom: "6px",
    left: "6px",
    bg: "yellow.400",
    color: "black",
    px: 2,
    py: 0.5,
    borderRadius: "full",
    fontSize: { base: "2xs", md: "xs" },
  },

  rightColumn: {
    spacing: { base: 3, md: 4 },
    align: "stretch",
    flex: "1",
  },

  headerBox: {
    textAlign: "left",
  },

  heading: {
    fontSize: { base: "md", sm: "lg", md: "lg" },
    color: "blue.600",
  },

  subText: {
    fontSize: { base: "xs", md: "sm" },
    color: "gray.500",
  },

  infoBox: {
    p: { base: 2, md: 2.5 },
    bg: "#BBDEF2",
    borderRadius: "md",
    border: "1px solid",
    borderColor: "blue.100",
  },

  infoHeader: {
    spacing: 1,
    mb: 0.5,
  },

  icon: {
    boxSize: { base: 3, md: 4 },
    color: "#1C87AB",
  },

  label: {
    fontSize: { base: "2xs", md: "xs" },
    color: "gray.600",
  },

  value: {
    fontSize: { base: "sm", md: "md" },
    fontWeight: "semibold",
    color: "blue.700",
  },

  listBox: {
    p: { base: 2, md: 2.5 },
    bg: "yellow.50",
    borderRadius: "md",
    border: "1px solid",
    borderColor: "yellow.100",
  },

  listTitle: {
    fontSize: { base: "xs", md: "sm" },
    fontWeight: "semibold",
    color: "yellow.700",
    mb: { base: 1.5, md: 2 },
  },

  list: {
    spacing: { base: 1.5, md: 2 },
  },

  listItemRow: {
    spacing: 2,
  },

  listIcon: {
    boxSize: { base: 3.5, md: 4 },
    color: "#1C87AB",
  },

  listText: {
    fontSize: { base: "xs", md: "sm" },
  },
} as const;

export default Profile;
