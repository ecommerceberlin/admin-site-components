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
  Button
} from 'eventjuicer-site-components'
import { useExhibitorContext } from './ExhibitorContext';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Avatar from '@material-ui/core/Avatar';
import useStyles from './styles';

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
      <Box mb={2}>

        <Grid container spacing={3}>
            <Grid item>
                <Button size="large" startIcon={ <LocationOnIcon /> } onClick={handleDialog}>{selectedBoothNames()}</Button>
            </Grid>
            <Grid item>
            <Grid item>
                {reps}
            </Grid>
            </Grid>
            <Grid item>
                <Avatar className={classes.account}>{account}</Avatar>
            </Grid>
        </Grid>
      
        {/* <Typography variant="h6">
      

        </Typography> */}

       

      </Box>
    );
  };
  

export default ExhibitorDetails;
