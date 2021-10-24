import {
useDatasource,
Alert,
ToolBar
} from 'eventjuicer-site-components';


import Exhibitor from './components/Exhibitor'

import {cateringReal, parkingReal} from './helpers'

const ExhibitorAlert = ({reps, purchases}) => {
return <Alert type="info" content={<>Catering: <strong>{cateringReal(purchases, reps)}</strong> {` `}
Parking: <strong>{parkingReal(purchases)}</strong></>} />
}

const PageAdminReport = ({sort, details=false}) => {

const data = useDatasource({resource: "report", filters: {
sort: sort && sort==="booth"?  "profile.booth": "company.name"
}})


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



return (<>

<ToolBar 
    data={data} 
    indexes={[
        ["profile", "lname"],
        ["profile", "cname"],
        ["profile", "booth"],
        ["company", "name"]
    ]}
    render={(filtered) => filtered.map(exhibitor => <Exhibitor 
        key={exhibitor.id} 
        details={details}
        {...exhibitor} 
        roles={["presenter","service_internal","service_external"]}
        alert={<ExhibitorAlert key={exhibitor.id} {...exhibitor} />}/>)
    } 
/>



</>)

}


export default PageAdminReport;