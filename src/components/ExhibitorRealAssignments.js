
import { Alert, makeStyles, classNames } from 'eventjuicer-site-components';
import {servicesRealAssignments} from './helpers'
import {useExhibitorContext} from './ExhibitorContext'
import {red, teal} from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
    assignment: {
        borderWidth: 1,
        borderStyle: "solid",
        fontWeight: 500,
        padding: 4,
        "& span": {
            marginRight: 10
        },
        "& strong": {
            fontWeight: 900,
            fontSize: "120%"
        }
    },
    welcomepacks: {
        backgroundColor: red[200],
        borderColor: red[700],
    },
    event: {
        backgroundColor: teal[200],
        borderColor: teal[700],
    }

}))


const ExhibitorDetails = () => {

    const classes = useStyles()
    const {data:{reps, purchases}} = useExhibitorContext()

    const {catering, parking, tables, chairs} = servicesRealAssignments(purchases, reps)
    
    return (<span>
            <span className={classNames(classes.assignment, classes.welcomepacks )}>
                <span>Cateringowe <strong>{catering}</strong></span>
                <span>Parkingowe <strong>{parking}</strong></span> 
            </span>
            <span className={classNames(classes.assignment, classes.event )}>
                <span>Stoły <strong>{tables}</strong></span> 
                <span>Krzesła <strong>{chairs}</strong></span> 
            </span>
        </span>)
       
}


export default ExhibitorDetails