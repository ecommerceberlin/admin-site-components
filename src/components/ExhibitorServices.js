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
 
const ExhibitorServices = ( ) => {

    const {id, data, services} = useExhibitorContext()
    const classes = useStyles()

    if(isEmpty(data)) return null
    
    const icons = []

    if(findByPartialName(services, "display")){
        icons.push( <TvIcon key="a" className={classes.icon} />)
    }

    if(findByPartialName(services, "flooring") || findByPartialName(services, "carpet")){
        icons.push( <TextureIcon key="b" className={classes.icon} />)
    }

    if(findByPartialName(services, "fullprint") || findByPartialName(services, "osb")){
        icons.push( <StoreIcon key="c" className={classes.icon} />)
    }

    if(findByPartialName(services, "electricity") || findByPartialName(services, "highvoltage")){
        icons.push( <PowerIcon key="d" className={classes.icon} />)
    }

    if(findByPartialName(services, "chair")){
        icons.push( <EventSeatIcon key="e" className={classes.icon} />)
    }

    if(findByPartialName(services, "rack")){
        icons.push( <CategoryIcon key="f" className={classes.icon}  />)
    }


    return icons

}

export default ExhibitorServices