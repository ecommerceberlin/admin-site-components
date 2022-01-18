import React, {useContext} from 'react'
import {useExhibitorsListContext} from './ExhibitorsListContext'

const ExhbitorContextContainer = React.createContext({
    data: {},
    id: null
});

const ExhbitorContext = ({id, children}) => {
    const {dataById} = useExhibitorsListContext()
    return <ExhbitorContextContainer.Provider value={{id, data: dataById[id]}}>{children}</ExhbitorContextContainer.Provider>
}

export const useExhibitorContext = () => useContext(ExhbitorContextContainer)

export default ExhbitorContext