import React from 'react';
import {Box, Button, Dialog, makeStyles, useMediaQuery} from "@material-ui/core";
import Modal from "./Modal";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    background: "linear-gradient(255.35deg, #DC3131 0.83%, rgba(255, 79, 79, 0) 108.93%), #FF5E56",
    boxShadow: "0px -0.11px 16.9495px rgba(183, 187, 225, 0.33)",
    height: "100vh",
  },
  wrapper__openModal: {
    background: "#BEC5CC"
  },
  wrapper__button: {
    marginTop: "45vh",
    border: "1px solid #FFFFFF",
    borderRadius: "6px",
    color: "white",
    textTransform: "none",
    padding: "16px 32px",
    fontSize: "16px",
    fontWeight: "600",
    "&:hover": {
      background: "#FFFFFF",
      color: "black",
    }
  },
  dialog: {
    "& .MuiPaper-rounded":{
      borderRadius: "30px",
      maxWidth: "552px",
      [theme.breakpoints.down(1024)]: {
        maxWidth: "453px",
      },
      [theme.breakpoints.down(450)]: {
        width: "100%",
        borderRadius: "0",
        margin: "0"
      }
    }
  },
}));

const Popup = () => {
  const [modal, setModal] = React.useState(false)
  const classes = useStyles();
  const mobile = useMediaQuery('(max-width:450px)');
  return (
    <>
      <Box className={[classes.wrapper, modal && classes.wrapper__openModal]}>
        <Button
          className={classes.wrapper__button}
          onClick={() => setModal(!modal)}
        >
          Налоговый вычет
        </Button>
      </Box>
      <Dialog
        open={modal}
        className={classes.dialog}
        onClose={()=> setModal(!modal)}
        fullWidth={mobile}
        fullScreen={mobile}
      >
        <Modal setModal={setModal}/>
      </Dialog>
    </>
  );
};

export default Popup;