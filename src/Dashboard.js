import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Box from "@material-ui/core/Box";


import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  BarSeries,
  Legend,
  Title
} from '@devexpress/dx-react-chart-material-ui';
import axios from 'axios';
import { Stack, Animation } from "@devexpress/dx-react-chart";


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
  chartsmall: {
    width: "33%",
  }
}));



export default function Dashboard() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  //const [data, setData] = React.useState([]);
  //const [data2, setData2] = React.useState([]);
  const [chartData, setChartData] = React.useState([]);
  const [askrindoData, setAskrindoData] = React.useState([]);
  const [bavData, setBavData] = React.useState([]);
  const [bkiData, setBkiData] = React.useState([]);
  const [bsData, setBsData] = React.useState([]);
  const [btimData, setBtimData] = React.useState([]);
  const [gntuData, setGntuData] = React.useState([]);
  const [ifgData, setIfgData] = React.useState([]);
  const [ifgLifeData, setIfgLifeData] = React.useState([]);
  const [jamkrindoData, setJamkrindoData] = React.useState([]);
  const [jasaRaharjaData, setJasaRaharjaData] = React.useState([]);
  const [jasindoData, setJasindoData] = React.useState([]);

  const anchoropen = Boolean(anchorEl);
  const user = JSON.parse(localStorage.getItem('username'));
  const user_id = JSON.parse(localStorage.getItem('user_id'));
  const token = localStorage.getItem('token');
  console.log(user_id)

  useEffect(() => {
    console.log('enter useEffect')
    //axios.get("https://dainty-blini-408c4c.netlify.app/.netlify/functions/dashboardticketsbyanper/", {
    axios.get("http://127.0.0.1:3001//", {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'authorization': 'Bearer ' + token
      }
    }).then(response => {
      //all
      var objects = response.data.all;
      for (var i = 0; i < objects.length; i++) {
        var obj = objects[i];
        for (var prop in obj) {
          if (obj.hasOwnProperty(prop) && obj[prop] !== null && !isNaN(obj[prop])) {
            obj[prop] = +obj[prop];
          }
        }
      }
      setChartData(objects)
      //askrindo
      objects = response.data.askrindo;
      for (i = 0; i < objects.length; i++) {
        obj = objects[i];
        for (prop in obj) {
          if (obj.hasOwnProperty(prop) && obj[prop] !== null && !isNaN(obj[prop])) {
            obj[prop] = +obj[prop];
          }
        }
      }
      setAskrindoData(objects)
      //bav
      objects = response.data.bav;
      for (i = 0; i < objects.length; i++) {
        obj = objects[i];
        for (prop in obj) {
          if (obj.hasOwnProperty(prop) && obj[prop] !== null && !isNaN(obj[prop])) {
            obj[prop] = +obj[prop];
          }
        }
      }
      setBavData(objects)
      //bki
      objects = response.data.bav;
      for (i = 0; i < objects.length; i++) {
        obj = objects[i];
        for (prop in obj) {
          if (obj.hasOwnProperty(prop) && obj[prop] !== null && !isNaN(obj[prop])) {
            obj[prop] = +obj[prop];
          }
        }
      }
      setBkiData(objects)
      //bs
      objects = response.data.bs;
      for (i = 0; i < objects.length; i++) {
        obj = objects[i];
        for (prop in obj) {
          if (obj.hasOwnProperty(prop) && obj[prop] !== null && !isNaN(obj[prop])) {
            obj[prop] = +obj[prop];
          }
        }
      }
      setBsData(objects)
      //btim
      objects = response.data.btim;
      for (i = 0; i < objects.length; i++) {
        obj = objects[i];
        for (prop in obj) {
          if (obj.hasOwnProperty(prop) && obj[prop] !== null && !isNaN(obj[prop])) {
            obj[prop] = +obj[prop];
          }
        }
      }
      setBtimData(objects)
      //gntu
      objects = response.data.gntu;
      for (i = 0; i < objects.length; i++) {
        obj = objects[i];
        for (prop in obj) {
          if (obj.hasOwnProperty(prop) && obj[prop] !== null && !isNaN(obj[prop])) {
            obj[prop] = +obj[prop];
          }
        }
      }
      setGntuData(objects)
      //ifg
      objects = response.data.ifg;
      for (i = 0; i < objects.length; i++) {
        obj = objects[i];
        for (prop in obj) {
          if (obj.hasOwnProperty(prop) && obj[prop] !== null && !isNaN(obj[prop])) {
            obj[prop] = +obj[prop];
          }
        }
      }
      setIfgData(objects)
      //ifglife
      objects = response.data.ifglife;
      for (i = 0; i < objects.length; i++) {
        obj = objects[i];
        for (prop in obj) {
          if (obj.hasOwnProperty(prop) && obj[prop] !== null && !isNaN(obj[prop])) {
            obj[prop] = +obj[prop];
          }
        }
      }
      setIfgLifeData(objects)
      //jamkrindo
      objects = response.data.jamkrindo;
      for (i = 0; i < objects.length; i++) {
        obj = objects[i];
        for (prop in obj) {
          if (obj.hasOwnProperty(prop) && obj[prop] !== null && !isNaN(obj[prop])) {
            obj[prop] = +obj[prop];
          }
        }
      }
      setJamkrindoData(objects)
      //jasaraharja
      objects = response.data.jasaraharja;
      for (i = 0; i < objects.length; i++) {
        obj = objects[i];
        for (prop in obj) {
          if (obj.hasOwnProperty(prop) && obj[prop] !== null && !isNaN(obj[prop])) {
            obj[prop] = +obj[prop];
          }
        }
      }
      setJasaRaharjaData(objects)
      //jasindo
      objects = response.data.jasindo;
      for (i = 0; i < objects.length; i++) {
        obj = objects[i];
        for (prop in obj) {
          if (obj.hasOwnProperty(prop) && obj[prop] !== null && !isNaN(obj[prop])) {
            obj[prop] = +obj[prop];
          }
        }
      }
      setJasindoData(objects)      
    })
  }, [token])

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDashboard = () => {
    window.location.href = "/";
  };
  const handleListUser = () => {
    window.location.href = "/listuser";
  };
  const handleListTicket = () => {
    window.location.href = "/listticket";
  };
  const handleCreateUser = () => {
    window.location.href = "/createuser";
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
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
            <Button color="inherit" onClick={handleDashboard}>Dashboard</Button>
            <Button color="inherit" onClick={handleListTicket}>List Ticket</Button>
            <Button color="inherit" onClick={handleListUser}>List User</Button>
            <Button color="inherit" onClick={handleCreateUser}>Create User</Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
            <Menu id="menu-appbar"
              anchorEl={anchorEl}
              open={anchoropen}
              onClose={handleClose}
            >
              <MenuItem onClick={handleDashboard}>Dashboard</MenuItem>
              <MenuItem onClick={handleListUser}>List User</MenuItem>
              <MenuItem onClick={handleCreateUser}>Create User</MenuItem>
              <MenuItem onClick={handleListTicket}>List Ticket</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Avatar src={user.avatar} className={classes.large} />
          <Typography variant="h5">
            Welcome {user}
          </Typography>
        </CardContent>
      </Card>
      <Card className={classes.root} variant="outlined">
        <Paper className={classes.chart} variant="outlined">
          <fieldset>
            <Chart data={chartData}>
              <ArgumentAxis />
              <ValueAxis />

              <BarSeries
                name="OPEN"
                valueField="open"
                argumentField="anper"
                color="red"
              />
              <BarSeries
                name="IN PROGRESS"
                valueField="inprogress"
                argumentField="anper"
                color="blue"
              />
              <BarSeries
                name="DONE"
                valueField="done"
                argumentField="anper"
                color="green"
              />
              <Animation />
              <Legend position="bottom" />
              <Title text="Distribusi status ticket by anper" />
              <Stack />
            </Chart>
          </fieldset>
        </Paper>
      </Card>

      <Box display='flex'>
        <Paper className={classes.chartsmall} variant="outlined">
          <fieldset>
            <Chart data={askrindoData}>
              <ArgumentAxis />
              <ValueAxis />

              <BarSeries
                name="OPEN"
                valueField="open"
                argumentField="handler_username"
                color="red"
              />
              <BarSeries
                name="IN PROGRESS"
                valueField="inprogress"
                argumentField="handler_username"
                color="blue"
              />
              <BarSeries
                name="DONE"
                valueField="done"
                argumentField="handler_username"
                color="green"
              />
              <Animation />
              <Legend position="bottom" />
              <Title text="Distribusi status ticket by CS Askrindo" />
              <Stack />
            </Chart>
          </fieldset>
        </Paper>
        <Paper className={classes.chartsmall} variant="outlined">
          <fieldset>
            <Chart data={bavData}>
              <ArgumentAxis />
              <ValueAxis />

              <BarSeries
                name="OPEN"
                valueField="open"
                argumentField="handler_username"
                color="red"
              />
              <BarSeries
                name="IN PROGRESS"
                valueField="inprogress"
                argumentField="handler_username"
                color="blue"
              />
              <BarSeries
                name="DONE"
                valueField="done"
                argumentField="handler_username"
                color="green"
              />
              <Animation />
              <Legend position="bottom" />
              <Title text="Distribusi status ticket by CS Bahana Artha Ventura" />
              <Stack />
            </Chart>
          </fieldset>
        </Paper>
        <Paper className={classes.chartsmall} variant="outlined">
          <fieldset>
            <Chart data={bkiData}>
              <ArgumentAxis />
              <ValueAxis />

              <BarSeries
                name="OPEN"
                valueField="open"
                argumentField="handler_username"
                color="red"
              />
              <BarSeries
                name="IN PROGRESS"
                valueField="inprogress"
                argumentField="handler_username"
                color="blue"
              />
              <BarSeries
                name="DONE"
                valueField="done"
                argumentField="handler_username"
                color="green"
              />
              <Animation />
              <Legend position="bottom" />
              <Title text="Distribusi status ticket by CS Bahana Kapital Investa" />
              <Stack />
            </Chart>
          </fieldset>
        </Paper>
        <Paper className={classes.chartsmall} variant="outlined">
          <fieldset>
            <Chart data={bsData}>
              <ArgumentAxis />
              <ValueAxis />

              <BarSeries
                name="OPEN"
                valueField="open"
                argumentField="handler_username"
                color="red"
              />
              <BarSeries
                name="IN PROGRESS"
                valueField="inprogress"
                argumentField="handler_username"
                color="blue"
              />
              <BarSeries
                name="DONE"
                valueField="done"
                argumentField="handler_username"
                color="green"
              />
              <Animation />
              <Legend position="bottom" />
              <Title text="Distribusi status ticket by CS Bahana Sekuritas" />
              <Stack />
            </Chart>
          </fieldset>
        </Paper>
      </Box>
      <Box display='flex'>
        <Paper className={classes.chartsmall} variant="outlined">
          <fieldset>
            <Chart data={btimData}>
              <ArgumentAxis />
              <ValueAxis />

              <BarSeries
                name="OPEN"
                valueField="open"
                argumentField="handler_username"
                color="red"
              />
              <BarSeries
                name="IN PROGRESS"
                valueField="inprogress"
                argumentField="handler_username"
                color="blue"
              />
              <BarSeries
                name="DONE"
                valueField="done"
                argumentField="handler_username"
                color="green"
              />
              <Animation />
              <Legend position="bottom" />
              <Title text="Distribusi status ticket by CS Bahana TCW Investment Management" />
              <Stack />
            </Chart>
          </fieldset>
        </Paper>
        <Paper className={classes.chartsmall} variant="outlined">
          <fieldset>
            <Chart data={gntuData}>
              <ArgumentAxis />
              <ValueAxis />

              <BarSeries
                name="OPEN"
                valueField="open"
                argumentField="handler_username"
                color="red"
              />
              <BarSeries
                name="IN PROGRESS"
                valueField="inprogress"
                argumentField="handler_username"
                color="blue"
              />
              <BarSeries
                name="DONE"
                valueField="done"
                argumentField="handler_username"
                color="green"
              />
              <Animation />
              <Legend position="bottom" />
              <Title text="Distribusi status ticket by CS Grahaniaga Tatautama" />
              <Stack />
            </Chart>
          </fieldset>
        </Paper>
        <Paper className={classes.chartsmall} variant="outlined">
          <fieldset>
            <Chart data={ifgData}>
              <ArgumentAxis />
              <ValueAxis />

              <BarSeries
                name="OPEN"
                valueField="open"
                argumentField="handler_username"
                color="red"
              />
              <BarSeries
                name="IN PROGRESS"
                valueField="inprogress"
                argumentField="handler_username"
                color="blue"
              />
              <BarSeries
                name="DONE"
                valueField="done"
                argumentField="handler_username"
                color="green"
              />
              <Animation />
              <Legend position="bottom" />
              <Title text="Distribusi status ticket by CS IFG Holding" />
              <Stack />
            </Chart>
          </fieldset>
        </Paper>
        <Paper className={classes.chartsmall} variant="outlined">
          <fieldset>
            <Chart data={ifgLifeData}>
              <ArgumentAxis />
              <ValueAxis />

              <BarSeries
                name="OPEN"
                valueField="open"
                argumentField="handler_username"
                color="red"
              />
              <BarSeries
                name="IN PROGRESS"
                valueField="inprogress"
                argumentField="handler_username"
                color="blue"
              />
              <BarSeries
                name="DONE"
                valueField="done"
                argumentField="handler_username"
                color="green"
              />
              <Animation />
              <Legend position="bottom" />
              <Title text="Distribusi status ticket by CS IFG Life" />
              <Stack />
            </Chart>
          </fieldset>
        </Paper>
      </Box>
      <Box display='flex'>
        <Paper className={classes.chartsmall} variant="outlined">
          <fieldset>
            <Chart data={jamkrindoData}>
              <ArgumentAxis />
              <ValueAxis />

              <BarSeries
                name="OPEN"
                valueField="open"
                argumentField="handler_username"
                color="red"
              />
              <BarSeries
                name="IN PROGRESS"
                valueField="inprogress"
                argumentField="handler_username"
                color="blue"
              />
              <BarSeries
                name="DONE"
                valueField="done"
                argumentField="handler_username"
                color="green"
              />
              <Animation />
              <Legend position="bottom" />
              <Title text="Distribusi status ticket by CS Jamkrindo" />
              <Stack />
            </Chart>
          </fieldset>
        </Paper>
        <Paper className={classes.chartsmall} variant="outlined">
          <fieldset>
            <Chart data={jasaRaharjaData}>
              <ArgumentAxis />
              <ValueAxis />

              <BarSeries
                name="OPEN"
                valueField="open"
                argumentField="handler_username"
                color="red"
              />
              <BarSeries
                name="IN PROGRESS"
                valueField="inprogress"
                argumentField="handler_username"
                color="blue"
              />
              <BarSeries
                name="DONE"
                valueField="done"
                argumentField="handler_username"
                color="green"
              />
              <Animation />
              <Legend position="bottom" />
              <Title text="Distribusi status ticket by CS Jasa Raharja" />
              <Stack />
            </Chart>
          </fieldset>
        </Paper>
        <Paper className={classes.chartsmall} variant="outlined">
          <fieldset>
            <Chart data={jasindoData}>
              <ArgumentAxis />
              <ValueAxis />

              <BarSeries
                name="OPEN"
                valueField="open"
                argumentField="handler_username"
                color="red"
              />
              <BarSeries
                name="IN PROGRESS"
                valueField="inprogress"
                argumentField="handler_username"
                color="blue"
              />
              <BarSeries
                name="DONE"
                valueField="done"
                argumentField="handler_username"
                color="green"
              />
              <Animation />
              <Legend position="bottom" />
              <Title text="Distribusi status ticket by CS Jasindo" />
              <Stack />
            </Chart>
          </fieldset>
        </Paper>
      </Box>
    </div>
  );
}