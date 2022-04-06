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
import Link from 'next/link'
import ExhbitorsListContext, {useData} from './components/ExhibitorsListContext';
import ExhbitorsContext, { useExhibitorContext } from './components/ExhibitorContext';

const GfxAssetLink = ({src}) => {

    if(!src || !src.includes("https")){
        return <span style={{color: "red", fontWeight: 900}}>N/A</span>
    }

    return <a href={src} target="_blank">SRC</a>


}


const WidgetExhibitorsTable = () => {

    const {data, dataById, items} = useData()

    console.log(data[0])

        return (<Box mb={2}>

            <Typography variant="h4" gutterBottom>asd</Typography>
             
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Time</TableCell>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">Position</TableCell>
                    <TableCell align="left">Company</TableCell>
               
                    <TableCell align="left">Presentation title</TableCell>
                    <TableCell align="center">Avatar</TableCell>
                    <TableCell align="center">Logotype</TableCell>
                  </TableRow>
                </TableHead>
               
                 <TableBody>
                
                
                  {data.map((row) => (
                      <ExhbitorsContext key={row.id} id={row.id}>
                        <TableRow>
                          {/* <TableCell  align="center" component="th" scope="row">
                            <Typography variant="h6">{row.presentation_time}</Typography>
                          </TableCell>
                          <TableCell align="left"><Link href={`/presenters/${row.id}`}>{row.presenter}</Link></TableCell>
                          <TableCell align="left">{row.position}</TableCell>
                          <TableCell align="left">{row.cname2}</TableCell>
                      
                          <TableCell align="left">{row.presentation_title}</TableCell>
                          <TableCell align="center"><GfxAssetLink src={row.avatar_cdn} /></TableCell>
                          <TableCell align="center"><GfxAssetLink src={row.logotype_cdn} /></TableCell> */}
                         
                        </TableRow>
                        </ExhbitorsContext>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
         
            </Box>)
    
}

const WithContext = () => <ExhbitorsListContext><WidgetExhibitorsTable/></ExhbitorsListContext>

export default WithContext