

import { useExhibitorContext } from './ExhibitorContext';
import Badge from '@material-ui/core/Badge';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import {useSettings} from "eventjuicer-site-components"

const ExhibitorParty = () => {

    const {show_party} = useSettings("staff.exhibitor.details", {})
    const {data:{party}, id} = useExhibitorContext()

    if(!show_party){
        return false
    }

    return (
        <Badge showZero badgeContent={party} color={party>0? "primary": "error"}>
        <LocalBarIcon />
        </Badge>
    )
}

export default ExhibitorParty