import React, {useEffect, useState} from 'react';
import {Box, Grid} from '@material-ui/core';
import DashboardStatsCard from '../../../src/components/Dashboard/DashboardStatsCard';
import DashboardCard from '../../../src/components/Dashboard/DashboardCard';
import DashboardButtonCard from '../../../src/components/Dashboard/DashboardButtonCard';
import {binAllocation, wasteRecycle} from '../../../src/variables/charts';
import Loader from '../../../src/components/Loader';
import AddBinIcon from '../../../public/DashboradButtonAssets/Add bin green.svg';
import RequestBinIcon from '../../../public/DashboradButtonAssets/Request bin green.svg';
import MailIcon from '../../../public/DashboradButtonAssets/Mail.svg';
import WorkerIcon from '../../../public/CardAssets/worker.svg';
import EnergyIcon from '../../../public/CardAssets/Green Energy.svg';
import RecycleIcon from '../../../public/CardAssets/Recycle.svg';
import BinIcon from '../../../public/CardAssets/Green bin.svg';
import DashboardChartCard from '../../../src/components/Dashboard/DashboardChartCard';

const Dashboard = () => {

    const [wasteRecycleData, setWasteRecycleData] = useState({});
    const [binAllocationData, setBinAllocationData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const recycleData = [2, 5, 8, 12, 15, 20, 24, 30, 35, 45, 65, 80];
        const binData = [80, 90, 60, 40, 65, 75, 85, 150, 100, 55, 75, 200];
        setBinAllocationData(binAllocation(binData));
        setWasteRecycleData(wasteRecycle(recycleData));
        console.log(loading);
        setLoading(false);
    }, [])

    return (
        <div>
            { loading ?
                <Loader />
                : <Box>
                    <Grid container>
                        <Grid item container xs={12} sm={6} md={3} justify={'center'} alignItems={'center'}>
                            <DashboardButtonCard
                                icon={AddBinIcon}
                                typo1={'Add Bin'}
                            />
                        </Grid>
                        <Grid item container xs={12} sm={6} md={3} justify={'center'} alignItems={'center'}>
                            <DashboardButtonCard
                                icon={RequestBinIcon}
                                typo1={'Manage Bin'}
                            />
                        </Grid>
                        <Grid item container xs={12} sm={6} md={3} justify={'center'} alignItems={'center'}>
                            <DashboardCard icon={RequestBinIcon} text={'Bin Requests'} more={'4'}/>
                        </Grid>
                        <Grid item container xs={12} sm={6} md={3} justify={'center'} alignItems={'center'}>
                            <DashboardCard icon={MailIcon} text={'Mails'} more={'4'}/>
                        </Grid>
                    </Grid>
                    <Box my={8}/>
                    <Grid container>
                        <Grid item container xs={12} sm={6} md={3} justify={'center'} alignItems={'center'}>
                            <DashboardStatsCard
                                icon={WorkerIcon}
                                typo1={'Workers'}
                                typo2={'700+'}
                                typo3={'Last updated 2 days ago'}
                            />
                        </Grid>
                        <Grid item container xs={12} sm={6} md={3} justify={'center'} alignItems={'center'}>
                            <DashboardStatsCard
                                icon={EnergyIcon}
                                typo1={'Energy Produced'}
                                typo2={'6000+ kWh'}
                                typo3={'Last updated 2 days ago'}
                            />
                        </Grid>
                        <Grid item container xs={12} sm={6} md={3} justify={'center'} alignItems={'center'}>
                            <DashboardStatsCard
                                icon={RecycleIcon}
                                typo1={'Waste Recycled'}
                                typo2={'20+ Tons'}
                                typo3={'Last updated 2 days ago'}
                            />
                        </Grid>
                        <Grid item container xs={12} sm={6} md={3} justify={'center'} alignItems={'center'}>
                            <DashboardStatsCard
                                icon={BinIcon}
                                typo1={'Bins Allocated'}
                                typo2={'200+'}
                                typo3={'Last updated 2 days ago'}
                            />
                        </Grid>
                    </Grid>
                    <Box my={8}/>
                    <Grid container>
                        <Grid item container xs={12} sm={12} md={6} justify={'center'} alignItems={'center'}>
                            <DashboardChartCard
                                chartData={wasteRecycleData}
                                type={'Line'}
                                title={'Waste Recycled'}
                                increasePercentage={'55%'}
                                footerText={'Updated 4 minutes ago.'}
                            />
                        </Grid>
                        <Grid item container xs={12} sm={12} md={6} justify={'center'} alignItems={'center'}>
                            <DashboardChartCard
                                chartData={binAllocationData}
                                type={'Bar'}
                                title={'Bin Allocated'}
                                increasePercentage={'55%'}
                                footerText={'Updated 4 minutes ago.'}
                            />
                        </Grid>
                    </Grid>
                </Box>
            }
        </div>
    );
}

Dashboard.title = 'Dashboard';

export default Dashboard;
