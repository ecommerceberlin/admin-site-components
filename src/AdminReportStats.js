import {
    useDatasource,
    Alert
  } from 'eventjuicer-site-components';
  
  
  import {cateringReal, parkingReal} from './helpers'

  const AdminReportStats = () => {
  
    const data = useDatasource({resource: "report"})
    
    const countTotals = () => {
      let catering = 0;
      let parking = 0;
  
      data.map(exhibitor => {
        catering = catering + cateringReal(exhibitor.purchases, exhibitor.reps);
        parking = parking + parkingReal(exhibitor.purchases)
      })
  
      return {catering, parking}
    }
  
    const totals = countTotals();
  
  
   return (<Alert content={<div>Total catering: {totals.catering}{` `}Total parking: {totals.parking}{` `}</div>} />)
  
  }
  
  
  export default AdminReportStats;