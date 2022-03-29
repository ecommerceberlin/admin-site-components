
import React from 'react'
import { 
  useDatasource,
  get as _get,
  Grid,
  resizeCloudinaryImage,
  Avatar,
  makeStyles,
  Box,
} from 'eventjuicer-site-components'

import {red} from '@material-ui/core/colors'
import {useRouter} from 'next/router'


const useStyles = ({bgColor, textColor}) => makeStyles(theme => ({

      root: {
        width: 200,
        height: 200,
      },
    
      label: {
        position: "absolute",
        bottom: 30,
        left: 0,
        width: "80%",
        backgroundColor: bgColor || red[900],
        color: textColor || "#ffffff",

        fontSize: '0.8rem',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 800,
        lineHeight: 2,
        textTransform: 'uppercase',
        paddingLeft: 10,
        paddingRight: 10,
     
      },



      image: {
        filter: 'grayscale(100%) contrast(115%)'
      }

}))

const WidgetPresentersAvatars = ({bgColor, textColor}) => {

const classes = useStyles({bgColor, textColor})();
const router = useRouter()
const presenters = useDatasource({resource: "presenters"}) 


return ( <Grid container spacing={0}>{(presenters || []).map(item => {

      const avatar = _get(item,'avatar_cdn', null)
      const company = _get(item,'cname2', "")

      if(!avatar){
        return null
      }

      return (<Grid key={item.id} item xl={2} lg={2} md={3} sm={4} xs={6} spacing={1}>

        <Box pb={4} pt={4} position="relative">
        <Avatar src={ resizeCloudinaryImage(avatar, 300, 300) } classes={{
         root: classes.root,
         img: classes.image
        }} onClick={() => router.push(`/presenters/${item.id}`)}/>
        <Box className={classes.label}>{company}</Box>
        </Box>


      </Grid>);

  })}</Grid>)

}

export default WidgetPresentersAvatars