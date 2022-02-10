import React from 'react';
import {
  Typography,
  Grid,
  Box,
  useDialog,
  Wrapper,
  map,
  isEmpty,
  // Button
  Bookingmap
} from 'eventjuicer-site-components'
import { useExhibitorContext } from './ExhibitorContext';
import ExhibitorServicesIcons from './ExhibitorDetailsServices'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Avatar from '@material-ui/core/Avatar';
import useStyles from './styles';
import PersonIcon from '@material-ui/icons/Person';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import BoothAdmin from './BoothAdmin'

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
    const {data, id, boothNames, boothIds} = useExhibitorContext()

    if(isEmpty(data)){
      return null
    }

    const {company} = data
    const {mapSetting} = Object.assign({}, defaultProps, props);
    const { name } = company;
  
    const handleDialog = (e) => {
      e.preventDefault()
      dialog({
        title: `Location for ${name}`,
        content: <Wrapper><Bookingmap booth={BoothAdmin} setting={mapSetting} marked={boothIds} /></Wrapper>,
        width: "xl"
      })
    }

    return (
      <Button size="medium" variant="outlined" startIcon={ <LocationOnIcon /> } onClick={handleDialog}>{boothNames}</Button>
    );
  };
  

export default ExhibitorDetails;
