import React from 'react';
import {Typography} from 'eventjuicer-site-components'
import {useExhibitorContext} from './ExhibitorContext'


const ProfileErrors = ({active}) => {

  const {id, data} = useExhibitorContext()
  const {errors} = data

  if(!active){
    return null
  }

  const arr = Object.keys(errors);
    if (!arr.length) {
      return null;
    }
    return (
      <Typography variant="body1">
        Profile errors:{' '}
        {arr.map(field => (
          <strong key={field}>{field}, </strong>
        ))}
      </Typography>
    );
  };

  export default ProfileErrors