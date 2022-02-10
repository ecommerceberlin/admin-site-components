import React from 'react';

import {
  boothStyles,
  useBoothContext,
  dialogShow,
  classNames,
  useDispatch,
  makeStyles
} from 'eventjuicer-site-components'

const useStyles = makeStyles(boothStyles)


const Booth = ({marked=false}) => {

  const classes = useStyles()  
  const dispatch = useDispatch()
  const {
    zoom,
    setting, 
    selected, 
    sold,
    hold,
    unavailable,
    blocked,
    styleName,
    sizes,
    name,
    xy,
    id,
    g,
    ti
  } = useBoothContext()

  const onBoothClick = () => {


    dispatch(dialogShow({
      title: '', //will be overwritten....
      content:  <div>asadasd</div>, //<BoothDialog setting={setting} boothId={id} groupId={g} label={ti} styleName={styleName} />,
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