
import { Alert } from 'eventjuicer-site-components';
import {cateringReal, parkingReal} from './helpers'

const ExhibitorDetails = ({reps, purchases}) => {
    return <Alert type="info" content={<>Catering: <strong>{cateringReal(purchases, reps)}</strong> {` `}
    Parking: <strong>{parkingReal(purchases)}</strong></>} />
}


export default ExhibitorDetails