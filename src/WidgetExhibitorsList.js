
import ExhbitorsListContext from './ExhibitorsListContext';
import ExhibitorsListToolbar from './ExhibitorsListToolbar';
import ExhibitorsList from './ExhibitorsList';
import ExhibitorDetails from './ExhibitorDetails';

const WidgetExhibitorList = () => {

    return (
        <ExhbitorsListContext>
        <ExhibitorsListToolbar />
        <ExhibitorsList panel={(exhibitor) => <ExhibitorDetails key={exhibitor.id} {...exhibitor} />} />
        </ExhbitorsListContext>
    )

}


export default WidgetExhibitorList