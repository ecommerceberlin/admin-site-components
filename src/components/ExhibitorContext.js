import React, {useContext, useMemo} from 'react'
import {useExhibitorsDataContext} from './ExhibitorsListContext'
import {map} from 'eventjuicer-site-components'

const ExhbitorContextContainer = React.createContext({
    data: {},
    id: null
});

const ExhbitorContext = ({id, children}) => {
    const {dataById} = useExhibitorsDataContext()
    const data = dataById[id] || {}

    const hasPurchases = "purchases" in data && Array.isArray(data.purchases)

    const value = useMemo(()=>({
            id,
            data,
            services: hasPurchases? data.purchases.filter(item => item.role.includes("service")).map(item => item.translation_asset_id || item.___name) : [],
            boothIds: hasPurchases? map(data.purchases, 'formdata.id').filter(v => v && v.length): [],
            boothNames: hasPurchases? map(data.purchases, 'formdata.ti').filter(v => v && v.length).join(", "): ""
    }), [id, hasPurchases])

    return <ExhbitorContextContainer.Provider value={value}>{children}</ExhbitorContextContainer.Provider>
}

export const useExhibitorContext = () => useContext(ExhbitorContextContainer)

export default ExhbitorContext