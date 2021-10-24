import React from 'react';
import {Typography} from 'eventjuicer-site-components'

const ProfileErrors = ({ errors }) => {
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