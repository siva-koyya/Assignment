import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Scrollbar: {
      baseStyle: {
        width: "5px", // Adjust the width of the scrollbar
        borderRadius: "sm", // Adjust the border radius of the scrollbar track
        backgroundColor: "green.200", // Adjust the background color of the scrollbar track
      },
      thumb: {
        bg: "green.500", // Adjust the background color of the scrollbar thumb
        borderRadius: "full", // Adjust the border radius of the scrollbar thumb
      },
    },
  },
});

export default theme;







