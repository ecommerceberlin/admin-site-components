import React from 'react';
import {
  Grid,
  Box,
  isEmpty
} from 'eventjuicer-site-components'
import { useExhibitorContext } from './ExhibitorContext';
import ExhibitorDetailsServices from './ExhibitorDetailsServices'
import Avatar from '@material-ui/core/Avatar';
import useStyles from './styles';
import PersonIcon from '@material-ui/icons/Person';
import Badge from '@material-ui/core/Badge';
import ExhibitorDetailsLocation from './ExhibitorDetailsLocation'


const ExhibitorDetails = () => {

    const classes = useStyles()
    const {data, id,} = useExhibitorContext()

    if(isEmpty(data)){
      return null
    }

    const {account, reps} = data
  
    return (
      <Box mb={2} mt={1} ml={5}>

        <Grid container spacing={3} alignItems="center">
            <Grid item>
               <ExhibitorDetailsLocation />
            </Grid>
            {/* <Grid item>
          
            </Grid> */}
            <Grid item>
                <Avatar className={classes.accountList}>{account}</Avatar>
            </Grid>

            <Grid item>
                <Badge showZero badgeContent={reps} color={reps>0? "primary": "error"}>
                <PersonIcon />
                </Badge>
            </Grid>

            <Grid item>
              <ExhibitorDetailsServices />
           
            </Grid>

        </Grid>
      
        {/* <Typography variant="h6">
      

        </Typography> */}

       

      </Box>
    );
  };
  

export default ExhibitorDetails;
