import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Button, FormControl, Select, InputLabel, Grid, TextField } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '40ch',
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
    minWidth: '40ch',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
    minWidth: '40ch',
  }
}));

export default function ViewTicketUserOri() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [id, setId] = React.useState('');
  const [user_id, setUserId] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [custcode, setCustCode] = React.useState('');
  const [custname, setCustName] = React.useState('');
  const [tradinglimit, setTradingLimit] = React.useState(0);
  const [recommended_limit, setRecommended_Limit] = React.useState(0);
  const [created_at, setCreatedAt] = React.useState('');
  const [status, setStatus] = React.useState('');
  const open = Boolean(anchorEl);
  const token = sessionStorage.getItem('token');
  const viewticket_id = JSON.parse(sessionStorage.getItem('viewticket_id'));
  const backendUrl = process.env.REACT_APP_BACKEND_URL;


  console.log(viewticket_id)
  console.log(token)
  useEffect(() => {
    console.log('enter useEffect')

      axios.get(backendUrl+"/tickets/" + viewticket_id, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'authorization': 'Bearer ' + token
      }
    }).then(response => {
      console.log("response: " + response)
      const { data } = response
      console.log("data " + data)

      setId(data.id)
      setUserId(data.user_id)
      setEmail(data.email)
      setCustCode(data.custcode)
      setCustName(data.custname)
      setTradingLimit(data.tradinglimit)
      setRecommended_Limit(data.recommended_limit)
      setCreatedAt(data.created_at)
      setStatus(data.status)

      //setResponse(data)
    })
  }, [viewticket_id, token])
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleListTicket = () => {
    window.location.href = "/listticketuser";
  };

  const handleBack = () => {

    window.location.href = "/listticketuser";

  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            View Ticket
          </Typography>
          <div>
            <IconButton onClick={handleMenu} color="inherit">
              <Avatar src={user_id.avatar} />
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
              id="filled-id"
              label="id"
              value={id}
              variant="filled"
            />
          </div>
          <div>
            <TextField disabled
              id="filled-userid"
              label="Userid"
              value={user_id}
              variant="filled"
            />
          </div>
          <div>
            <TextField disabled
              id="filled-email"
              label="Email"
              value={email}
              variant="filled"
            />
          </div>      
          <div>
            <TextField disabled
              id="filled-custcode"
              label="Custcode"
              value={custcode}
              variant="filled"
            />
          </div>
          <div>
            <TextField disabled
              id="filled-custname"
              label="Custname"
              value={custname}
              variant="filled"
            />
          </div>
          <div>
            <TextField disabled
              id="filled-tradinglimit"
              label="Approve limit"
              value={tradinglimit}
              variant="filled"
            />
          </div>
          <div>
            <TextField disabled
              id="filled-tradinglimit"
              label="Recommended limit"
              value={recommended_limit}
              variant="filled"
            />
          </div>
          <div>
            <TextField disabled
              id="filled-created_at"
              label="Created at"
              value={created_at}
              variant="filled"
            />
          </div>         
          <div>
            <TextField disabled
              id="filled-status"
              label="Status"
              value={status}
              variant="filled"
            />
          </div>
          <Grid container justify='center'>
            <div>
              <Button className={classes.button} variant="contained" color="primary" onClick={() => handleBack()}>
                Back To List Ticket
              </Button>
            </div>
          </Grid>
        </form>
      </Grid>
    </div >
  );
}