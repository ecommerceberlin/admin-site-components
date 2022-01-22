import React from 'react'

import {
  Bookingmap,
  Box
} from 'eventjuicer-site-components';

import {findBoothsId} from './helpers'
import { useMapData } from './ExhibitorsListContext';


const ExhibitorsMap = () => {

  const data = useMapData()

  return (
    <Box mt={2}>   
   <Bookingmap setting="bookingmap" marked={findBoothsId(data)} />
 </Box>)
} 


export default ExhibitorsMap