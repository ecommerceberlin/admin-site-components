import React from 'react';

import {
  boothStyles,
  useBoothContext,
  dialogShow,
  classNames,
  useDispatch,
  makeStyles
} from 'eventjuicer-site-components'
import BoothDialog from './BoothDialog';

const useStyles = makeStyles(boothStyles)


const Booth = ({marked=false}) => {

  const classes = useStyles()  
  const dispatch = useDispatch()
  const {
    zoom,
    setting, 
    selected, 
    styleName,
    sizes,
    name,
    xy,
    id,
    g,
    ti,
    participant_id
  } = useBoothContext()

  const onBoothClick = () => {


    dispatch(dialogShow({
      title: '', //will be overwritten....
      content:  <BoothDialog participant_id={participant_id} />, //<BoothDialog setting={setting} boothId={id} groupId={g} label={ti} styleName={styleName} />,
      buttons: []
    }));

  };

  return (
    <li
      id={id}
      onClick={onBoothClick}
      className={classNames(
        classes.booth,
        classes[styleName],
      {
        // [classes.boothSold]: sold,
        // [classes.boothHold]: hold,
        // [classes.boothUnavailable]: unavailable,
        // [classes.boothBlocked]: blocked,
        [classes.boothSelected]: selected || marked,
        // [classes.boothOnLegend]: legend
      })}
      style={{...sizes, ...xy}}
    >
   <span className={classNames(classes.boothText)}>
   {ti}
  {name && zoom > 1 ? (<span className={classes.cname}>{name}</span>) : null}
</span>
    </li>
  );

}


export default Booth