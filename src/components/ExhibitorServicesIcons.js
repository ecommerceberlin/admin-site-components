import React from 'react';
import {
  isEmpty,
} from 'eventjuicer-site-components'
import { useExhibitorContext } from './ExhibitorContext';

// import Avatar from '@material-ui/core/Avatar';
import useStyles from './styles';
// import PersonIcon from '@material-ui/icons/Person';
// import Badge from '@material-ui/core/Badge';
// import Button from '@material-ui/core/Button';
import TvIcon from '@material-ui/icons/Tv';
import TextureIcon from '@material-ui/icons/Texture';
import StoreIcon from '@material-ui/icons/Store';
import PowerIcon from '@material-ui/icons/Power';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import CategoryIcon from '@material-ui/icons/Category';

const findByPartialName = (arr, name) => arr.find(item => item.includes(name))
 
const ExhibitorServicesIcons = ( ) => {

    const {id, data} = useExhibitorContext()
    const classes = useStyles()

    if(isEmpty(data)) return null

    const {purchases} = data
    const ticket_names = purchases.filter(item => item.role.includes("service")).map(item => item.translation_asset_id || item.___name)

    const icons = []

    if(findByPartialName(ticket_names, "display")){
        icons.push( <TvIcon className={classes.icon} />)
    }

    if(findByPartialName(ticket_names, "flooring") || findByPartialName(ticket_names, "carpet")){
        icons.push( <TextureIcon className={classes.icon} />)
    }

    if(findByPartialName(ticket_names, "fullprint") || findByPartialName(ticket_names, "osb")){
        icons.push( <StoreIcon className={classes.icon} />)
    }

    if(findByPartialName(ticket_names, "electricity")){
        icons.push( <PowerIcon className={classes.icon} />)
    }

    if(findByPartialName(ticket_names, "chair")){
        icons.push( <EventSeatIcon className={classes.icon} />)
    }

    if(findByPartialName(ticket_names, "rack")){
        icons.push( <CategoryIcon className={classes.icon}  />)
    }


    return icons

}

export default ExhibitorServicesIcons