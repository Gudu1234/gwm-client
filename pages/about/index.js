import {Box, Button, Container, Grid, makeStyles, Typography} from '@material-ui/core';
import Appbar from '../../src/layouts/Appbar';
import Footer from '../../src/layouts/Footer';
import AboutIcon from '../../public/About.svg';
import {useRouter} from 'next/router';

const useStyles = makeStyles({
    container: {
        backgroundPosition: 'bottom center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
        height: 'calc(100vh-48px)'
    },
    contentStyle: {
        fontStyle: 'normal',
        fontSize: '14px',
        fontWeight: 'normal',
        lineHeight: '150.5%',
        textAlign: 'justify',
        color: '#000',
        letterSpacing: '0.04em'
    }
});

const About = () => {

    const classes = useStyles();

    const Router = useRouter();

    const endContent = 'With the increase in Population ,the scenario of cleanliness with respect to garbage  management  is possible  through GWMS. It analyzes data to manage collection routes and the placement of bins more effectively.  People of the localities should prefer GWMS as it provides fastest and efficient methods for dusting the localities. This system includes the classification of the types of garbage e.g. Biodegradable, plastics & non-biodegradable and paper & glass.';

    const content1 = 'In today’s world, millions of products are thrown out each year. The amount of garbage has been steadily increasing due to the increase in human population and urbanization. Garbage pollution has become one of the concerning issues for our locality hence people have to be more conscious about their atmosphere. Almost 60% of the  people are aware of smartphones, online food delivery, smart healthcare and here they have';

    const content2 = 'GWMS has come up with various features  to ensure the  development in according to a hygienic environment and based on the data collected, garbage trucks can be given routes generated through various algorithms and google maps API to efficiently route through all necessary garbage bins and finally reach the dumping site.All the necessary activities done by GWMS goes through a well ordered procedure. ';

    const content3 = 'to come up with one step ahead towards a better future for our environment. This is a serious environmental problem confronting the municipal authorities, here We objectify a procedure of removal and ejection of garbage and waste which is a G2C (Government to Citizen) system, governed by the Municipality corporation and supervised by the Admins of the GWMS.';

    const content4 = 'The whole procedure can be broadly categorized as segregation, collection, and transportation.Localites  request for the bins for their localities by selecting their city and zone. There is a request portal through which localities can request for bins for their locality and can also give feedback, suggestions or complaints using feedback and complaint portal respectively.';

    return (
        <Box className={classes.container}>
            <Appbar />
            <Container maxWidth={'xl'}>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    width={'100%'}
                    px={{xs: 2, md: 12}}
                    py={3}
                >
                    <Box my={2}/>
                    <Typography variant={'h1'} color={'textPrimary'} align={'right'} style={{paddingRight: '12px'}}>
                        {'ABOUT.'}
                    </Typography>
                    <Box my={2}/>
                    <Grid container>
                        <Grid item container xs={12} sm={6} md={6}>
                            <Box width={'95%'}>
                                <Typography className={classes.contentStyle}>
                                    {
                                        content1
                                    }
                                </Typography>
                                <Box my={3}/>
                            </Box>
                        </Grid>
                        <Grid item container xs={12} sm={6} md={6}>
                            <Box width={'95%'}>
                                <Typography className={classes.contentStyle}>
                                    {
                                        content3
                                    }
                                </Typography>
                                <Box my={3}/>
                            </Box>
                        </Grid>
                        <Grid item container xs={12} sm={6} md={6}>
                            <Box width={'95%'}>
                                <Typography className={classes.contentStyle}>
                                    {
                                        content2
                                    }
                                </Typography>
                                <Box my={3}/>
                            </Box>
                        </Grid>
                        <Grid item container xs={12} sm={6} md={6}>
                            <Box width={'95%'}>
                                <Typography className={classes.contentStyle}>
                                    {
                                        content4
                                    }
                                </Typography>
                                <Box my={3}/>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box my={1}/>
                    <Grid container>
                        <Grid item container justify={'center'} alignItems={'center'} xs={12} sm={12} md={12}>
                            <img src={AboutIcon} alt={'About'} width={'60%'} />
                        </Grid>
                    </Grid>
                    <Box my={2}/>
                    <Grid container>
                        <Grid item container justify={'center'} alignItems={'center'} xs={12} sm={12} md={12}>
                            <Box width={'95%'} px={{xs: 3, md: 9}}>
                                <Typography className={classes.contentStyle}>
                                    {
                                        endContent
                                    }
                                </Typography>
                                <Box my={3}/>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item container justify={'center'} alignItems={'center'}>
                            <Button
                                variant="contained"
                                color={'secondary'}
                                onClick={() => {Router.push('/contact', '/contact')}}
                                style={{textTransform: 'none'}}
                            >
                                {'Contact'}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Footer />
        </Box>
    )
};

export default About;