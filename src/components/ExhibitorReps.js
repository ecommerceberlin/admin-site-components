

import { useExhibitorContext } from './ExhibitorContext';
import PersonIcon from '@material-ui/icons/Person';
import Badge from '@material-ui/core/Badge';


const ExhibitorReps = () => {

    const {data:{reps}, id} = useExhibitorContext()

    return (
        <Badge showZero badgeContent={reps} color={reps>0? "primary": "error"}>
        <PersonIcon />
        </Badge>
    )
}

export default ExhibitorReps