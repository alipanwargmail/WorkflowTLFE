import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@mui/material/Paper";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { Stack, Animation } from "@devexpress/dx-react-chart";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import { useEffect } from 'react';
const useStyles = makeStyles((theme) => ({
    root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  chart: {
    flexDirection: "row"
  },
}));

var objects = [
  { material: 'Jasa Raharja', sopen: '3', inprogress: '32', grey: '29' },
  { material: 'Bahana Kapita Investa', sopen: '23', inprogress: '27', grey: '19' },
  { material: 'Bahana Sekuritas', sopen: '14', inprogress: '21', grey: '17' },
  { material: 'IFG Life', sopen: '22', inprogress: '17', grey: '28' },
  { material: 'Jasa Raharja2', sopen: '3', inprogress: '32', grey: '29' },
  { material: 'Bahana Kapita Investa2', sopen: '23', inprogress: '27', grey: '19' },
  { material: 'Bahana Sekuritas2', sopen: '14', inprogress: '21', grey: '17' },
  { material: 'IFG Life2', sopen: '22', inprogress: '17', grey: '28' },
];

export default function TestChart() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = "Test"
  const [chartData, setChartData] = React.useState([]);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  useEffect(() => {
    console.log('enter useEffect')
    for (var i = 0; i < objects.length; i++) {
      var obj = objects[i];
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop) && obj[prop] !== null && !isNaN(obj[prop])) {
          obj[prop] = +obj[prop];
        }
      }
    }

    //var sdata = JSON.stringify(objects, null, 2);
    setChartData(objects);
    //console.log(chartData);
  }, [])
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Dashboard
          </Typography>
          <div>
            <IconButton onClick={handleMenu} color="inherit">
              <Avatar src={user.avatar} />
            </IconButton>
            <Menu id="menu-appbar"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      <div>
        <h2>
          Creating the{" "}
          stacked bar chart using the <i> devexpress NPM package and material UI </i>
        </h2>
        <Paper>
          <Chart data={chartData}>
            <ArgumentAxis />
            <ValueAxis />

            <BarSeries
              name="yellow color"
              valueField="sopen"
              argumentField="material"
              color="red"
            />
            <BarSeries
              name="Silver color"
              valueField="inprogress"
              argumentField="material"
              color="blue"
            />
            <BarSeries
              name="grey color"
              valueField="grey"
              argumentField="material"
              color="green"
            />
            <Animation />
            <Legend position="bottom" />
            <Title text="Price of Materials" />
            <Stack />
          </Chart>
        </Paper>
      </div>
    </div>
  );
}
