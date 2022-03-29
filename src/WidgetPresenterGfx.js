import {useDatasource} from 'eventjuicer-site-components'

import { groupBy, sortBy } from 'lodash';
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'



const GfxAssetLink = ({src}) => {

    if(!src || !src.includes("https")){
        return <span style={{color: "red", fontWeight: 900}}>N/A</span>
    }

    return <a href={src} target="_blank">SRC</a>


}


const WidgetPresenterGfx = ({id}) => {

    const datasource = useDatasource({
        resource: "presenters"
    })

    const lookup = (datasource || []).find(item => item.id == id) || {}
    const {presenter, cname2, position, presentation_time, presentation_venue} = lookup
    
    
    console.log({presenter})

    const items = groupBy(datasource, "presentation_venue")
    const venues = Object.keys(items).sort()
    console.log(venues)

   return <div>asd</div>
}

export default WidgetPresenterGfx