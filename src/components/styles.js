import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
 
    account: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      fontWeight: 900,
      fontSize: 14,
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },

    
    flagged: {
      color: deepOrange[500],
    },
    unflagged: {
      color: "#999999",
    }
   
  }));

  
  export default useStyles