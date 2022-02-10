import Avatar from '@material-ui/core/Avatar';
import { useExhibitorContext } from './ExhibitorContext';
import useStyles from './styles';


const ExhibitorAccount = () => {

    const classes = useStyles()
    
    const {data:{account}, id} = useExhibitorContext()

    return (<Avatar className={classes.accountList}>{account}</Avatar>)
}


export default ExhibitorAccount