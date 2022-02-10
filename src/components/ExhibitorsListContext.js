import React, {useState, useReducer, useContext, useEffect, useCallback, useMemo} from 'react'
import {useDatasource, isEmpty, keyBy, processArrayData} from 'eventjuicer-site-components'
import {filterExhibitorByTicketsIds} from './helpers'


const ExhbitorsDataContextContainer = React.createContext();
const ExhbitorsListContextContainer = React.createContext();
const ExhbitorsListUpdaterContextContainer = React.createContext();


function reducer(state, action) {
    if(action.type in state){
        return {...state, [action.type]: !state[action.type]}
    }else{
        return {...state, [action.type]: true}
    }
}

const useToggler = (initialState = {}) => {
    const [state, dispatchToggleFlag] = useReducer(reducer, initialState);
    const toggleFlag = useCallback(
        (type, payload) => dispatchToggleFlag({type, payload})
    )
    return [state, toggleFlag]
}


export const ExhibitorsDataContext = ({resource="report", defaultSort="company.name", children}) => {
    const data = useDatasource({resource, filters: {sort: defaultSort}})
    const value = useMemo(() => ({
        data,
        dataById: keyBy(data, "id"),
    }), [data])
    
    return (<ExhbitorsDataContextContainer.Provider value={value}>{children}</ExhbitorsDataContextContainer.Provider>)
}

export const ExhibitorsListContext = ({defaultSort="company.name", children}) => {
    const [services, _setServices] = useState([])
    const [sort, _setSort] = useState(defaultSort)
    const [account, _setAccount] = useState(null)
    const [flags, toggleFlag] = useToggler()
    const [filtered, _setFiltered] = useState([])

    const setSort = useCallback((sort)=> _setSort(sort))
    const setAccount = useCallback(account => _setAccount(account))
    const setService = useCallback((id) => _setServices(services.includes(id) ? [...services.filter(item => item!=id)] : [...services, id]))
    const clearServices = useCallback(() => _setServices([]))
    const setFiltered = useCallback((data) => {
        setAccount(null)
        clearServices()
        _setFiltered(data)
    })

    const values = useMemo(()=> ({
        filtered, 
        flags, 
        services,
        account,
        sort, 
      }), [filtered, flags, services, account, sort])

    
    const setters = {
        setSort, 
        setFiltered,
        setAccount, 
        setService,
        clearServices,
        toggleFlag
    }

    return (
        <ExhbitorsListUpdaterContextContainer.Provider value={setters}>
        <ExhbitorsListContextContainer.Provider value={values}>
            {children}
        </ExhbitorsListContextContainer.Provider>
        </ExhbitorsListUpdaterContextContainer.Provider>
    )
}

const CombinedContext = ({children, defaultSort = "company.name"}) => (
    <ExhibitorsDataContext defaultSort={defaultSort} >
    <ExhibitorsListContext defaultSort={defaultSort}>
    {children}
    </ExhibitorsListContext>
    </ExhibitorsDataContext>
)


export const useExhibitorsDataContext = () => useContext(ExhbitorsDataContextContainer)
export const useExhibitorsListContext = () => useContext(ExhbitorsListContextContainer)
export const useExhibitorsListUpdaterContext = () => useContext(ExhbitorsListUpdaterContextContainer)

export const useData = () => {

    const {data, dataById} = useExhibitorsDataContext()
    const {filtered, account, services, sort} = useExhibitorsListContext()
    const {setFiltered} =  useExhibitorsListUpdaterContext()

    const filters = []
    /**if account chosen do not use search */
    const finalData = !isEmpty(account) ? data: filtered
    if(!isEmpty(account)){
        filters.push(["account", account])
    }
    if(!isEmpty(services)){
        filters.push((item) => filterExhibitorByTicketsIds(item, services))
    }
    const items = processArrayData(finalData, {sort, filter: filters})

     useEffect(()=>{
        if(isEmpty(filtered)){
            setFiltered(data)
        }
    }, [data, filtered])

    return useMemo(()=>{
        return {
            data,
            dataById,
            items, 
            isFiltered: items.length < data.length,
            accounts: [...new Set(data.map(item => item.account))].sort()
        }
    }, [data, items])
}

export const useMapData = () => {
    const {isFiltered, items} = useData()
    return isFiltered ? items : []
}

export default CombinedContext