
import {map} from 'eventjuicer-site-components'

export const reducer = (acc, currentValue) => acc + currentValue.quantity;
export const howManyBooths = (purchases) => purchases? purchases.filter(item => item.role=="exhibitor").length: 0
export const howManyCatering = (purchases) => purchases? purchases.filter(item => item.id == 1776).reduce(reducer, 0): 0
export const howManyParking = (purchases) => purchases? purchases.filter(item => item.id == 1780).reduce(reducer, 0): 0

export const cateringReal = (purchases, reps) => {

    const booths = howManyBooths(purchases)
    const catering = howManyCatering(purchases)

    if(!reps){
        return 1 + catering
    }

    if(reps > booths * 4){
        return (booths * 4) + catering
    }else{
        return reps + catering
    }
}

export const parkingReal = (purchases) => howManyBooths(purchases) * 1 + howManyParking(purchases)

export const selectedBoothIds = (purchases) => map(purchases, 'formdata.id').filter(v => v && v.length);
export const selectedBoothNames = (purchases) => map(purchases, 'formdata.ti').filter(v => v && v.length).join(", ");

export const clear = (str) => str? str.replace(/resources.upgrades./gi, ''): "";
export const findName = (data) => data.translation_asset_id && data.translation_asset_id.length>2 ? data.translation_asset_id : data.___name;
