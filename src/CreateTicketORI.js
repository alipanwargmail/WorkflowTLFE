import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Button, FormControl, Select, InputLabel, Grid, TextField, NumberInput } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import swal from 'sweetalert';


const backendUrl = process.env.REACT_APP_BACKEND_URL;

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '80ch',
    },
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: '80ch',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
    minWidth: '80ch',
  }
}));

export default function CreateTicketORI() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  //const [response, setResponse] = React.useState('');
  const open = Boolean(anchorEl);
  const username = localStorage.getItem('username');
  const user_id = localStorage.getItem('user_id');
  const email = localStorage.getItem('email');
  const custcode = localStorage.getItem('custcode');
  const custname = localStorage.getItem('custname');  
  const token = localStorage.getItem('token');
  const [tradinglimit, setTradingLimit] = React.useState("");
  const [error, setError] = React.useState(false)


  //console.log(username)
  //console.log(user_id)
  //console.log(email)
  //console.log(custcode)
  //console.log(custname)
  //console.log(token)
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleListTicket = () => {
    window.location.href = "/listticketuser";
  };

  const handleChangeTradingLimit = (event) => {
    const newValue = event.target.value
    if(!Number.isFinite(parseFloat(newValue)) && newValue !== ""){
      setError(true)      
    }
    else{
      setError(false)
    }
    setTradingLimit(newValue)
  }
  const handleAddTicket = () => {
    console.log(user_id)
    console.log(email)
    console.log(custcode)
    console.log(custname)    
    console.log(tradinglimit)

      axios.post(backendUrl+"/tickets", {user_id, email, custcode, custname, tradinglimit}, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'authorization': 'Bearer ' + token
      }
    }).then(response => {

      const { data } = response
      console.log(data)
      //setResponse(data)
      
      swal("Success", "Ticket created", "success", {
        buttons: false,
        timer: 2000,
      })
      window.location.href = "/listticketuser";
  
    })      
    
};

return (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Create Ticket ({username})
        </Typography>
        <div>
          <IconButton onClick={handleMenu} color="inherit">
            <Avatar src={username.avatar} />
          </IconButton>
          <Button color="inherit" onClick={handleListTicket}>List Ticket</Button>
          <Menu id="menu-appbar"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleListTicket}>List Ticket</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
    <Grid container justify="center">
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField disabled
            id="filled-userid"
            label="User id"
            value={user_id}
            variant="filled"
          />
        </div>
        <div>
          <TextField disabled
            id="filled-email"
            label="Email"
            value={email}
            //onChange={(newValue) => setTitle(newValue.target.value)}
            variant="filled"
          />
        </div>
        <div>
          <TextField disabled
            id="filled-custcode"
            label="Custcode"
            value={custcode}
            //onChange={(newValue) => setTitle(newValue.target.value)}
            variant="filled"
          />
        </div>
        <div>
          <TextField disabled
            id="filled-custcode"
            label="Custname"
            value={custname}
            //onChange={(newValue) => setTitle(newValue.target.value)}
            variant="filled"
          />
        </div>
        <div>
          <TextField 
          type="number"
            //id="filled-tradinglimit"
            label="Approve limit yang diminta"
            error={error}
            helperText={error? "Only numbers are allowed" : ""}
            value={tradinglimit}
            onChange={handleChangeTradingLimit}
            //variant="filled"
          />
        </div>
        <Grid container justify='center'>
        <div>
          <Button className={classes.button} variant="contained" color="primary" onClick={() => handleAddTicket()}>
            Create Ticket
          </Button>
        </div>
        </Grid>
      </form>
    </Grid>
  </div >
);
}