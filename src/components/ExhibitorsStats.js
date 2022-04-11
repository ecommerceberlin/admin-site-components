import {
  useDatasource,
  Alert
} from 'eventjuicer-site-components';

import {cateringReal, parkingReal} from './helpers'
import { uniqBy } from 'lodash';
import {servicesSummedUp, findByPartialName} from './helpers'


  const AdminReportStats = () => {
  
    const data = useDatasource({resource: "report"})
    const unique = uniqBy(data, "company_id")
    
    const countTotals = () => {
      let catering = 0;
      let parking = 0;
  
      unique.map(company => {

        const _servicesSummedUp = servicesSummedUp(company.purchases)
        
        console.log(_servicesSummedUp)
        catering = catering + cateringReal(company.purchases, company.reps);
        parking = parking + parkingReal(company.purchases)
      })
  
      return {catering, parking}
    }
  
    const totals = countTotals();
  
  
   return (<Alert content={<div>Total catering: {totals.catering}{` `}Total parking: {totals.parking}{` `}</div>} />)
  
  }
  
  
  export default AdminReportStats;