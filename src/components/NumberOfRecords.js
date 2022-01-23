import { useData } from "./ExhibitorsListContext";
import {Alert} from 'eventjuicer-site-components'

const NumberOfRecords = ({show_when_filtered = false}) => {

    const {items, isFiltered} = useData()

    if(isFiltered && show_when_filtered){

    }

 return ( <Alert variant="filled" type="info" content={ `${items.length} record(s) found`} />)


}

export default NumberOfRecords