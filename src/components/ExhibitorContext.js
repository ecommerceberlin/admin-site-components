import React, {useContext, useMemo} from 'react'
import {useData} from './ExhibitorsListContext'

const ExhbitorContextContainer = React.createContext({
    data: {},
    id: null
});

const ExhbitorContext = ({id, children}) => {
    const {dataById} = useData()
    const value = useMemo(()=>({
            id,
            data: dataById[id]
    }), [id])
    return <ExhbitorContextContainer.Provider value={value}>{children}</ExhbitorContextContainer.Provider>
}

export const useExhibitorContext = () => useContext(ExhbitorContextContainer)

export default ExhbitorContext