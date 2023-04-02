
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

export const servicesRealAssignments = (purchases, reps, assign_free_furniture=0) => {

  const howManyFreeTablesPerBooth = 1;
  const howManyFreeChairsPerBooth = 2;
  const howManyFreeParkingPerBooth = 1;
  const howManyFreeVouchersPerBooth = 4;

  const _howManyBooths = howManyBooths(purchases)
  const _servicesSummedUp = servicesSummedUp(purchases)
  const cateringPurchased = findByPartialName(_servicesSummedUp, "catering");
  const defaultFurniture = findByPartialName(_servicesSummedUp, "default_furniture");
  const tablesPurchased = findByPartialName(_servicesSummedUp, "table");
  const chairsPurchased = findByPartialName(_servicesSummedUp, "chair");
  const parkingPurchased = findByPartialName(_servicesSummedUp, "parking");
  const fullprintArrangementPurchased =findByPartialName(_servicesSummedUp, "fullprint")
  const osbArrangementPurchased = findByPartialName(_servicesSummedUp, "osb");

  const cateringOfferedMax = howManyFreeVouchersPerBooth * _howManyBooths

  let howManyTables = defaultFurniture <= _howManyBooths ? (defaultFurniture || +assign_free_furniture )  * howManyFreeTablesPerBooth + tablesPurchased: _howManyBooths * howManyFreeTablesPerBooth + tablesPurchased;
  let howManyChairs = defaultFurniture <= _howManyBooths ? (defaultFurniture || +assign_free_furniture)  * howManyFreeChairsPerBooth + chairsPurchased: _howManyBooths * howManyFreeChairsPerBooth + chairsPurchased;

  if(fullprintArrangementPurchased || osbArrangementPurchased ){
    howManyTables = 0
    howManyChairs = 0
  }

  return {
    catering: reps > cateringOfferedMax? cateringOfferedMax + cateringPurchased: Math.max(1, reps) + cateringPurchased,
    parking: (_howManyBooths * howManyFreeParkingPerBooth) + parkingPurchased,
    tables: howManyTables,
    chairs: howManyChairs,
    default_furniture: defaultFurniture,

    
    fullprint: fullprintArrangementPurchased,
    osb: osbArrangementPurchased,


    counter: findByPartialName(_servicesSummedUp, "counter"),
    carpet: findByPartialName(_servicesSummedUp, "carpet"),


    electricity: findByPartialName(_servicesSummedUp, "electricity"),
    highvoltage: findByPartialName(_servicesSummedUp, "highvoltage"),


    display: findByPartialName(_servicesSummedUp, "display"),
    dis75play: findByPartialName(_servicesSummedUp, "dis75play"),

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

export const countTotals = (data, assign_free_furniture) => {
  
  const unique = uniqBy(data, "company_id")

  let aggregated = {

    catering: 0,
    parking: 0,
    tables: 0,
    chairs: 0,

    default_furniture: 0,
    fullprint: 0,
    osb: 0,
    counter: 0,
    carpet: 0,

    electricity: 0,
    highvoltage: 0,

    display: 0,
    dis75play: 0,

  }

  unique.map(company => {
    const agg = servicesRealAssignments(company.purchases, company.reps, assign_free_furniture)
    aggregated = sumObjectsByKey(aggregated, agg)
  })

  return aggregated
}
