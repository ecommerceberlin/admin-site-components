import { useExhibitorsListContext } from "./ExhibitorsListContext";
import {Alert} from 'eventjuicer-site-components'
import Typography from '@material-ui/core/Typography'


const NumberOfRecords = ({count}) => {

    const {data} = useExhibitorsListContext()
 
 return ( <Alert variant="filled" type="info" content={ `${count} record(s) found`} />)


}

export default NumberOfRecords