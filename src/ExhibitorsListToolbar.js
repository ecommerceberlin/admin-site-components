import React, {useCallback} from 'react'
import {ToolBar, isEmpty} from 'eventjuicer-site-components';    
import { useExhibitorsListContext } from './ExhibitorsListContext';


import Button from '@material-ui/core/Button';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MessageIcon from '@material-ui/icons/Message';



const Switcher = () => {

    const {sort, setSort, flags, toggleFlag} = useExhibitorsListContext()

    const {details} = flags

    return (<div>
    <Button color="inherit" onClick={() => setSort("company.name")}>
    <SortByAlphaIcon color={sort == "company.name" ? "primary": "default"} /> 
    </Button>
    <Button color="inherit" onClick={() => setSort("profile.booth")} >
    <LocationOnIcon color={sort == "profile.booth" ? "primary": "default"} />  
    </Button>    
    <Button color="inherit" onClick={() => toggleFlag("details") } >
    <MessageIcon color={details ? "primary": "default"}/>  
    </Button>    

    </div>)
}



const ExhibitorsListToolbar = () => {

    const {data, setFiltered} = useExhibitorsListContext()
    const handleSetFiltered = useCallback((data) => setFiltered(data))

    if(isEmpty(data)){
        return null
    }

    return (<ToolBar data={data} indexes={[
        ["profile", "lname"],
        ["profile", "cname"],
        ["profile", "booth"],
        ["company", "name"]
    ]} buttons={<Switcher />} onSearch={handleSetFiltered}  />)

}
    
    
export default ExhibitorsListToolbar;