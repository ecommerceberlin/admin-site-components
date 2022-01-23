import React from 'react'
import {
  useDatasource,
  FormControlLabel,
  Checkbox,
  get,
  Grid
} from 'eventjuicer-site-components';

import { makeStyles } from '@material-ui/core/styles';

import {clear} from './helpers'
import { useExhibitorsListContext, useExhibitorsListUpdaterContext } from './ExhibitorsListContext';


const useStyles = makeStyles((theme) => ({
  root: {
  
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
    } label={name} />)

}


const ExhibitorListServices = () => {

  const classes = useStyles()
  const tickets = useDatasource({resource: "tickets", filters: {
    filter: ticket => ticket.role === "service_external"
  }})
  return <Grid container alignItems="center" justifyContent="center" className={classes.root}>{tickets.map(ticket => <Grid item key={ticket.id}><ServiceSelector  id={ticket.id} name={clear(get(ticket, "names.pl"))}  /></Grid>)}</Grid>
}

export default React.memo(ExhibitorListServices)