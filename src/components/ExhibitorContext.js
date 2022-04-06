import React, {useContext, useMemo} from 'react'
import {useExhibitorsDataContext} from './ExhibitorsListContext'
import {map} from 'eventjuicer-site-components'
import { groupBy, sumBy, mapValues } from 'lodash';

const ExhbitorContextContainer = React.createContext({
    data: {},
    id: null
});

const getTicketName = (item) => item.translation_asset_id || item.___name

const ExhbitorContext = ({id, children}) => {
    const {dataById} = useExhibitorsDataContext()
    const data = dataById[id] || {}

    const hasPurchases = "purchases" in data && Array.isArray(data.purchases) && data.purchases.length
//map(item => [])

    const value = useMemo(()=> {

    const servicesGroupedByName = hasPurchases? groupBy(data.purchases.filter(item => item.role.includes("service")), getTicketName) : {}
    

    return ({
        id,
        data,
        services: mapValues(servicesGroupedByName, arr => sumBy(arr, "quantity")),
        boothIds: hasPurchases? map(data.purchases, 'formdata.id').filter(v => v && v.length): [],
        boothNames: hasPurchases? map(data.purchases, 'formdata.ti').filter(v => v && v.length).join(", "): ""
    });

    }, [id, hasPurchases])

    return <ExhbitorContextContainer.Provider value={value}>{children}</ExhbitorContextContainer.Provider>
}

export const useExhibitorContext = () => useContext(ExhbitorContextContainer)

export default ExhbitorContext