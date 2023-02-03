import React from 'react';
import {
  isEmpty,
} from 'eventjuicer-site-components'
import { useExhibitorContext } from './ExhibitorContext';
import {findByPartialName} from './helpers'
import useStyles from './styles';
import Badge from '@material-ui/core/Badge';
import TvIcon from '@material-ui/icons/Tv';
import TextureIcon from '@material-ui/icons/Texture';
import StoreIcon from '@material-ui/icons/Store';
import PowerIcon from '@material-ui/icons/Power';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import CategoryIcon from '@material-ui/icons/Category';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import NoteIcon from '@material-ui/icons/Note';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import ClearIcon from '@material-ui/icons/Clear';
import LocalBarIcon from '@material-ui/icons/LocalBar';


const labelToIcon = {
    display: TvIcon,
    flooring: TextureIcon,
    carpet: TextureIcon,
    fullprint: StoreIcon,
    osb: StoreIcon,
    electricity: PowerIcon,
    highvoltage: FlashOnIcon,
    chair: EventSeatIcon,
    table: FiberManualRecordIcon,
    rack: CategoryIcon,
    leaflet: NoteIcon,
    catering: RestaurantMenuIcon,
    parking: DirectionsCarIcon,
    clearspace: ClearIcon,
    party: LocalBarIcon
}


 
const IconWithBadge = ({icon, sum}) => {

    const classes = useStyles()
    
    return (<Badge className={classes.icon} badgeContent={sum>1? sum: 0} color="primary">{React.createElement(icon)}</Badge>)
} 

const ExhibitorServices = ( ) => {

    const {id, data, services} = useExhibitorContext()

    if(isEmpty(data)) return null
    

    const icons = []

    Object.keys(labelToIcon).forEach(partialName => {

        const sum = findByPartialName(services, partialName)
        if( sum ){
            icons.push( <IconWithBadge key={partialName} icon={labelToIcon[partialName]} sum={sum} /> )
        }

    })

    return icons

}

export default ExhibitorServices