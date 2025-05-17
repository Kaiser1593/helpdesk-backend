const Footer = () => {
    return (
      <footer style={styles.footer}>
        <p style={styles.text}>© {new Date().getFullYear()} HelpDesk - Tous droits réservés</p>
      </footer>
    );
  };
  
  const styles = {
    footer: {
      marginTop: 'auto',
      backgroundColor: '#007bff',
      padding: '15px 0',
      textAlign: 'center',
      color: 'white',
      position: 'relative',
      bottom: 0,
      width: '100%',
    },
    text: {
      margin: 0,
      fontSize: '0.9rem',
    },
  };
  
  export default Footer;
  