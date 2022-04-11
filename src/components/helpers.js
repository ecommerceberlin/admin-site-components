
import {map} from 'eventjuicer-site-components'
import { groupBy, sumBy, mapValues, uniqBy } from 'lodash';
import {Cloudinary} from "@cloudinary/url-gen";



const createCloudinaryInstance = () => new Cloudinary({
    cloud: {
      cloudName: 'eventjuicer'
    }
});

export const reducer = (acc, currentValue) => acc + currentValue.quantity;
export const howManyBooths = (purchases) => purchases? purchases.filter(item => item.role=="exhibitor").length: 0
export const howManyCatering = (purchases) => purchases? purchases.filter(item => item.id == 2003).reduce(reducer, 0): 0
export const howManyParking = (purchases) => purchases? purchases.filter(item => item.id == 2006).reduce(reducer, 0): 0

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

export const findBoothsId = (source) => {
    let booths = [];
    source.forEach(exhibitor => {
        exhibitor.purchases.filter(ticket => ticket.formdata && "id" in ticket.formdata)
        .map(ticket => ticket.formdata.id)
        .forEach(formdata => booths.push(formdata))    
    })
    return booths
}

export const findExhibitorsByTicketIds = (data = [], checked=[]) => {
    const exhibitorWithExternalServices = data.filter(exhibitor => exhibitor.purchases.some(ticket => checked.includes(ticket.id)))
    return findBoothsId(exhibitorWithExternalServices);
}


export const filterExhibitorByTicketsIds = (item = {}, checked=[]) => item.purchases.some(ticket => checked.includes(ticket.id))

export const cloudinaryAddText = ({asset_id, content="test", height, width, text_gravity="center", text_color="#fff", text_xy=[0,0], text_size=40, format}) => {

    const myImage = createCloudinaryInstance().image(asset_id);
    const [x,y] = text_xy
    
    myImage.overlay(
      source(
        text(content, new TextStyle('Arial', text_size)
        .fontWeight('bold'))
        .textColor(text_color)
      )
      .position(new Position().gravity(compass(text_gravity)).offsetX(x).offsetY(y)) 
    )



    if(parseInt(height) && parseInt(width)){
      myImage.resize(fill().width(width).height(height))
    }

    if(format){
      myImage.format(format)
    }

    return myImage

}


/**
 * NEW
 */


export const getTicketName = (item) => item.translation_asset_id || item.___name


export const findByPartialName = (obj, name) => {
  const lookup = Object.keys(obj).find(item => item.includes(name))
  return lookup? obj[lookup]: 0;
}

export const servicesGroupedByName = (purchases) => Array.isArray(purchases) ? groupBy(purchases.filter(item => item.role.includes("service")), getTicketName): {}

export const servicesSummedUp = (purchases) => mapValues(servicesGroupedByName(purchases), arr => sumBy(arr, "quantity"))

export const servicesRealAssignments = (purchases, reps) => {

  const _howManyBooths = howManyBooths(purchases)
  const _servicesSummedUp = servicesSummedUp(purchases)
  const cateringPurchased = findByPartialName(_servicesSummedUp, "catering");
  const cateringOfferedMax = _howManyBooths * 4

  let howManyChairs = (_howManyBooths * 2) + findByPartialName(_servicesSummedUp, "chair");
  let howManyTables = (_howManyBooths * 1) + findByPartialName(_servicesSummedUp, "table");

  if(findByPartialName(_servicesSummedUp, "clearspace") || findByPartialName(_servicesSummedUp, "fullprint") || findByPartialName(_servicesSummedUp, "osb") ){
    howManyTables = 0
    howManyChairs = 0
  }

  return {
    catering: reps > cateringOfferedMax? cateringOfferedMax + cateringPurchased: Math.max(1, reps) + cateringPurchased,
    parking: (_howManyBooths * 1) + findByPartialName(_servicesSummedUp, "parking"),
    tables: howManyTables,
    chairs: howManyChairs
  }

}


export function sumObjectsByKey(...objs) {
  return objs.reduce((a, b) => {
    for (let k in b) {
      if (b.hasOwnProperty(k))
        a[k] = (a[k] || 0) + b[k];
    }
    return a;
  }, {});
}

export const countTotals = (data) => {
  
  const unique = uniqBy(data, "company_id")

  let aggregated = {
    catering: 0,
    parking: 0,
    tables: 0,
    chairs: 0,
  }

  unique.map(company => {
    const agg = servicesRealAssignments(company.purchases, company.reps)
    aggregated = sumObjectsByKey(aggregated, agg)
  })

  return aggregated
}
