/**
 * Created by Soumya (soumya@smarttersstudio.com) on 26/05/21 at 8:35 PM.
 */
import {makeStyles} from '@material-ui/core';
import styles from '../../../public/assets/jss/views/dashboardStyle';
import ChartistGraph from 'react-chartist';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import AccessTime from '@material-ui/icons/AccessTime';
import Card from '../Card/Card';
import CardHeader from '../Card/CardHeader';
import CardBody from '../Card/CardBody';
import CardFooter from '../Card/CardFooter';
import React from 'react';

const DashboardChartCard = ({chartData, type, title, increasePercentage, footerText}) => {
    const useStyles = makeStyles(styles);

    const classes = useStyles();

    return (
        <Card chart>
            <CardHeader color="success">
                <ChartistGraph
                    className={classes.chartStroke}
                    data={chartData.data}
                    type={type}
                    options={chartData.options}
                    listener={chartData.animation}
                />
            </CardHeader>
            <CardBody>
                <h4 className={classes.cardTitle}>{title}</h4>
                <p className={classes.cardCategory}>
                    <span className={classes.successText}>
                        <ArrowUpward className={classes.upArrowCardCategory} /> {increasePercentage}
                    </span>{" "}
                    increase from last month.
                </p>
            </CardBody>
            <CardFooter chart>
                <div className={classes.stats}>
                    <AccessTime /> {footerText}
                </div>
            </CardFooter>
        </Card>
    );
};

export default DashboardChartCard;