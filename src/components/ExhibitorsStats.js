import {
  useDatasource,
  Alert,
  Box
} from 'eventjuicer-site-components';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'

import {countTotals} from './helpers'

  const AdminReportStats = () => {
  
    const data = useDatasource({resource: "report"})
    const totals = countTotals(data);
  
    return (
      <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Service</TableCell>
            <TableCell align="left">Total</TableCell>
          </TableRow>
        </TableHead>
         <TableBody>
         {Object.keys(totals).map(total =>  <TableRow>
           <TableCell>{total}</TableCell>
           <TableCell> {totals[total]} </TableCell>
           </TableRow>)}
          </TableBody>
        </Table>
        </TableContainer>
    )

  
  
  }
  
  
  export default AdminReportStats;