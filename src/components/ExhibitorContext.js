import React, {useContext, useMemo} from 'react'
import {useData} from './ExhibitorsListContext'
import {map} from 'eventjuicer-site-components'

const ExhbitorContextContainer = React.createContext({
    data: {},
    id: null
});

const ExhbitorContext = ({id, children}) => {
    const {dataById} = useData()
    const data = dataById[id] || {}

    const value = useMemo(()=>({
            id,
            data,
            services: data.purchases.filter(item => item.role.includes("service")).map(item => item.translation_asset_id || item.___name),
            boothIds: map(data.purchases, 'formdata.id').filter(v => v && v.length),
            boothNames: map(data.purchases, 'formdata.ti').filter(v => v && v.length).join(", ")
    }), [id])
    return <ExhbitorContextContainer.Provider value={value}>{children}</ExhbitorContextContainer.Provider>
}

export const useExhibitorContext = () => useContext(ExhbitorContextContainer)

export default ExhbitorContext