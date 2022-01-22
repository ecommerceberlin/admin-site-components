import React from 'react';
import {
  Typography,
  Grid,
  Box,
  useDialog,
  isEmpty
} from 'eventjuicer-site-components'
import { useExhibitorContext } from './ExhibitorContext';


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

    const {company, profile} = data

    const { name, password, keywords, lang } = company;
    const { booth, fname, lname, phone, cname } = profile;

    return (
      <Box mt={2}>

        <Grid container spacing={2} alignItems="flex-end">
        <Grid item>
        <Typography variant="h4">{name}</Typography>
        </Grid>
        <Grid item>
        <Typography variant="subtitle1">{cname}</Typography>
        </Grid>
        </Grid>
      
      </Box>
    );
  };
  

export default React.memo(Exhibitor);


/***
 * 
 * 
 * @{account}; {lang}
 * 
       
        {show_partyticket && <Text template={party > 2 ? 'benefitsTextError' : 'benefitsText'}></Text>}
       


 */