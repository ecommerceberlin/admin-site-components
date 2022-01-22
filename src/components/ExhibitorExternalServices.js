import React from 'react'
import {
  useDatasource,
  FormControlLabel,
  Checkbox,
  get,
  Box
} from 'eventjuicer-site-components';

import { makeStyles } from '@material-ui/core/styles';

import {clear} from './helpers'
import { useExhibitorsListContext, useExhibitorsListUpdaterContext } from './ExhibitorsListContext';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

const ServiceSelector = ({id, name, color="primary"}) => {

    const {services} = useExhibitorsListContext()
    const {setService} =  useExhibitorsListUpdaterContext()

    // console.log(services)
    
    return (<FormControlLabel control={
      <Checkbox
      id={String(id)}
      checked={services.includes(id)}
      onChange={() => setService(id)}
      name={name}
      color={color}
      />
    }
    label={name}
    />)

}


const ExternalServices = () => {

  const classes = useStyles()
  const tickets = useDatasource({resource: "tickets", filters: {
    filter: ticket => ticket.role === "service_external"
  }})
  return <Box p={3} className={classes.root}>{tickets.map(ticket => <ServiceSelector key={ticket.id} id={ticket.id} name={clear(get(ticket, "names.pl"))}  />)}</Box>
}

export default React.memo(ExternalServices)