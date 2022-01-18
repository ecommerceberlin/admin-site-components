import React from 'react';
 

import {
  Typography,
  Grid,
  Box,
  useDialog,
  Wrapper,
  map,
  Bookingmap,
  isEmpty
} from 'eventjuicer-site-components'
import { useExhibitorContext } from '../ExhibitorContext';


const defaultProps = {

  show_mobilepass: false,
  show_partyticket: false,
  mapSetting: "bookingmap",
  roles: [],
  alert: null,
  details: false
}

const Exhibitor = ({setting, ...props}) => {

    const dialog = useDialog()
    const {data, id} = useExhibitorContext()

    if(isEmpty(data)){
      return null
    }

    const {account, company, profile, errors, reps, party, meetups, purchases} = data

    const {
      show_mobilepass,
      show_partyticket,
      mapSetting,
      alert,
      details
    } = Object.assign({}, defaultProps, props);

    const { name, password, keywords, lang } = company;
    const { booth, fname, lname, phone, cname } = profile;
   

    const handleDialog = (e) => {
      e.preventDefault()
      dialog({
        title: "location",
        content: <Wrapper><Bookingmap setting={mapSetting} marked={selectedBoothIds()} /></Wrapper>,
        width: "xl"
      })
    }

    const selectedBoothIds = () => map(purchases, 'formdata.id').filter(v => v && v.length);
    const selectedBoothNames = () => map(purchases, 'formdata.ti').filter(v => v && v.length).join(", ");
   

    return (
      <Box mt={2}>

        <Grid container spacing={2} alignItems="flex-end">
        <Grid item>
        <Typography variant="h4">{name}</Typography>
        </Grid>
        <Grid item>
        <Typography variant="h6"><a href="#" onClick={handleDialog}>{selectedBoothNames()}</a></Typography>
        </Grid>
        <Grid item>
        <Typography variant="subtitle1">{cname}, {fname} {lname} {phone}</Typography>
        </Grid>
        </Grid>

        {details ? <>{alert}<Grid container spacing={2}>
        <Grid item><strong>Reps: {reps}</strong></Grid>
        {show_mobilepass &&  <Grid item><strong>{password}</strong></Grid>}
        {show_partyticket && <strong>Party: {party}</strong>}
        <Grid item>Meetups: {meetups}</Grid>
        </Grid>
    
       
        </>: null}

      </Box>
    );
  };
  

export default Exhibitor;


/***
 * 
 * 
 * @{account}; {lang}
 * 
       
        {show_partyticket && <Text template={party > 2 ? 'benefitsTextError' : 'benefitsText'}></Text>}
       


 */