import React from 'react';
import {
  Typography,
  Grid,
  Box,
  useDialog,
  Wrapper,
  map,
  Bookingmap,
  isEmpty,
  // Button
} from 'eventjuicer-site-components'
import { useExhibitorContext } from './ExhibitorContext';
import ExhibitorServicesIcons from './ExhibitorServicesIcons'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Avatar from '@material-ui/core/Avatar';
import useStyles from './styles';
import PersonIcon from '@material-ui/icons/Person';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';

const defaultProps = {

  show_mobilepass: false,
  show_partyticket: false,
  mapSetting: "bookingmap",
  roles: [],
  alert: null,
  details: false
}

const ExhibitorDetails = ({setting, ...props}) => {

    const classes = useStyles()
    const dialog = useDialog()
    const {data, id} = useExhibitorContext()

    if(isEmpty(data)){
      return null
    }

    const {account, company, purchases, reps} = data
    const {mapSetting} = Object.assign({}, defaultProps, props);
    const { name } = company;
  
    const selectedBoothIds = () => map(purchases, 'formdata.id').filter(v => v && v.length);
    const selectedBoothNames = () => map(purchases, 'formdata.ti').filter(v => v && v.length).join(", ");
      
    const handleDialog = (e) => {
      e.preventDefault()
      dialog({
        title: `Location for ${name}`,
        content: <Wrapper><Bookingmap setting={mapSetting} marked={selectedBoothIds()} /></Wrapper>,
        width: "xl"
      })
    }

    return (
      <Box mb={2} mt={1} ml={5}>

        <Grid container spacing={3} alignItems="center">
            <Grid item>
                <Button size="medium" variant="outlined" startIcon={ <LocationOnIcon /> } onClick={handleDialog}>{selectedBoothNames()}</Button>
            </Grid>
            <Grid item>
          
            </Grid>
            <Grid item>
                <Avatar className={classes.accountList}>{account}</Avatar>
            </Grid>

            <Grid item>
                <Badge showZero badgeContent={reps} color={reps>0? "primary": "error"}>
                <PersonIcon />
                </Badge>
            </Grid>

            <Grid item>
              <ExhibitorServicesIcons />
           
            </Grid>

        </Grid>
      
        {/* <Typography variant="h6">
      

        </Typography> */}

       

      </Box>
    );
  };
  

export default ExhibitorDetails;
