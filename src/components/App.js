import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
  Divider,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paperContainer: {
    padding: '15px'
  },
  divider: {
    marginTop: '5px',
    marginBottom: '15px'
  },
  subtitle: {
    color: theme.palette.text.secondary
  },
  datePicker: {
    width: '100%',
    marginBottom: '7px'
  },
  colorDisplayer: {
    width: '100%',
    height: '200px'
  },
  colorHexLabel: {
    width: '100%',
    marginTop: '7px'
  }
}));

function hexFromDate(date) {
  const [year, month, day] = date.split('-');

  let red = Math.floor(day / 31 * 255);
  let green = Math.floor(month / 12 * 255);
  let blue = Math.floor((year - 1940) / (2030 - 1900) * 255);

  const result = '#' +
  red.toString(16).padStart(2, '0') +
  green.toString(16).padStart(2, '0') +
  blue.toString(16).padStart(2, '0');

  return result;
}

function App() {
  const classes = useStyles();

  let [birthday, setBirthday] = useState('2000-08-15');
  let [colorHex, setColorHex] = useState('#ABCDEF');

  const changeDate = e => {
    setBirthday(e.target.value);
  }

  useEffect(() => {
    const newHex = hexFromDate(birthday);
    console.log("[Info] New Hex: " + newHex);
    setColorHex(newHex);
  }, [birthday, colorHex])

  return (
    <div className={classes.root}>
      <Paper className={classes.paperContainer}>
        <Typography variant="h3">Birthday Colors</Typography>
        <Typography
          variant="subtitle1"
          align="right"
          className={classes.subtitle}
        >
          by Vazonik
        </Typography>
        <Divider className={classes.divider} />
        <TextField
          id="date"
          label="Date of birth"
          type="date"
          defaultValue={birthday}
          className={classes.datePicker}
          InputLabelProps={{
            shrink: true
          }}
          onChange={changeDate}
        />
        <Paper
          className={classes.colorDisplayer}
          style={{backgroundColor: colorHex}}
        ></Paper>
        <TextField
          className={classes.colorHexLabel}
          disabled={true}
          id="hex-label"
          value={colorHex}
        />
      </Paper>
    </div>
  );
}

export default App;