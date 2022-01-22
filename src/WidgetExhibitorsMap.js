
import ExhbitorsListContext from './components/ExhibitorsListContext';
import ExhibitorsListToolbar from './components/ExhibitorsListToolbar';
import ExhibitorsMap from './components/ExhibitorsMap';
const WidgetExhibitorsMap = ({roles=["presenter","service_internal","service_external"]}) => {

    return (
        <ExhbitorsListContext>
        <ExhibitorsListToolbar switcher={false} />
        <ExhibitorsMap roles={roles}  />
        </ExhbitorsListContext>
    )

}


export default WidgetExhibitorsMap