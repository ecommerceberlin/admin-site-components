
import React from 'react'
import { 
  useDatasource,
  get as _get,
  Grid,
  resizeCloudinaryImage,
  Avatar,
  makeStyles
} from 'eventjuicer-site-components'

import {useRouter} from 'next/router'

const useStyles = makeStyles(theme => ({

      avatarContainerFluid: {
        height: 120,
        width: "100%",
        padding: "3%"
      },
    
      avatarImg: {
        objectFit: "contain",
        maxHeight: "80%",
        maxWidth: "80%",
      },

}))

const WidgetPresentersBrands = () => {

const classes = useStyles();
const router = useRouter()
const presenters = useDatasource({resource: "presenters"}) 

return ( <Grid container spacing={0}>{(presenters || []).map(presenter => {

      const logotype = _get(presenter,'logotype_cdn', null)

      if(!logotype){
        return null
      }

      return (<Grid key={presenter.id} item xl={2} lg={2} md={3} sm={4} xs={6} spacing={1}>

        <Avatar variant="square" src={ resizeCloudinaryImage(logotype, 600, 300) } classes={{
        root: classes.avatarContainerFluid,
        img: classes.avatarImg
        }} onClick={() => router.push(`/presenters/${presenter.id}`)}/>

      </Grid>);

  })}</Grid>)

}

export default WidgetPresentersBrands