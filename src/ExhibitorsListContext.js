import React, {useState, useReducer, useContext, useEffect, useCallback} from 'react'
import {useDatasource, isEmpty, processArrayData} from 'eventjuicer-site-components'

const ExhbitorsListContextContainer = React.createContext({
    data: [],
    filtered: [],
    // setFiltered: () => {},
    // sort: "",
    // setSort: () => {}
});


function reducer(state, action) {
    if(action.type in state){
        return {...state, [action.type]: !state[action.type]}
    }else{
        return {...state, [action.type]: true}
    }
}

const useToggler = (initialState) => {
    const [state, dispatchToggleFlag] = useReducer(reducer, initialState);
    const toggleFlag = useCallback(
        (type, payload) => dispatchToggleFlag({type, payload})
    )
    return [state, toggleFlag]
}

const ExhibitorsListContext = ({resource="report", children, defaultSort = "company.name"}) => {

    const [sort, setSort] = useState(defaultSort)
    // const [flags, toggleFlag] = useState([])
    const [flags, toggleFlag] = useToggler({details: false})
    const [filtered, setFiltered] = useState([])
    const data = useDatasource({resource, filters: {sort: defaultSort}})

  
    console.log("flags stage", flags)

    useEffect(()=>{
        if(isEmpty(filtered)){
            setFiltered(data)
        }
    }, [data])

    return (<ExhbitorsListContextContainer.Provider value={{data, filtered, flags, sort, setSort, setFiltered, toggleFlag}}>{children}</ExhbitorsListContextContainer.Provider>)
}

//sort && sort==="booth"?  "profile.booth": "company.name"

export const useExhibitorsListContext = () => useContext(ExhbitorsListContextContainer)

export default ExhibitorsListContext