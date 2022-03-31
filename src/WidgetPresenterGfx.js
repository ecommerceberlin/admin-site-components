import {
    getPresenterOgImage,
    getPresenterFbAd,
    useDatasource
} from 'eventjuicer-site-components'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Alert from '@material-ui/lab/Alert'


const squareSmaller = (id, template='') => {
    
    const avatarTrans = `c_fill,h_400,w_400,q_90,r_max`;
    const templateTrans = `g_center,x_0,y_100`;
    const logotypeTrans = `c_fit,g_center,w_600,h_200,x_0,y_240`;
  
    return `https://res.cloudinary.com/eventjuicer/image/upload/${avatarTrans}/${templateTrans},u_${template}/${logotypeTrans},l_p_${id}_logotype/p_${id}_avatar.png`;
    
};


const vertical = (id, template='') => {
    
    const avatarTrans = `c_fill,h_700,w_700,q_95,r_max`;
    const templateTrans = `g_center,x_0,y_175`;
    const logotypeTrans = `c_fit,g_center,w_700,h_400,x_0,y_450`;
  
    return `https://res.cloudinary.com/eventjuicer/image/upload/${avatarTrans}/${templateTrans},u_${template}/${logotypeTrans},l_p_${id}_logotype/p_${id}_avatar.png`;
    
};


const email = (id, template='') => {
    
    const avatarTrans = `c_fill,h_200,w_200,q_95,r_max`;
    const templateTrans = `g_center,x_150,y_0`;
    const logotypeTrans = `c_fit,g_center,w_250,h_150,x_125,y_0`;
  
    return `https://res.cloudinary.com/eventjuicer/image/upload/${avatarTrans}/${templateTrans},u_${template}/${logotypeTrans},l_p_${id}_logotype/p_${id}_avatar.png`;
    
};




const WidgetPresenterGfx = ({id}) => {

    const datasource = useDatasource({
        resource: "presenters"
    })

    const data = (datasource || []).find(item => item.id == id) || {}
    const {
        presenter, 
        cname2, 
        bio, 
        position, 
        presentation_title, 
        presentation_description, 
        presentation_time, 
        presentation_venue
    } = data

    const images = [
        getPresenterOgImage(data, "template_teh21_exhibitor_pl"),
        squareSmaller(id, "teh21_tmpl_spkr_sq2"),
        getPresenterFbAd(data, "1080_white_rect"),
        vertical(id, "teh21_tmpl_spkr_vert1"),
        email(id, "bg_600_250_white")
    ]

    const link = `https://${process.env.NEXT_PUBLIC_PROJECT}/speakers/${id}`

  return (

    <Box mb={4}>
    
    <Box mt={4} mb={1} maxWidth={1000}>
    <Typography variant="h3">{presenter}</Typography>
    <Typography variant="subtitle1" gutterBottom>{position} {cname2}</Typography>
    <Typography variant="body1">{bio}</Typography>

    <Box mt={2} mb={2}>
    <Alert><a href={link} target="_blank">{link}</a></Alert>
    </Box>

    </Box>

    <Divider />

    <Box mt={4} mb={1} maxWidth={1000}>
    <Typography variant="button" display="block">{presentation_time} {presentation_venue}</Typography>
    <Typography variant="h4">{presentation_title}</Typography>
    <Typography variant="body1">{presentation_description}</Typography>
    </Box>

    <Divider />

    <Box mt={4}>

            <Grid container spacing={2}>{images.map(image => <Grid item key={image}><Box m={1}>
            <img src={image} alt="" style={{ maxHeight: 300,  maxWidth: 300, border: "1px solid #000000" }} />
            </Box></Grid>)}</Grid>

    
    </Box>




    </Box>
);


}

export default WidgetPresenterGfx


