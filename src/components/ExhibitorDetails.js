import React from 'react';
import {
  Grid,
  Box,
  isEmpty
} from 'eventjuicer-site-components'
import { useExhibitorContext } from './ExhibitorContext';

import ExhibitorLocation from './ExhibitorLocation'
import ExhibitorAccount from './ExhibitorAccount';
import ExhibitorServices from './ExhibitorServices'
import ExhibitorReps from './ExhibitorReps'
import ExhibitorParty from './ExhibitorParty'
import ExhibitorRealAssignments from './ExhibitorRealAssignments'

const ExhibitorDetails = () => {

    const {data, id,} = useExhibitorContext()

    if(isEmpty(data)){
      return null
    }
  
    return (
      <Box mb={2} mt={1} ml={5}>
        <Grid container spacing={3} alignItems="center">
            <Grid item>
               <ExhibitorLocation />
            </Grid>
            {/* <Grid item>
            </Grid> */}
            <Grid item>
                <ExhibitorAccount />
            </Grid>

            <Grid item>
              <ExhibitorReps />
              <ExhibitorParty />
            </Grid>

            <Grid item>
              <ExhibitorServices />
            </Grid>

            <Grid item>
              <ExhibitorRealAssignments />
            </Grid>

        </Grid>
      
        {/* <Typography variant="h6">
      

        </Typography> */}

    
      </Box>
    );
  };
  

export default ExhibitorDetails;
