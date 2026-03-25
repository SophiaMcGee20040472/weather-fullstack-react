export const styles = {
  card: {
    p: { base: 2, md: 6 },
    borderRadius: "xl",
    bg: "white",
    gap: { base: 4, md: 5 },
    flexDirection: { base: "column", md: "row" },
    w: "100%",
    maxW: "900px",
    mt: "4px",
    ml: { md: "16px", lg: "14px" },
    boxShadow: "md",
  },

  image: {
    borderRadius: "lg",
    h: { base: "200px", md: "220px" },
    w: { base: "100%", md: "220px" },
    objectFit: "cover",
  },

  tabs: {
    gap: 2,
  },

  tab: {
    flex: 1,
    bg: "yellow.300",
    borderRadius: "full",
    fontSize: "md",
    _hover: {
      bg: "#508899",
      color: "white",
      fontSize: "md",
    },
  },

  activeTab: {
    flex: 1,
    bg: "#F2A72B",
    borderRadius: "full",
    color: "white",
    fontSize: "md",
    _hover: {
      bg: "#508899",
    },
  },

  heading: {
    fontSize: { base: "md", md: "lg" },
    color: "#3B768B",
  },

  subheading: {
    fontSize: "sm",
    color: "gray.500",
  },

  infoCard: {
    px: 2,
    py: 1.5,
    borderRadius: "md",
    bg: "gray.50",
    border: "1px solid",
    borderColor: "gray.100",
  },

  label: {
    fontSize: { base: "xs", md: "sm" },
    fontWeight: "medium",
    color: "gray.600",
  },

  value: {
    fontSize: { base: "sm", md: "md" },
    fontWeight: "semibold",
    color: "blue.700",
  },

  timeRow: {
    p: 2,
    borderRadius: "md",
    bg: "gray.50",
    border: "1px solid",
    borderColor: "gray.100",
    justifyContent: "flex-start",
    gap: 6,
  },
  logo: {
    boxSize: "44px",
    borderRadius: "full",
  },
};
