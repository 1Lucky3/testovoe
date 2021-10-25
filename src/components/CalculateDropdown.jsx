import React from 'react';
import {Box, Checkbox, makeStyles, Typography} from "@material-ui/core";
import {ReactComponent as Checked} from "../Icons/mdi_done.svg";
import {ReactComponent as NotChecked} from "../Icons/notChecked.svg";

const useStyles = makeStyles(() => ({
  calc__wrapper: {
    maxHeight: "422px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    margin: "16px 0 20px 0",
    overflow: "scroll"
  },
  calc__description: {
    fontSize: "14px",
    fontWeight: "600",
    margin: "8px 0"
  },
  calc__checkbox_contain: {
    width: "100%"
  },
  calc_label: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  calc__checkbox:{
    margin: "8px 0",
    height: "20px",
    width: "20px",
    padding: "0"
  },
  palka: {
    height: "1px",
    background: "#DFE3E6",
    margin: "9px 0"
  }
}))

const CalculateDropdown = ({value}) => {
  const classes = useStyles();
  const count = 260000;

  function returnEnd (number) {
    const ends = ["-ый", "-ой", "-ий", "-ый", "-ый", "-ой", "-ой", "-ой", "-ый", "-ый", "-ый", "-ый", "-ый", "-ый"];
    return ends[number];
  }
  function returnCheckbox(value, count, checkboxNumber) {
    if(value > count) {
      checkboxNumber[checkboxNumber.length-1] = count
      return checkboxNumber
    }
    return returnCheckbox(value, count-value, [...checkboxNumber, value])
  }

  return (
    <Box className={classes.calc__wrapper}>
      <Typography className={classes.calc__description}>Итого можете внести в качестве досрочных:</Typography>
      {returnCheckbox(value*12*0.13, count, [value*12*0.13]).map((item, index) => {
        return (
          <Box className={classes.calc__checkbox_contain}>
            <label className={classes.calc_label}>
              <Checkbox className={classes.calc__checkbox} checkedIcon={<Checked/>} icon={<NotChecked/>}/>
              <Typography style={{fontSize: "14px", margin: "0 6px 0 11px"}}>{Math.floor(item)} рублей</Typography>
              <Typography
                style={{color: "rgba(128, 128, 128, 1)", fontSize: "14px"}}
              >
                в {index+1}{returnEnd(index)} год
              </Typography>
            </label>
            <Box className={classes.palka}></Box>
          </Box>
        )
      })}
    </Box>
  );
};

export default CalculateDropdown;