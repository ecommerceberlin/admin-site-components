
import { Alert, makeStyles } from 'eventjuicer-site-components';
import {cateringReal, parkingReal, findByPartialName} from './helpers'
import {useExhibitorContext} from './ExhibitorContext'
import {red} from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
    red: {
        backgroundColor: red[200],
        borderWidth: 1,
        borderColor: red[700],
        borderStyle: "solid",
        fontWeight: 900,
        padding: 4,
        "& span": {
            marginRight: 10
        }
    }
}))


const ExhibitorDetails = () => {

    const classes = useStyles()
    const {data:{reps}, services, boothIds} = useExhibitorContext()

    const cateringRealMax = (boothIds.length * 4) + findByPartialName(services, "catering");
    let howManyCateringVouchers = reps > cateringRealMax? cateringRealMax: reps;
    if(howManyCateringVouchers < 3){
        howManyCateringVouchers = 2
    }

    const howManyParkingCards = (boothIds.length * 1) + findByPartialName(services, "parking");

    let howManyChairs = (boothIds.length * 2) + findByPartialName(services, "chair");
    let howManyTables = (boothIds.length * 1) + findByPartialName(services, "table");
  
    if(findByPartialName(services, "clearspace") || findByPartialName(services, "fullprint") || findByPartialName(services, "osb") ){
        howManyTables = 0
        howManyChairs = 0
    }

    return <span className={classes.red}>
        <span>Cateringowe <strong>{howManyCateringVouchers}</strong></span>
        <span>Parkingowe <strong>{howManyParkingCards}</strong></span> 
        <span>Stoły <strong>{howManyTables}</strong></span> 
        <span>Krzesła <strong>{howManyChairs}</strong></span> 
    </span>
 
    // console.log(data)


    // return <Alert type="info" content={<>Catering: <strong>{cateringReal(purchases, reps)}</strong> {` `}
    // Parking: <strong>{parkingReal(purchases)}</strong></>} />
}


export default ExhibitorDetails