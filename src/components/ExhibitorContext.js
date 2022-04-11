import React, {useContext, useMemo} from 'react'
import {useExhibitorsDataContext} from './ExhibitorsListContext'
import {map} from 'eventjuicer-site-components'
import { groupBy, sumBy, mapValues } from 'lodash';
import {servicesSummedUp} from './helpers'

const ExhbitorContextContainer = React.createContext({
    data: {},
    id: null
});


const ExhbitorContext = ({id, children}) => {
    
    const {dataById} = useExhibitorsDataContext()
    const data = dataById[id] || {}
    const hasPurchases = "purchases" in data && Array.isArray(data.purchases) && data.purchases.length

    const value = useMemo(()=> {
    
    return ({
        id,
        data,
        services: hasPurchases? servicesSummedUp(data.purchases): {},
        boothIds: hasPurchases? map(data.purchases, 'formdata.id').filter(v => v && v.length): [],
        boothNames: hasPurchases? map(data.purchases, 'formdata.ti').filter(v => v && v.length).join(", "): ""
    });

    }, [id, hasPurchases])

    return <ExhbitorContextContainer.Provider value={value}>{children}</ExhbitorContextContainer.Provider>
}

export const useExhibitorContext = () => useContext(ExhbitorContextContainer)

export default ExhbitorContext