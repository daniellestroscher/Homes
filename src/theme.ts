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

    }

  },
  cards: {
    primary: {
      padding: '1rem',
      margin: '1rem',
      borderRadius: '12px',
      background: 'grey',
      border: '1px solid green',
      height: '125px',
      maxWidth: '300px',
    }
  },
  components: {
    menuOpen: {
      position: 'fixed',
      height: '100vh',
      top: '58px',
      bottom: '0px',
      left: '0px',
      width: '155px',
      margin: '3px',
      padding: '8px',
      borderRadius: '4px',
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
      fontSize: '15px'
    },
    menuClose: {
      position: 'fixed',
      height: '100vh',
      top: '58px',
      bottom: '0px',
      left: '0px',
      width: '35px',
      margin: '3px',
      padding: '8px',
      borderRadius: '4px',
      backgroundColor: 'lightGrey',
      li: {
        display: 'none'
      }
    }
  },
  containers: {
    unitListCont: {
      display: 'flex',
      position: 'absolute',
      top: '58px',
      margin: '3px',
      height: '100vh',
      width: '100vw',
      border: '1px solid blue',
    },
    unitList: {
      display: 'grid',
      //gridTemplateColumns: 'auto auto auto',
      gridTemplateColumns: 'repeat(4, minmax(35%, auto))',
      gridTemplateRows: '150px',
      //justifyContent: 'space-evenly',
      gap: '5px',
      //width: '100vw',
      backgroundColor: 'purple',
    }
  }

}