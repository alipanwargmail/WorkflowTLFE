import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Box, Button, Grid, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import { useEffect } from 'react';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import './sweetalert2.css'


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
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
    minWidth: '70ch',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
    minWidth: '30ch',
  },
  historybutton: {
    margin: theme.spacing(1),
    minWidth: '70ch',
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  tableContainer: {
    maxHeight: '20vh',
    overflow: 'auto',
  },
  tableHeader: {
    position: 'sticky',
    top: 0,
    zIndex: 1, // Ensures the header is above other elements
    backgroundColor: '#f5f5f5', // Customize the background color if needed
  },
  hintText: {
    fontSize: '0.5rem',
    color: 'blue',
  },  
}));

export default function CreateTicket() {

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [current_approve_limit, setCurrentApproveLimit] = React.useState(0)
  const [value, setValue] = React.useState(0);
  const open = Boolean(anchorEl);

  const user_id = sessionStorage.getItem('user_id');
  const custcode = sessionStorage.getItem(user_id + '_custcode');
  const token = sessionStorage.getItem(user_id + '_token');
  const approve_limit = sessionStorage.getItem(user_id + '_approvelimit');
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    console.log('enter useEffect')
    console.log(custcode)
    setCurrentApproveLimit(parseInt(approve_limit, 10).toLocaleString())
  })

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleListTicket = () => {
    window.location.href = "/workflowtlfe/listticketuser";
  };

  const handleAddTicket = async () => {

    console.log(value)
    let x = value.replaceAll(',', '').replaceAll('.', '')
    if (x > 0) {
      let tradinglimit = value.replaceAll(',', '').replaceAll('.', '')
      console.log(tradinglimit)
      if (tradinglimit >= 200000000) {      
        const { value: accept } = await Swal.fire({
          title: "Terms and conditions",
          html: `<div class="left-align">
          <ol type="1">
          <li>Customers are required to make deposits of funds and/or securities in accordance with the internal policy of PT Bahana Sekuritas ("Bahana DXtrade") related to the Trading Limit facility.</li>
          <li>In the event that a Customer's securities account shows a negative balance, Bahana Sekuritas may force the sale of securities without the Customer's consent, solely to settle the obligations of the respective Customer.</li>
          <li>Customer will be informed by Bahana Sekuritas regarding the negative fund balance position in the securities account, and Bahana Sekuritas has requested Customer to close negative balance position no later than the end of the 2nd (second), 3rd (third), and 4th (fourth) Exchange Day after the Exchange Transaction is conducted (T+2, T+3, and T+4).</li>
          <li>If on the 3rd (third) Exchange Day after the Exchange Transaction is conducted (T+3) at 01:00 AM WIB Customer still has not fulfilled their obligations and/or the funds show a negative balance in Customer's securities account, Bahana Sekuritas has the right to suspend buying in Customer's securities account. Bahana Sekuritas will lift the buying suspension if there is no negative balance in Customer's fund account and/or Customer has settled all obligations. Customer agrees to release Bahana Sekuritas from any responsibility, obligations, lawsuits, or claims in any form related to the buying suspension actions taken by Bahana Sekuritas.</li>
          <li>If on the 4th (fourth) Exchange Day at 11:00 AM WIB after the Exchange Transaction is conducted (T+4) Customer still has not fulfilled their obligations and/or the funds show a negative balance in Customer's securities account, then Customer agrees that Bahana Sekuritas may force the sale of the securities at any price in the regular market, and Customer must settle the obligations and costs arising from the Trading Limit facility. If the proceeds from the sale do not cover Customer's obligations, then Customer must settle the remaining obligations to Bahana Sekuritas, and in this regard, Bahana Sekuritas has the right to take legal steps according to applicable laws if Customer does not settle these obligations to Bahana Sekuritas. Customer agrees to release Bahana Sekuritas from any responsibility, obligations, lawsuits, or claims in any form related to the forced sale actions taken by Bahana Sekuritas.</li>
          <li>Bahana Sekuritas reserves the right to change, limit, and cancel the Trading Limit facility at any time with prior notice to Customer.</li>
          <li>All transaction activities including but not limited to the use of the Trading Limit facility are the responsibility of Customer. For all actions/policies mentioned above, Customer hereby releases Bahana Sekuritas from any responsibility, obligations, lawsuits, or claims in any form.</li>
          <li>The terms and conditions of using the Trading Limit facility are an integral part of the terms and conditions for opening a securities account at Bahana Sekuritas.</li>
          </ol>
          </div>`,
          input: "checkbox",
          inputValue: 0,
          showCancelButton: true,
          inputPlaceholder: `
            I agree with the terms and conditions
          `,
          confirmButtonText: `
            Continue&nbsp;<i class="fa fa-arrow-right"></i>
          `,
          inputValidator: (result) => {
            return !result && "You need to agree with T&C";
          },
          customClass: {
            popup: 'left-align',
          },
        });
        if (accept) {
          console.log('accept')
          axios.post(backendUrl + "/tickets", { user_id, custcode, tradinglimit }, {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'authorization': 'Bearer ' + token
            }
          }).then(async response => {
  
            const { data } = response
            console.log(data)
            if(data.result === 'OK'){
              await Swal.fire({
                title: "Trading Limit Submission on Process",
                html: `The submission process will take up to 3 trading days at the latest`,
                confirmButtonText: `
                  Back&nbsp;<i class="fa fa-arrow-right"></i>
                `,
              });
              
              window.location.href = "/workflowtlfe/listticketuser";  
            }
            else{
              await Swal.fire({
                title: "Trading Limit Submission Failed",
                html: data.message,
                confirmButtonText: `
                  Back&nbsp;<i class="fa fa-arrow-right"></i>
                `,
              });
              
              window.location.href = "/workflowtlfe/listticketuser";  
            }
          })  
        }
      }
      else {
        swal({
          title: "Information",
          text: "Buying Limit must be above IDR 200 million",
          icon: "info",
          confirmButtonText: "Ok",
        })
          .then((willDelete) => { });

      }
    }
  };

  const handleCancel = () => {

    window.location.href = "/workflowtlfe/listticketuser";
  };

  const formatNumber = (value) => {
    if (!value) return '';
    const parts = value.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };

  const handleChange = (event) => {
    let inputValue = event.target.value;

    // Remove all non-digit characters except for decimal point
    inputValue = inputValue.replace(/[^0-9.]/g, '');

    // Format the number with commas
    const formattedValue = formatNumber(inputValue);

    setValue(formattedValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Request Limit ({user_id})
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
      <Grid container spacing={1} margin={1} border={1}>
        <Grid item xs={12}>
          <Box component="span" display="block" border={1}>
            <div>
              <Typography>Current Buying Limit</Typography>
              <TextField disabled
                id="filled-current-approvelimit"
                label="Current Approve Limit"
                value={current_approve_limit}
                variant="filled"
              />
            </div>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box component="span" display="block" border={1}>
            <div>
              <Typography>Request Buying Limit Amount</Typography>
              <TextField
                id="filled-tradinglimit"
                label="Request Approve Limit"
                value={value}
                onChange={handleChange}
                onFocus={event => { event.target.select(); }}
                variant="filled"
                helperText="Make sure buying limit request is above IDR 200 million."
              />
            </div>
          </Box>
        </Grid>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="10vh"
        >
          <Box>
            <Button variant="contained" color="primary" style={{ marginRight: 8 }} onClick={(e) => handleCancel(e)}>
              Cancel
            </Button>
            <Button variant="contained" color="secondary" onClick={(e) => handleAddTicket(e)}>
              Next
            </Button>
          </Box>
        </Box>
        {/*
        <Grid item xs={12}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Button className={classes.button} variant="contained" color="default" onClick={(e) => handleCancel(e)}>Cancel</Button>
            </Grid>
            <Grid item>
              <Button className={classes.button} variant="contained" color="default" onClick={(e) => handleAddTicket(e)}>Next</Button>
            </Grid>
          </Grid>
        </Grid>
  */}
        {/* Add more Grid items for additional fields */}
      </Grid>

    </div >
  );
}