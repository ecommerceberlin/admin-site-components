
import { Alert, makeStyles, classNames, useSettings } from 'eventjuicer-site-components';
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

const defaultProps = {
    show_vouchers: true, 
    show_furniture: true
}


const ExhibitorRealAssignments = (props) => {

    const classes = useStyles()
    const {data:{reps, purchases, profile}} = useExhibitorContext()
    const {carpet_color} = profile
    const settings = useSettings("aggregates", {})
    const { show_vouchers, show_furniture } = Object.assign({}, defaultProps, settings, props)
    const {catering, parking, tables, chairs} = servicesRealAssignments(purchases, reps)
    
    return (<span>
            
            {show_vouchers ? <span className={classNames(classes.assignment, classes.welcomepacks )}>
                <span>Catering <strong>{catering}</strong></span>
                <span>Parking <strong>{parking}</strong></span> 
            </span>: null}
            
            {show_furniture? <span className={classNames(classes.assignment, classes.event )}>
                <span>Tables <strong>{tables}</strong></span> 
                <span>Chairs <strong>{chairs}</strong></span> 
            </span>: null}

            {carpet_color && <span className={classNames(classes.assignment )}>
            {carpet_color}
            </span>}
        </span>)
       
}


export default ExhibitorRealAssignments