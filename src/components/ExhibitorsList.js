import {useEffect} from 'react'
import Exhibitor from './Exhibitor'
import { useExhibitorsListContext, useData } from './ExhibitorsListContext';
import { Grid, Box } from 'eventjuicer-site-components'
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
       <Grid container>
           <Grid item>
               <ExhibitorPerformance active={flags.assessment} />
               <ExhibitorProfileErrors active={flags.assessment} />
            </Grid>
           <Grid item>
                <ExhibitorRealAssignments active={flags.assignment} />
                <ExhibitorPurchases roles={roles} active={flags.assignment} />
           </Grid>
       </Grid>
       </Box>
    
      </ExhibitorContext>)}</div>)


}


export default ExhibitorList





//parse params!

//   const { query } = props;
//   const { range, sort, service } = query;

//   const sorting = sort === 'booth' ? 'profile.booth' : 'company.name';

//   let _filter =
//     range && range.length > 0
//       ? function(item) {
//           return (
//             'booth' in item.profile &&
//             item.profile.booth &&
//             range.split(',').includes(item.profile.booth.trim().charAt(0))
//           );
//         }
//       : function() {
//           return true;
//         };

//   const filterByService = function(item) {
//     return (
//       'purchases' in item &&
//       Array.isArray(item.purchases) &&
//       item.purchases.filter(p => p.role === 'service_' + service).length
//     );
//   };

