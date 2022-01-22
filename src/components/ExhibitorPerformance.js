
import { Alert, Grid } from 'eventjuicer-site-components';
import {useExhibitorContext} from './ExhibitorContext'

const ExhibitorPerformance = ({active}) => {
    const {data, id} = useExhibitorContext()
    const {reps, meetups} = data

    if(!active){
        return null
    }

    return (<Grid container spacing={2}>
        <Grid item><strong>Reps: {reps}</strong></Grid>
        {/* <Grid item><strong>{password}</strong></Grid> */}
        {/* <strong>Party: {party}</strong> */}
        <Grid item>Meetups: {meetups}</Grid>
        </Grid>
    )

}


export default ExhibitorPerformance