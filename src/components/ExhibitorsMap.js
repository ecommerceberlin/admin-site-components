import React from 'react'

import {
  Bookingmap,
  Box
} from 'eventjuicer-site-components';

import {findBoothsId} from './helpers'
import { useMapData } from './ExhibitorsListContext';
import BoothAdmin from './BoothAdmin'

const ExhibitorsMap = ({setting="bookingmap"}) => {

  const data = useMapData()

  return (
    <Box mt={2}>   
   <Bookingmap setting={setting} booth={BoothAdmin} marked={findBoothsId(data)} />
 </Box>)
} 


export default ExhibitorsMap