import React from 'react';
import {
  Box,
  Button,
  TextField,
  InputLabel,
  makeStyles,
  Typography,
  Input,
  SvgIcon,
  useMediaQuery
} from "@material-ui/core";
import {ReactComponent as  CLose} from "../Icons/Vector.svg"
import CalculateDropdown from "./CalculateDropdown";

const useStyles = makeStyles((theme) => ({
  modal: {
    padding: "32px",
    background: "#FFFFFF",
    position: "relative",
    [theme.breakpoints.down(450)]: {
      padding: "16px",
    }
  },
  modal__designation:{
    fontSize: "28px",
    [theme.breakpoints.down(450)]: {
      fontSize: "18px",
    }
  },
  modal__description:{
    fontSize: "14px",
    color: "#808080",
    maxWidth: "488px",
    marginTop: "16px",
    [theme.breakpoints.down(450)]: {
      fontSize: "12px",
    }
  },
  modal__input_wrapper: {
    display: "flex",
    flexDirection: "column",
    fontSize: "14px",
    fontWeight: "600",
    color: "black",
    marginTop: "24px",
  },
  modal__input: {
    borderRadius: "3px",
    margin: "10px 0",
    "& .MuiInputBase-input": {
      border: "1px solid #DFE3E6",
      padding: "8px 10px",
      fontSize: "14px",
      height: "24px",

    },
    "& .MuiInputBase-input:hover": {
      border: "1px solid #000000",
      borderRadius: "3px",
    },
    "& .MuiInputBase-input::-webkit-outer-spin-button, .MuiInputBase-input::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: "0"
    }
  },
  modal__input_error: {
    "& .MuiInputBase-input": {
      border: "1px solid #EA0029",
      borderRadius: "3px",
    },
    "& .MuiInputBase-input:hover": {
      border: "1px solid #EA0029",
      borderRadius: "3px",
    },
  },
  modal__calculate: {
    fontSize: "14px",
    color: "#EA0029",
    fontWeight: "600",
    textTransform: "none",
    padding: "0",
    "&:hover": {
      color: "#F53A31",
    }
  },
  modal__payment_term: {
    display: "flex",
    flexDirection: "row",
    margin: "24px 0 40px 0",
    alignItems: "center",
    [theme.breakpoints.down(450)]: {
      flexDirection: "column",
      alignItems: "flex-start"
    }
  },
  modal__payment_term_text: {
    fontWeight: "600",
    fontSize: "14px",
    marginRight: "24px"
  },
  modal__payment_term_button: {
    fontSize: "14px",
    textTransform: "none",
    borderRadius: "50px",
    padding: "6px 12px",
    fontWeight: "500",
    margin: "0 8px",
    [theme.breakpoints.down(450)]: {
      display: "inline-block",
      margin: "24px 8px 0 0",
    }
  },
  disabled: {
    background: "#EEF0F2"
  },
  active: {
    color: "white",
    background: "linear-gradient(255.35deg, #DC3131 0.83%, rgba(255, 79, 79, 0) 108.93%), #FF5E56",
  },
  modal__add_button: {
    width: "100%",
    color: "white",
    background: "linear-gradient(255.35deg, #DC3131 0.83%, rgba(255, 79, 79, 0) 108.93%), #FF5E56",
    boxShadow: "0px 0px 24px rgba(234, 0, 41, 0.33)",
    borderRadius: "6px",
    "&:hover": {
      background: "#EA0029",
    }
  },
  close: {
    position: "absolute",
    top: "27px",
    right: "27px",
    height: "18px",
    width: "18px",
    [theme.breakpoints.down(450)]: {
      top: "22px",
      right: "22px",
    }
  },
  mobile: {
    display: "flex",
    flexDirection: "row"
  }
}))

const Modal = ({setModal}) => {
  const [calc, setCalc] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState("");
  const classes = useStyles();
  const mobile = useMediaQuery('(max-width:450px)');
  const handleCalc = (value) => {
    if(+value >= 12792) {
      setCalc(!calc);
    }else{
      setError("Поле должно быть заполнено! Минимальная сумма 12 792 рубля")
    }
  }
  return (
    <Box className={classes.modal}>
      <Box className={classes.close}  onClick={() => setModal(false)}>
        <SvgIcon>
          <CLose/>
        </SvgIcon>
      </Box>
      <Typography className={classes.modal__designation}>Налоговый вычет</Typography>
      <Typography className={classes.modal__description}>
        Используйте налоговый вычет чтобы погасить ипотеку досрочно.
        Размер налогового вычета составляет не более 13% от своего официального годового дохода.
      </Typography>
      <InputLabel className={classes.modal__input_wrapper}>
        Ваша зарплата в месяц
        <Input
          className={[classes.modal__input, error.length > 0 && classes.modal__input_error]}
          disableUnderline
          placeholder="Введите данные"
          value={value}
          type="number"
          onChange={(event) => {
            setValue(event.target.value);
            setError("");
            setCalc(false);
          }}
        />
        <Box style={{color: "#EA0029", fontSize: "12px"}}>{error.length > 0 && error}</Box>
      </InputLabel>
      <Button className={classes.modal__calculate} onClick={() => handleCalc(value)}>Рассчитать</Button>
      {calc && <CalculateDropdown value={value}/>}
      <Box className={classes.modal__payment_term}>
        <Typography className={classes.modal__payment_term_text}>Что уменьшаем?</Typography>
        {!mobile && <>
          <Button className={[classes.modal__payment_term_button, classes.active]}>Платеж</Button>
          <Button className={[classes.modal__payment_term_button, classes.disabled]}>Срок</Button>
        </>}
        {mobile && <Box className={classes.mobile}>
            <Button className={[classes.modal__payment_term_button, classes.active]}>Платеж</Button>
            <Button className={[classes.modal__payment_term_button, classes.disabled]}>Срок</Button>
          </Box> }
      </Box>
      <Button className={classes.modal__add_button}>Добавить</Button>
    </Box>
  );
};

export default Modal;