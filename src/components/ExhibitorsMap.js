import React from 'react'

import {
  Bookingmap,
  Box
} from 'eventjuicer-site-components';

import {findBoothsId} from './helpers'
import {ExhibitorsDataContext, useMapData } from './ExhibitorsListContext';
import Booth from './Booth'


const ExhibitorsMap = ({setting="bookingmap"}) => {

  const data = useMapData()

  return (
    <Box mt={2}>  
    <Bookingmap setting={setting} booth={Booth} marked={findBoothsId(data)} />
    </Box>)
} 


export default ExhibitorsMap