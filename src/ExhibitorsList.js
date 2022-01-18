import {useEffect} from 'react'
import Exhibitor from './components/Exhibitor'
import { useExhibitorsListContext } from './ExhibitorsListContext';
import {processArrayData, isEmpty} from 'eventjuicer-site-components'
import ExhibitorContext from './ExhibitorContext'
import ExhibitorRealAssignments from './components/ExhibitorRealAssignments';
import ExhibitorProfileErrors from './components/ExhibitorProfileErrors';
import ExhibitorPurchases from './components/ExhibitorPurchases';
import NumberOfRecords from './components/NumberOfRecords';

const ExhibitorList = ({roles}) => {

    const {data, account, filtered, sort, flags, setFlags} = useExhibitorsListContext()
    const finalData = !isEmpty(account) ? data: filtered
    const filter = !isEmpty(account)? (item)=>item.account == account: null
    const items = processArrayData(finalData, {sort, filter})

    useEffect(()=>{
        //remember flags state!
    },[filtered.length])

    return (<div>
       <NumberOfRecords count={items.length} />{items.map(({id}) => <ExhibitorContext  key={id} id={id}>
       <Exhibitor />
       <ExhibitorProfileErrors active={flags.assessment} />
       <ExhibitorRealAssignments active={flags.assignment} />
       <ExhibitorPurchases roles={roles} active={flags.assignment} />
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

