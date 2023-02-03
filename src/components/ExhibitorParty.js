

import { useExhibitorContext } from './ExhibitorContext';
import Badge from '@material-ui/core/Badge';
import LocalBarIcon from '@material-ui/icons/LocalBar';

const ExhibitorParty = () => {

    const {data:{party}, id} = useExhibitorContext()

    return (
        <Badge showZero badgeContent={party} color={party>0? "primary": "error"}>
        <LocalBarIcon />
        </Badge>
    )
}

export default ExhibitorParty