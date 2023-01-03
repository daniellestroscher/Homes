export default {
  colors: {
    text: '#343a40',
    background: '#fff',
    accent: '#3a5a40',
    grey: '#B4B9BC',
    lightGrey: '#f2f2f2',
    modes: {
      dark: {
        text: '#fff',
        background: '#000',
        accent: '#0cf',
      }
    }
  },
  fonts: {
    body: "Comic Sans MS",
  },
  fontWeights: {

  },
  space: {

  },
  styles: {

  },
  buttons: {
    primary: {
      padding: '10px',
      background: 'transparent',
      border: '1px solid black',
      width: '80px',
      cursor: 'pointer',
    }
  },
  cards: {
    primary: {
      padding: '1rem',
      margin: '6px',
      borderRadius: '6px',
      background: 'grey',
      border: '1px solid green',
      height: '125px',
      width: '275px',
      minWidth: '225px',
    },
    communityCard: {
      padding: '1rem',
      borderRadius: '6px',
      background: 'accent',
      color: 'white',
      height: '150px',
      width: '455px',
      minWidth: '300px',
    }
  },
  components: {
    menu: {
      position: 'fixed',
      height: '100vh',
      top: '58px',
      bottom: '0px',
      left: '0px',
      width: '155px',
      margin: '8px 4px',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid green',
      backgroundColor: 'lightGrey',
      li: {
        fontSize: '13px',
        margin: '0px',
        alignSelf: 'flex-end'
      }
    },
    listItem: {
      display: 'flex',
      gap: '15px',
      padding: '0px 0px 25px',
      color: 'text',

      li : {
        fontSize: '14px'
      }
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: '500px',

    }
  },
  containers: {
    mainPageCont: {
      display: 'flex',
      position: 'absolute',
      top: '58px',
      height: '100vh',
      width: '100vw',
    },
    singlePageFormCont: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "fixed",
      top: "60px",
      width: "800px",
      height: "100vh",
      backgroundColor: "lightGrey",
    },
    unitList: {
      display: 'grid',
      gridAutoFlow: 'row',
      gridTemplateColumns: 'repeat(auto-fill, 275px)',
      gridTemplateRows: 'repeat(auto-fill, 125px)',
      gap: '10px',
      width: '100vw',
      margin: '8px',
    },
    pictureBox: {
      display: 'flex',
      height: '35px',
      margin: '5px',
      boxShadow: '0 5px 10px -5px rgba(0,0,0,0.5)',
      border: '2px solid white',
      borderRadius: '50%',
      aspectRatio: '1',
      overflow: 'hidden',
      backgroundColor: 'accent',
    }
  }

}