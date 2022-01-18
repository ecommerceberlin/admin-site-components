import React, {useCallback} from 'react'
import {ToolBar, isEmpty} from 'eventjuicer-site-components';    
import { useExhibitorsListContext } from './ExhibitorsListContext';

import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';

import IconButton from '@material-ui/core/IconButton';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccountCircle from '@material-ui/icons/AccountCircle';

// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles((theme) => ({
 
  account: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    fontWeight: 900,
    fontSize: 14,
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  flagged: {
    color: deepOrange[500],
  },
  unflagged: {
    color: "#999999",
  }
 
}));

const Switcher = () => {

    const classes = useStyles();

    const {data, sort, flags, account, setSort, toggleFlag, setAccount} = useExhibitorsListContext()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const accountManagers = [...new Set(data.map(item => item.account))].sort()

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
    const handleClose = (am = null) => {
        setAccount(am)
        setAnchorEl(null);
    };
   
    return (<>
    <IconButton color="inherit" onClick={() => setSort("company.name")}>
    <SortByAlphaIcon className={sort == "company.name" ?  classes.flagged: classes.unflagged} /> 
    </IconButton>

    <IconButton color="inherit" onClick={() => setSort("profile.booth")} >
    <LocationOnIcon className={sort == "profile.booth" ?  classes.flagged: classes.unflagged} />  
    </IconButton>    

    <IconButton color="inherit" onClick={() => toggleFlag("assessment") } >
    <AssessmentIcon className={flags.assessment? classes.flagged: classes.unflagged} />  
    </IconButton>    

    <IconButton color="inherit" onClick={() => toggleFlag("assignment") } >
    <AssignmentIcon className={flags.assignment? classes.flagged: classes.unflagged} />  
    </IconButton>    


    <IconButton onClick={handleMenu} color="inherit">
    {!isEmpty(account) ? <Avatar className={classes.account}>{account || null}</Avatar>: <AccountCircle className={classes.unflagged} /> }
    </IconButton>

    <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={open}
        onClose={() => handleClose()}
    >
        <MenuItem onClick={() => handleClose()}>SHOW ALL</MenuItem>
        {accountManagers.map(am => <MenuItem key={am} onClick={() => handleClose(am) }>{am}</MenuItem>)}
      
    </Menu>                
    </>)
}


const ExhibitorsListToolbar = () => {

    const {data, setFiltered, setAccount} = useExhibitorsListContext()
    const handleSetFiltered = useCallback((data) => {
        setAccount(null)
        setFiltered(data)
    })

    if(isEmpty(data)){
        return null
    }

    return (<div><ToolBar data={data} indexes={[
        ["profile", "lname"],
        ["profile", "cname"],
        ["profile", "booth"],
        ["company", "name"]
    ]} buttons={
    <div style={{display: 'flex'}}>
    <Switcher />
    </div>} onSearch={handleSetFiltered}  /></div>)

}
    
    
export default ExhibitorsListToolbar;