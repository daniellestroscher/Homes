export default {
  colors: {
    background: "white",
    darkGrey: "#343a40",
    lightGrey: "#f0f0f0",
    accent: "#3a5a40",
    accentLight: "#839788",
    accentLighter: "#CDD5CF",
    accentLightest: "#F0F2F0",
    accentDark: "#1D480A",
    champagne: "#EEE0CB",
    modes: {
      dark: {
        text: "#fff",
        background: "#000",
        accent: "#0cf",
      },
    },
  },
  fonts: {
    body: "Work Sans, sans-serif",
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  fontWeights: {
    body: 300,
    heading: 400,
    bold: 600,
  },
  space: {},
  styles: {
    root: {
      fontFamily: "body",
      fontWeight: "body",
    },
  },
  buttons: {
    primary: {
      padding: "8px",
      background: "transparent",
      border: "1px solid black",
      borderRadius: "3px",
      width: "80px",
      cursor: "pointer",
      boxShadow: "2px 2px 2px grey",
      "&:hover": {
        color: "black",
      },
      "&:active": {
        color: "black",
        boxShadow: "none",
      },
    },
    secondary: {
      padding: "10px",
      background: "accentLight",
      color: "white",
      border: "none",
      borderRadius: "3px",
      margin: "5px",
      "&:hover": {
        bg: "accent",
      },
    },
  },
  cards: {
    primary: {
      padding: "1rem",
      margin: "6px",
      borderRadius: "3px",
      border: "1px solid gray",
      backgroundColor: "background",
      height: "125px",
      width: "275px",
      minWidth: "225px",
      boxShadow: "2px 2px 2px grey",
      "&:hover": {
        bg: "accentLight",
        transform: "scale(1.02)",
        color: "white",
        opacity: "0.75",
        fontWeight: "bold",
      },
    },
    communityCard: {
      padding: "1rem",
      borderRadius: "6px",
      background: "accent",
      color: "white",
      minHeight: "200px",
      width: "455px",
      minWidth: "300px",
      alignSelf: "flex-start",
      justifyContent: "flex-end",
      "&:hover": {
        bg: "text",
        opacity: "0.90",
      },
    },
  },
  components: {
    menu: {
      position: "fixed",
      height: "100vh",
      top: "70px",
      bottom: "0px",
      left: "0px",
      width: "160px",
      margin: "8px 4px",
      padding: "4px",
      borderRadius: "4px",
      backgroundColor: "lightGrey",
      li: {
        fontSize: "14px",
        margin: "0px",
        alignSelf: "flex-end",
      },
    },
    listItem: {
      display: "flex",
      gap: "15px",
      padding: "12px",
      color: "text",
      borderRadius: "6px",
      margin: "30px 0px",
      li: {
        fontSize: "14px",
      },
      "&:hover": {
        backgroundColor: "accentLight",
        color: "white",
      },
    },
    form: {
      display: "flex",
      flexDirection: "column",
      width: "500px",
      input: {
        padding: "10px",
        margin: "8px",
      },
      button: {
        variant: "buttons.primary",
        margin: "8px",
        width: "485px",
      },
    },
    popup: {
      display: "flex",
      flexDirection: "column",
      position: "fixed",
      bg: "accentLight",
      margin: "auto",
      top: "100px",
      left: "0px",
      right: "0px",
      borderRadius: "6px",
      zIndex: "1",
      overflow: "hidden",
      maxWidth: "700px",
      minHeight: "400px",
      padding: "10px 10px 40px",
    },
    message: {
      display: "flex",
      justifyContent: "center",
      position: "fixed",
      color: "accentLight",
      margin: "auto",
      top: "130px",
      left: "0px",
      right: "0px",
      zIndex: "1",
    },
    increaseSticker: {
      backgroundColor: "accentLighter",
      borderRadius: "3px",
      padding: "7px",
      color: "accent",
    },
  },
  containers: {
    mainPageCont: {
      display: "flex",
      position: "absolute",
      height: "100vh",
      width: "100vw",
      top: "80px",
    },
    singlePageFormCont: {
      display: "flex",
      position: "fixed",
      top: "60px",
      flexDirection: "column",
      alignItems: "center",
      width: "800px",
      height: "93vh",
      backgroundColor: "lightGrey",
      scroll: "none",
    },
    unitList: {
      display: "grid",
      gridAutoFlow: "row",
      gridTemplateColumns: "repeat(auto-fill, 275px)",
      gridTemplateRows: "repeat(auto-fill, 125px)",
      gap: "15px",
      width: "100vw",
      margin: "8px",
    },
    communityList: {
      display: "flex",
      alignContent: "center",
      flexDirection: "column",
      gap: "10px",
      height: "550px",
      padding: "10px 22px",
      overflowY: "scroll",
      overflowX: "hidden",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
    pictureBox: {
      display: "flex",
      height: "35px",
      margin: "5px",
      boxShadow: "0 5px 10px -5px rgba(0,0,0,0.5)",
      border: "2px solid white",
      borderRadius: "50%",
      aspectRatio: "1",
      overflow: "hidden",
      backgroundColor: "accent",
    },
    visuallyHidden: {
      clip: "rect(0 0 0 0)",
      clipPath: "inset(50%)",
      height: "1px",
      overflow: "hidden",
      position: "absolute",
      whiteSpace: "nowrap",
      width: "1px",
    },
    increasesBox: {
      border: '3px solid gray',
      borderRadius: '6px',
      backgroundColor: 'accentLightest',

      margin: '15px',
      padding: '5px',
      paddingBottom: '8px',
      display: 'flex',
      gap: '10px',
      flexDirection: 'column',

    }
  },
};
