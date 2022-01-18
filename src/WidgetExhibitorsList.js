
import ExhbitorsListContext from './ExhibitorsListContext';
import ExhibitorsListToolbar from './ExhibitorsListToolbar';
import ExhibitorsList from './ExhibitorsList';

const WidgetExhibitorList = ({roles=["presenter","service_internal","service_external"]}) => {

    return (
        <ExhbitorsListContext>
        <ExhibitorsListToolbar />
        <ExhibitorsList roles={roles}  />
        </ExhbitorsListContext>
    )

}


export default WidgetExhibitorList