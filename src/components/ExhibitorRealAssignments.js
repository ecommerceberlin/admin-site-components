
import { Alert, makeStyles, classNames } from 'eventjuicer-site-components';
import {cateringReal, parkingReal, findByPartialName} from './helpers'
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
    const {data:{reps}, services, boothIds} = useExhibitorContext()


    const cateringPurchased = findByPartialName(services, "catering");
    const cateringOfferedMax = boothIds.length * 4
    const howManyCateringVouchers = reps > cateringOfferedMax? cateringOfferedMax + cateringPurchased: Math.max(1, reps) + cateringPurchased
   
    const howManyParkingCards = (boothIds.length * 1) + findByPartialName(services, "parking");

    let howManyChairs = (boothIds.length * 2) + findByPartialName(services, "chair");
    let howManyTables = (boothIds.length * 1) + findByPartialName(services, "table");
  
    if(findByPartialName(services, "clearspace") || findByPartialName(services, "fullprint") || findByPartialName(services, "osb") ){
        howManyTables = 0
        howManyChairs = 0
    }

    return <span>
            <span className={classNames(classes.assignment, classes.welcomepacks )}>
                <span>Cateringowe <strong>{howManyCateringVouchers}</strong></span>
                <span>Parkingowe <strong>{howManyParkingCards}</strong></span> 
            </span>
            <span className={classNames(classes.assignment, classes.event )}>
                <span>Stoły <strong>{howManyTables}</strong></span> 
                <span>Krzesła <strong>{howManyChairs}</strong></span> 
            </span>
        </span>
       
 
    // console.log(data)


    // return <Alert type="info" content={<>Catering: <strong>{cateringReal(purchases, reps)}</strong> {` `}
    // Parking: <strong>{parkingReal(purchases)}</strong></>} />
}


export default ExhibitorDetails