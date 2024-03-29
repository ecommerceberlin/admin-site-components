import { Grid, Box } from 'eventjuicer-site-components'
import Exhibitor from './Exhibitor'
import { useExhibitorsListContext, useData } from './ExhibitorsListContext';
import ExhibitorContext from './ExhibitorContext'
import ExhibitorRealAssignments from './ExhibitorRealAssignments';
import ExhibitorProfileErrors from './ExhibitorProfileErrors';
import ExhibitorPurchases from './ExhibitorPurchases';
import ExhibitorPerformance from './ExhibitorPerformance'
import ExhibitorDetails from './ExhibitorDetails'
import ActionButtons from './ActionButtons';


const ExhibitorList = ({roles}) => {

    const {flags} = useExhibitorsListContext()
    const {items} = useData();

    return (<div>
      {items.map(({id}) => <ExhibitorContext  key={id} id={id}>
    
      <Box mb={4}>
      <Grid container justifyContent="space-between" alignItems="center">
           <Grid item>
               <Exhibitor />
                <ExhibitorDetails />
            </Grid>
            <Grid item>
                <ActionButtons />
            </Grid>
        </Grid>
       {/* <Grid container>
           <Grid item>
               <ExhibitorPerformance active={true} />
               <ExhibitorProfileErrors active={true} />
            </Grid>
           <Grid item>
            
                <ExhibitorPurchases roles={roles} active={true} />
           </Grid>
       </Grid> */}
       </Box>
    
      </ExhibitorContext>)}</div>)


}


export default ExhibitorList


