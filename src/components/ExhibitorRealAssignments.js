
import { Alert } from 'eventjuicer-site-components';
import {cateringReal, parkingReal} from '../helpers'
import {useExhibitorContext} from '../ExhibitorContext'

const ExhibitorDetails = ({active}) => {
    const {data, id} = useExhibitorContext()

    if(!active){
        return null
    }

    const {purchases, reps} = data
    return <Alert type="info" content={<>Catering: <strong>{cateringReal(purchases, reps)}</strong> {` `}
    Parking: <strong>{parkingReal(purchases)}</strong></>} />
}


export default ExhibitorDetails