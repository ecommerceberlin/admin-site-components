
import ExhbitorsListContext from './components/ExhibitorsListContext';
import ExhibitorsListToolbar from './components/ExhibitorsListToolbar';
import ExhibitorsList from './components/ExhibitorsList';
import NumberOfRecords from './components/NumberOfRecords';

const WidgetExhibitorList = ({roles=["presenter","service_internal","service_external"]}) => {

    return (
        <ExhbitorsListContext>
        <ExhibitorsListToolbar />
        <NumberOfRecords  />
        <ExhibitorsList roles={roles}  />
        </ExhbitorsListContext>
    )

}


export default WidgetExhibitorList