
import Grid from '@material-ui/core/Grid';
import ExhibitorContext, { useExhibitorContext } from "./ExhibitorContext"
import {ExhibitorsDataContext} from './ExhibitorsListContext'
import Exhibitor from './Exhibitor'
import ExhibitorDetails from './ExhibitorDetails'
import ActionButtons from './ActionButtons';

/**
 * 

boothIds: ['booth-168-966']
boothNames: "A1.4"
data:
account: "DK"
company: {name: 'eClear AG', keywords: Array(3), lang: 'en', password: ''}
company_id: 1972
errors: []
id: 133497
meetups: 0
party: 0
profile: {fname: 'Karolina', lname: 'Protas', cname: 'eClear', phone: '+4930235907131', booth: 'A1.4'}
purchases: (2) [{…}, {…}]
reps: 0
[[Prototype]]: Object
id: 133497
services: ['resources.upgrades.misc.electricity']

 */


const BoothDialog = () => {

    const {services, data, boothNames} = useExhibitorContext()

    return (<Grid container spacing={4} justifyContent="space-between" alignItems="center">
        <Grid item>
            <Exhibitor />
            <ExhibitorDetails />
        </Grid>
        <Grid item><ActionButtons /></Grid>
    </Grid>)

}


const BoothDialodWithContext = ({participant_id}) => (<ExhibitorsDataContext>
    <ExhibitorContext id={participant_id}><BoothDialog /></ExhibitorContext>
    </ExhibitorsDataContext>)

export default BoothDialodWithContext