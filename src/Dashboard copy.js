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
}));



export default function Dashboard() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [data, setData] = React.useState([]);
  const [data2, setData2] = React.useState([]);
  const [chartData, setChartData] = React.useState([]);
  const open = Boolean(anchorEl);
  const user = JSON.parse(localStorage.getItem('username'));
  const user_id = JSON.parse(localStorage.getItem('user_id'));
  const token = localStorage.getItem('token');
  console.log(user_id)
  
  
  useEffect(() => {
    console.log('enter useEffect')
    axios.get("https://dainty-blini-408c4c.netlify.app/.netlify/functions/dashboardticketsbyanper/", {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'authorization': 'Bearer ' + token
      }
    }).then(response => {
      console.log("response: " + response.data)
      setChartData(response.data)
    })

    //axios.get("http://localhost:3001/dashboardtickets/", {
      axios.get("https://dainty-blini-408c4c.netlify.app/.netlify/functions/dashboardtickets/", {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'authorization': 'Bearer ' + token
      }
    }).then(response => {
      //console.log("response: " + response.data)
      setData(response.data)
    })
    //axios.get("http://localhost:3001/dashboardticketsbycs/", {
      axios.get("https://dainty-blini-408c4c.netlify.app/.netlify/functions/dashboardticketsbycs/", {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'authorization': 'Bearer ' + token
      }
    }).then(response => {
      //console.log("response: " + response.data)      
      setData2(response.data)
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
              open={open}
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
      <Paper>
         <Chart data = {chartData}>
            <ArgumentAxis />
            <ValueAxis />

            <BarSeries
               Name = "OPEN"
               valueField = "open"
               argumentField = "anper"
               color = "red"
            />
            <BarSeries
               Name = "IN PROGRESS"
               valueField = "inprogress"
               argumentField = "anper"
               color = "blue"
            />
            <BarSeries
               Name = "DONE"
               valueField = "done"
               argumentField = "anper"
               color = "green"
            />
            <Animation />
            <Legend position = "bottom" />
            <Title text = "Distribusi status ticket by anper" />
            <Stack />
         </Chart>
         </Paper>
         
      <Paper className={classes.chart} variant="outlined">
        <fieldset>
          <legend><strong>Distribusi Ticket berdasarkan status</strong></legend>
          <Chart
            data={data}
          >
            <ArgumentAxis />
            <ValueAxis />

            <BarSeries valueField="value" argumentField="argument" />
          </Chart>
        </fieldset>
      </Paper>
      <Paper className={classes.chart} variant="outlined">
        <fieldset>
          <legend><strong>Distribusi Ticket berdasarkan Cs</strong></legend>          
          <Chart
            data={data2}
          >
            <ArgumentAxis />
            <ValueAxis />

            <BarSeries valueField="value" argumentField="argument" />
          </Chart>
        </fieldset>
      </Paper>
      </Card>
    </div>
  );
}