import {useDatasource} from 'eventjuicer-site-components'

import { groupBy, sortBy } from 'lodash';
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'


const email = (id, template='') => {
    
    const avatarTrans = `c_fill,h_600,w_600,q_95,r_max`;
    const templateTrans = `g_center,x_450,y_0`;
    const logotypeTrans = `c_fit,g_center,w_750,h_450,x_375,y_0`;
  
    return `https://res.cloudinary.com/eventjuicer/image/upload/${avatarTrans}/${templateTrans},u_${template}/${logotypeTrans},l_p_${id}_logotype/p_${id}_avatar.png`;
    
};



const useStyles = makeStyles(theme => ({
    root: {
        width: 500,
        fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`
    }
}))


const WidgetPresentersTable = () => {

    const classes = useStyles()
    const datasource = useDatasource({
        resource: "presenters"
    })

    const items = groupBy(datasource, "presentation_venue")
    const venues = Object.keys(items).sort()
    console.log(venues)

    return venues.map(venue => {

        const rows = sortBy(items[venue] || {}, "presentation_time")


        return (<Box key={venue} mb={2}>
            <Typography variant="h4" gutterBottom>{venue}</Typography>
        
            <Box className={classes.root}>
                 
                  {rows.map((row) => (<Box> <img src={ email(row.id, "bg_1800_750_white") } alt="" style={{ maxHeight: 500,  maxWidth: 500}} /></Box> ))}
               
     
            </Box>
        
        
        
            </Box>)
    })
}

export default WidgetPresentersTable