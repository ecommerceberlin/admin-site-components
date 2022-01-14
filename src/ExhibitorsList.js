
import Exhibitor from './components/Exhibitor'
import { useExhibitorsListContext } from './ExhibitorsListContext';
import {processArrayData, isFunction} from 'eventjuicer-site-components'

const ExhibitorList = ({panel}) => {

    const {filtered, sort, flags} = useExhibitorsListContext()

    return processArrayData(filtered, {sort}).map(exhibitor => <Exhibitor 
        key={exhibitor.id} 
        details={ flags.details }
        {...exhibitor} 
        roles={["presenter","service_internal","service_external"]}
        alert={ isFunction(panel)? panel(exhibitor): null }/>
    )


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
