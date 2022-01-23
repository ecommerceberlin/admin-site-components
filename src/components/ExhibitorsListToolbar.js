import React, {useCallback} from 'react'
import {ToolBar, isEmpty} from 'eventjuicer-site-components';    
import { useExhibitorsListContext, useData, useExhibitorsListUpdaterContext } from './ExhibitorsListContext';

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
import useStyles from './styles'
import ExhibitorListServices from './ExhibitorListServices';



const AccountManagers = () => {

    const classes = useStyles();
    const {account} = useExhibitorsListContext()
    const {setAccount} =  useExhibitorsListUpdaterContext()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
    const handleMenuClose = useCallback(() => setAnchorEl(null))
    return (<><IconButton onClick={handleMenu} color="inherit">
    {!isEmpty(account) ? <Avatar className={classes.account}>{account || null}</Avatar>: <AccountCircle className={classes.unflagged} /> }
    </IconButton>

    <AccountManagersMenu anchorEl={anchorEl} handleMenuClose={handleMenuClose}/>
   </>)   

}

const AccountManagersMenu = ({anchorEl, handleMenuClose}) => {

    const {setAccount} =  useExhibitorsListUpdaterContext()
    const {accounts} = useData()
    const open = Boolean(anchorEl)

    const handleClose = (am = null) => {
        setAccount(am)
        handleMenuClose();
    };

    return (<>
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
        {accounts.map(am => <MenuItem key={am} onClick={() => handleClose(am) }>{am}</MenuItem>)}
      
    </Menu></>)   

}


const Switcher = () => {

    const classes = useStyles();
    const {sort, flags} = useExhibitorsListContext()
    const {setSort, toggleFlag} =  useExhibitorsListUpdaterContext()
  
    return (<>
    <IconButton color="inherit" onClick={() => setSort("company.name")}>
    <SortByAlphaIcon className={sort == "company.name" ?  classes.flagged: classes.unflagged} /> 
    </IconButton>

    <IconButton color="inherit" onClick={() => setSort("profile.booth")} >
    <LocationOnIcon className={sort == "profile.booth" ?  classes.flagged: classes.unflagged} />  
    </IconButton>    

    {/* <IconButton color="inherit" onClick={() => toggleFlag("assessment") } >
    <AssessmentIcon className={flags.assessment? classes.flagged: classes.unflagged} />  
    </IconButton>    

    <IconButton color="inherit" onClick={() => toggleFlag("assignment") } >
    <AssignmentIcon className={flags.assignment? classes.flagged: classes.unflagged} />  
    </IconButton>     */}

  
              
    </>)
}


const ExhibitorsListToolbar = ({switcher=true}) => {

    const {setFiltered} = useExhibitorsListUpdaterContext()
    const {data} = useData()

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
    {switcher && <Switcher />}
    <AccountManagers />
    </div>} onSearch={setFiltered}  />
    <ExhibitorListServices />
    </div>)

}
    
    
export default ExhibitorsListToolbar;