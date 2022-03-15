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


const GfxAssetLink = ({src}) => {

    if(!src || !src.includes("https")){
        return <span style={{color: "red", fontWeight: 900}}>N/A</span>
    }

    return <a href={src} target="_blank">SRC</a>


}


const WidgetPresenters = () => {

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
            
        
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Time</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Company</TableCell>
                    <TableCell align="center">Position</TableCell>
                    
                    <TableCell align="center">Avatar</TableCell>
                    <TableCell align="center">Logotype</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell  align="center" component="th" scope="row">
                            <Typography variant="h6">{row.presentation_time}</Typography>
                          </TableCell>
                          <TableCell align="center">{row.presenter}</TableCell>
                          <TableCell align="center">{row.cname2}</TableCell>
                          <TableCell align="center">{row.position}</TableCell>
                          <TableCell align="center"><GfxAssetLink src={row.avatar_cdn} /></TableCell>
                          <TableCell align="center"><GfxAssetLink src={row.logotype_cdn} /></TableCell>
                         
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
        
        
        
            </Box>)
    })
}

export default WidgetPresenters