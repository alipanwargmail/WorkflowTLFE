import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Box, Button, Select, InputLabel, Grid, TextField, DialogContent, Dialog, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, DialogTitle } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import { useEffect } from 'react';
import swal from 'sweetalert';

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
}));

export default function EditTicketRM() {

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [id, setId] = React.useState('');
  const [user_id, setUserId] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [custcode, setCustCode] = React.useState('');
  const [custname, setCustName] = React.useState('');
  const [tradinglimit, setTradingLimit] = React.useState(0);
  const [current_approve_limit, setCurrentApproveLimit] = React.useState(0);
  const [recommended_limit, setRecommended_Limit] = React.useState(0);
  const [created_at, setCreatedAt] = React.useState('');
  const [deskripsi, setDeskripsi] = React.useState('');
  const [waiting_for, setWaitingFor] = React.useState('');
  let [rejectreason, setRejectReason] = React.useState('');
  const [sid, setSid] = React.useState('');
  const [opendate, setOpenDate] = React.useState('');
  const open = Boolean(anchorEl);
  const token = sessionStorage.getItem('token');
  const role = sessionStorage.getItem('role');
  const userid = sessionStorage.getItem('userid');
  const refftoken = sessionStorage.getItem('refftoken');
  const editticket_id = JSON.parse(sessionStorage.getItem('editticket_id'));
  const [clientasset, setClientAsset] = React.useState(0);
  const [clientcash, setClientCash] = React.useState(0);
  const [clientportfolio, setClientPortfolio] = React.useState(0);
  const [history, setHistory] = React.useState(null);
  const [showTable, setShowTable] = React.useState(false);
  const [audittrail, setAuditTrail] = React.useState(null);
  const [selectedOption, setSelectedOption] = React.useState('No');
  const [value, setValue] = React.useState(0)
  const user_name = sessionStorage.getItem('username')

  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  
  const handleChangePengkinianData = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    console.log('enter useEffect')

    axios.get(backendUrl+"/tickets/" + editticket_id, {
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
      let approvelimitrequested = parseInt(data.tradinglimit, 10)
      setTradingLimit(approvelimitrequested.toLocaleString())
      let recommentlimit = parseInt(data.tradinglimit, 10)
      setValue(recommentlimit.toLocaleString())
      setCreatedAt(data.created_at)
      setDeskripsi(data.deskripsi)
      setWaitingFor(data.waiting_for)
      setSelectedOption("No")

      getCustomerData(data.custcode)
      //getCustomerPortfolio(data.custcode)
      getCustomerAsset(data.custcode)
      getCustomerTrxHistory(data.custcode)
      getAuditTrail(editticket_id)
      
      //setResponse(data)
    })
  }, [])

  const getCustomerData = async (custcode) => {
    console.log(custcode)
    console.log(token)

    const result = await axios.get(`${backendUrl}/customerdata/` + custcode, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'authorization': 'Bearer ' + token
      }
    });

    console.log(result)
    const { data } = result
    setSid(data.sid)
    setOpenDate(data.opendate)
    let approvelimit = parseInt(data.approvelimit, 10)
    setCurrentApproveLimit(approvelimit.toLocaleString())
    setRecommended_Limit(approvelimit.toLocaleString())
  };

  const getAuditTrail = async (ticketid) => {

    const result = await axios.get(`${backendUrl}/audittrail/` + ticketid, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'authorization': 'Bearer ' + token
      }
    });

    console.log(result)
    const { data } = result
    setAuditTrail(data)
  };

  const getCustomerAsset = async (custcode) => {
    console.log(custcode)
    console.log(token)

    const result = await axios.get(`${backendUrl}/customerasset/` + custcode, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'authorization': 'Bearer ' + token
      }
    });

    console.log(result)
    const { data } = result
    let cashbalance = parseInt(data.cashbalance, 10)
    setClientCash(cashbalance.toLocaleString())
    let liquidityvalue = parseInt(data.liquidityvalue, 10)
    setClientPortfolio(liquidityvalue.toLocaleString())
  };

  const getCustomerTrxHistory = async (custcode) => {

    const result = await axios.get(`${backendUrl}/customertrxhistory/` + custcode, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'authorization': 'Bearer ' + token
      }
    });
    console.log(result)
    const { data } = result
    setHistory(data)
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleListTicket = () => {
    window.location.href = "/workflowtlfe/listticketrmdanmgmt";
  };

  const handleYes = async () => {

    swal({
      title: "Information",
      text: "You are about to approve this ticket, Proceed?",
      icon: "info",
      buttons: true,
      dangerMode: true,
    })
      .then(async (willDelete) => {

        if (willDelete) {

          let recommended_limit = value.replaceAll(',', '').replaceAll('.', '')          
          const result = await axios.put(`${backendUrl}/ticketapprove/` + editticket_id, { userid, user_name, role, recommended_limit, refftoken }, {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'authorization': 'Bearer ' + token
            }
          });
          window.location.href = "/workflowtlfe/listticketrmdanmgmt";
        }
        else {
        }

      });

  };

  const handleAuditTrail = async () => {
    if (showTable)
      setShowTable(false)
    else
      setShowTable(true)
  };

  const handleNo = async () => {

    swal({
      title: "Information",
      text: "You are about to reject this ticket, Proceed?",
      icon: "info",
      buttons: true,
      dangerMode: true,
    })
      .then(async (willDelete) => {

        if (willDelete) {

          setRejectReason("Nasabah harus melakukan Pengkinian Data")
          rejectreason = "Nasabah harus melakukan Pengkinian Data"
          console.log(rejectreason)
          if (rejectreason !== '') {

            const result = await axios.put(backendUrl + "/ticketreject/" + editticket_id, { userid, user_name, role, rejectreason, refftoken }, {
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'authorization': 'Bearer ' + token
              }
            });
            console.log(result);
            window.location.href = "/workflowtlfe/listticketrmdanmgmt";
          }
          else {
            swal({
              title: "Information",
              text: "Nasabah harus melakukan Pengkinian Data",
              icon: "info",
              confirmButtonText: "Ok",
            })
              .then((willDelete) => { });
          }
        }
        else {
        }
      });
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
            Risk Management ({userid})
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
          <Typography variant="h6" className={classes.title} fullWidth><Box component="span" fontWeight='fontWeightMedium'>Client Request : {custname}</Box></Typography>
        </Grid>
        <Grid item xs={12}>
          <Box component="span" display="block" border={1} full>
            <div>
              <Typography>1. Personal Data Information</Typography>
              <TextField disabled
                id="filled-name"
                label="Customer Name"
                value={custname}
                variant="filled"
              />
            </div>
            <div>
              <TextField disabled
                id="filled-sid"
                label="SID"
                value={sid}
                variant="filled"
              />
            </div>
            <div>
              <TextField disabled
                id="filled-open-date"
                label="Opening Date"
                value={opendate}
                variant="filled"
              />
            </div>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box component="span" display="block" border={1}>
            <div>
              <Typography>2. Current Approve Limit</Typography>
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
              <Typography>3. Requested Approve Limit</Typography>
              <TextField disabled
                id="filled-tradinglimit"
                label="Approve Limit Requested"
                value={tradinglimit}
                variant="filled"
              />
            </div>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box component="span" display="block" border={1}>
            <Typography>4. History Transaction</Typography>
            <paper className={classes.tableContainer}>

              <TableContainer style={{ maxHeight: '20vh', overflow: 'auto', minwidth: '70ch' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.tableHeader}>No</TableCell>
                      <TableCell className={classes.tableHeader}>Trade Date</TableCell>
                      <TableCell className={classes.tableHeader}>Stock Code</TableCell>
                      <TableCell className={classes.tableHeader}>Side</TableCell>
                      <TableCell className={classes.tableHeader}>Qty Lot</TableCell>
                      <TableCell className={classes.tableHeader}>Price</TableCell>
                      <TableCell className={classes.tableHeader}>Board</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {history ? history.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.trade_date}</TableCell>
                        <TableCell>{row.symbol}</TableCell>
                        <TableCell>{row.side}</TableCell>
                        <TableCell>{row.trade_qty}</TableCell>
                        <TableCell>{row.price}</TableCell>
                        <TableCell>{row.symbol_sfx}</TableCell>
                      </TableRow>
                    )) : null}
                  </TableBody>
                </Table>
              </TableContainer>

            </paper>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box component="span" display="block" border={1}>
            <div>
              <Typography>5. Client Asset</Typography>
              {/*<TextField disabled
                id="filled-client-asset"
                label="Portfolio Equity"
                value={clientasset}
                variant="outlined"
                InputProps={{ inputComponent: NumberFormatCustom }}
                  />*/}
              <div>
                <TextField disabled
                  id="filled-client-cash"
                  label="Client Cash"
                  value={clientcash}
                  variant="filled" />
              </div>
              <div>
                <TextField disabled
                  id="filled-client-portfolio"
                  label="Client Portfolio"
                  value={clientportfolio}
                  variant="filled" />
              </div>
            </div>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box component="span" display="block" border={1}>
            <div>
              <Typography>6. Pengkinian Data</Typography>
              <Select
                value={selectedOption}
                defaultValue={selectedOption}
                onChange={handleChangePengkinianData}                
                fullWidth
              >
                <MenuItem value="No">No</MenuItem>
                <MenuItem value="Yes">Yes</MenuItem>
              </Select>
            </div>
          </Box>
        </Grid>
        
        <Grid item xs={12}>
          <Box component="span" display="block" border={1}>
            <div>
              <Typography>7. Recommendation Approve Limit</Typography>
              <TextField
                id="filled-recommendation-approvelimit"
                label="Recommendation Approve Limit"
                value={value}
                onChange={handleChange}
                onFocus={event => {event.target.select();}}
                variant="filled"
              />
            </div>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Button className={classes.button} variant="contained" color="secondary" onClick={(e) => handleAuditTrail(e)}>Client Audit Trail</Button>
            </Grid>
            <Grid item />
            <Grid item />
            <Grid item />
            <Grid item />
            <Grid item />
            <Grid item />
            <Grid item />
            <Grid item />
            <Grid item />
            <Grid item />
            <Grid item />
            <Grid item>
              <Button className={classes.button} variant="contained" color="default" onClick={(e) => handleNo(e)}>No</Button>
            </Grid>
            <Grid item>
              <Button className={classes.button} variant="contained" color="default" onClick={(e) => handleYes(e)}>Yes</Button>
            </Grid>
          </Grid>
        </Grid>
        {showTable && (
          <Grid item xs={12}>
            <Box component="span" display="block" border={1}>
              <paper className={classes.tableContainer}>

                <TableContainer style={{ maxHeight: '20vh', overflow: 'auto', minwidth: '70ch' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.tableHeader}>No</TableCell>
                        <TableCell className={classes.tableHeader}>Timestamp</TableCell>
                        <TableCell className={classes.tableHeader}>Status</TableCell>
                        <TableCell className={classes.tableHeader}>Notes</TableCell>
                        <TableCell className={classes.tableHeader}>By User</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {audittrail ? audittrail.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.no}</TableCell>
                          <TableCell>{row.created_at}</TableCell>
                          <TableCell>{row.deskripsi}</TableCell>
                          <TableCell>{row.notes}</TableCell>
                          <TableCell>{row.userid}</TableCell>
                        </TableRow>
                      )) : null}
                    </TableBody>
                  </Table>
                </TableContainer>

              </paper>
            </Box>
          </Grid>
        )}
        {/* Add more Grid items for additional fields */}
      </Grid>

    </div >
  );
}