import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';
import { InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Image from './blue_background.png';
const backendUrl = process.env.REACT_APP_BACKEND_URL;


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    //backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundImage: `url(${Image})`,
    backgroundSize: 'cover',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

async function loginSales(credentials) {
  console.log(backendUrl)
  return fetch(backendUrl+"/saleslogin", {    
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())

}

export default function LoginSales() {
  // const navigate = useNavigate();
  const classes = useStyles();
  const [user, setUser] = useState();
  const [role, setRole] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUserName] = useState();
  const [userstatus, setUserStatus] = useState();
  const [custcode, setCustCode] = useState();
  const [custname, setCustName] = useState();
  const [sid, setSid] = useState();
  const [custStatus, setCustStatus] = useState();
  const [token, setToken] = useState();
  const [sales_id, setSales_id] = useState('');
  const [retval, setRetval] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await loginSales({
      user,
      password
    });
    console.log(response)
    setRetval(retval)
    //if ('token' in response) {
    if (response.hasOwnProperty("token")) {
      swal({
        title: "Success!",
        text: "OK",//response.message,
        icon: "success",
        button: "OK!",
      })
        .then((value) => {
          setToken(response['token'])
          setUser(response['user_id'])
          setRole(response['role'])
          setEmail(response['email'])
          setUserName(response['user_name'])
          setSales_id(response['sales_id'])
          console.log(token);
          sessionStorage.setItem('token', response['token']);
          sessionStorage.setItem('user_id', response['user_id']);
          sessionStorage.setItem('role', response['role']);
          sessionStorage.setItem('email', response['email_address']);
          sessionStorage.setItem('user_name', response['user_name']);
          sessionStorage.setItem('sales_id', response['sales_id']);

          
            window.location.href = "/workflowtlfe/listticketsales";
        });
    }
    else {
      swal("Failed", response.message, "error");
    }
  }

  return (
    <Grid container className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} md={7} className={classes.image} />
      <Grid item xs={12} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sales Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="user"
              name="user"
              label="User"
              onChange={e => setUser(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Password" s
              label='Password'
              type={showPassword ? "text" : "password"} // <-- This is where the magic happens
              onChange={e => setPassword(e.target.value)}
              InputProps={{ // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
