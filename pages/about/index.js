import {Box, Button, Container, Grid, makeStyles, Typography} from '@material-ui/core';
import Appbar from '../../src/layouts/Appbar';
import Footer from '../../src/layouts/Footer';
import AboutIcon from '../../public/Collection.svg';
import {useRouter} from 'next/router';

const useStyles = makeStyles({
    container: {
        backgroundPosition: 'bottom center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
        height: 'calc(100vh-48px)'
    },
});

const About = () => {

    const classes = useStyles();

    const Router = useRouter();

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
                    <Typography variant={'h1'} color={'textPrimary'} >
                        {'ABOUT.'}
                    </Typography>
                    <Box my={2}/>
                    <Grid container>
                        <Grid item container justify={'center'} alignItems={'center'} xs={12} sm={6} md={6}>
                            <Box width={'95%'}>
                                <Typography variant={'caption'} color={'textSecondary'}>
                                    {
                                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in erat at quam egestas facilisis nec eu risus. Sed lorem sem, pellentesque ac nibh ac, tincidunt fermentum dui. Nunc in pretium est, et pretium leo. Aliquam congue sapien massa, quis accumsan nunc malesuada ac. Cras tincidunt metus quis metus volutpat, a ultricies odio dapibus. Integer sollicitudin, eros lacinia blandit dictum, lorem massa scelerisque mauris, sed tincidunt risus ligula id nisi. Ut pharetra est augue, congue dictum nisi dapibus vel. Sed tincidunt lectus nec ex cursus aliquet. Nam vel diam elementum, efficitur nunc eu, bibendum lectus. Maecenas luctus quam purus, ultricies pharetra sem tempus non. Suspendisse efficitur ac sapien et congue. Aliquam lacinia eleifend orci, scelerisque consequat ex auctor sed. Suspendisse eu lacus tincidunt, sollicitudin ante ac, dignissim nibh. Sed placerat lacinia tellus, quis viverra risus tincidunt nec. Sed feugiat accumsan lorem.'
                                    }
                                </Typography>
                                <Box my={3}/>
                            </Box>
                        </Grid>
                        <Grid item container justify={'center'} alignItems={'center'} xs={12} sm={6} md={6}>
                            <Box width={'95%'}>
                                <Typography variant={'caption'} color={'textSecondary'}>
                                    {
                                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in erat at quam egestas facilisis nec eu risus. Sed lorem sem, pellentesque ac nibh ac, tincidunt fermentum dui. Nunc in pretium est, et pretium leo. Aliquam congue sapien massa, quis accumsan nunc malesuada ac. Cras tincidunt metus quis metus volutpat, a ultricies odio dapibus. Integer sollicitudin, eros lacinia blandit dictum, lorem massa scelerisque mauris, sed tincidunt risus ligula id nisi. Ut pharetra est augue, congue dictum nisi dapibus vel. Sed tincidunt lectus nec ex cursus aliquet. Nam vel diam elementum, efficitur nunc eu, bibendum lectus. Maecenas luctus quam purus, ultricies pharetra sem tempus non. Suspendisse efficitur ac sapien et congue. Aliquam lacinia eleifend orci, scelerisque consequat ex auctor sed. Suspendisse eu lacus tincidunt, sollicitudin ante ac, dignissim nibh. Sed placerat lacinia tellus, quis viverra risus tincidunt nec. Sed feugiat accumsan lorem.'
                                    }
                                </Typography>
                                <Box my={3}/>
                            </Box>
                        </Grid>
                        <Grid item container justify={'center'} alignItems={'center'} xs={12} sm={6} md={6}>
                            <Box width={'95%'}>
                                <Typography variant={'caption'} color={'textSecondary'}>
                                    {
                                        'Cras porttitor, mi et sodales efficitur, nulla nulla luctus libero, non suscipit nisi metus non est. Donec at facilisis sem. Sed in metus at massa interdum ultrices condimentum ornare enim. Donec facilisis eget lorem sed eleifend. In auctor est turpis, et sodales erat tincidunt id. Donec posuere lacus tempor enim maximus suscipit. Sed massa magna, lacinia non ligula ac, tristique placerat mi. Praesent ultrices, nibh nec commodo pellentesque, metus lacus malesuada magna, at porta lorem lectus fermentum erat. Duis at consectetur urna. Sed pretium suscipit venenatis. Ut libero nunc, tincidunt non fermentum quis, mattis vitae sapien. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut et pretium sapien. Duis sed egestas nunc. Nullam dapibus eu nunc sit amet laoreet. Interdum et malesuada fames ac ante ipsum primis in faucibus.'
                                    }
                                </Typography>
                                <Box my={3}/>
                            </Box>
                        </Grid>
                        <Grid item container justify={'center'} alignItems={'center'} xs={12} sm={6} md={6}>
                            <Box width={'95%'}>
                                <Typography variant={'caption'} color={'textSecondary'}>
                                    {
                                        'Cras porttitor, mi et sodales efficitur, nulla nulla luctus libero, non suscipit nisi metus non est. Donec at facilisis sem. Sed in metus at massa interdum ultrices condimentum ornare enim. Donec facilisis eget lorem sed eleifend. In auctor est turpis, et sodales erat tincidunt id. Donec posuere lacus tempor enim maximus suscipit. Sed massa magna, lacinia non ligula ac, tristique placerat mi. Praesent ultrices, nibh nec commodo pellentesque, metus lacus malesuada magna, at porta lorem lectus fermentum erat. Duis at consectetur urna. Sed pretium suscipit venenatis. Ut libero nunc, tincidunt non fermentum quis, mattis vitae sapien. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut et pretium sapien. Duis sed egestas nunc. Nullam dapibus eu nunc sit amet laoreet. Interdum et malesuada fames ac ante ipsum primis in faucibus.'
                                    }
                                </Typography>
                                <Box my={3}/>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box my={2}/>
                    <Grid container>
                        <Grid item container justify={'center'} alignItems={'center'} xs={12} sm={12} md={12}>
                            <img src={AboutIcon} alt={'About'} width={'60%'} />
                        </Grid>
                    </Grid>
                    <Box my={2}/>
                    <Grid container>
                        <Grid item container justify={'center'} alignItems={'center'} xs={12} sm={12} md={12}>
                            <Box width={'95%'} px={{xs: 3, md: 9}}>
                                <Typography variant={'caption'} color={'textSecondary'}>
                                    {
                                        'Cras porttitor, mi et sodales efficitur, nulla nulla luctus libero, non suscipit nisi metus non est. Donec at facilisis sem. Sed in metus at massa interdum ultrices condimentum ornare enim. Donec facilisis eget lorem sed eleifend. In auctor est turpis, et sodales erat tincidunt id. Donec posuere lacus tempor enim maximus suscipit. Sed massa magna, lacinia non ligula ac, tristique placerat mi. Praesent ultrices, nibh nec commodo pellentesque, metus lacus malesuada magna, at porta lorem lectus fermentum erat. Duis at consectetur urna. Sed pretium suscipit venenatis. Ut libero nunc, tincidunt non fermentum quis, mattis vitae sapien. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut et pretium sapien. Duis sed egestas nunc. Nullam dapibus eu nunc sit amet laoreet. Interdum et malesuada fames ac ante ipsum primis in faucibus.'
                                    }
                                </Typography>
                                <Box my={3}/>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item container justify={'center'} alignItems={'center'}>
                            <Button variant="contained" color={'secondary'} onClick={() => {Router.push('/contact', '/contact')}}>
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