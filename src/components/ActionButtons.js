
import Button from '@material-ui/core/Button'
import { useExhibitorContext } from "./ExhibitorContext"
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
const ActionButtons = () => {
    const {data, id} = useExhibitorContext()

    const handleProblem = () => {
        window.alert("not yet implemented")
    }

    return <Button startIcon={<ReportProblemIcon />} onClick={handleProblem} variant="contained" size="large">PROBLEM?</Button>

}


export default ActionButtons