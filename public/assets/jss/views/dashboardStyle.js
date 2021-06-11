import {
  successColor,
  whiteColor,
  grayColor,
  hexToRgb,
} from '../nextjs-material-dashboard';

const dashboardStyle = {
  successText: {
    color: '#26DF86',
  },
  upArrowCardCategory: {
    width: "16px",
    height: "16px",
  },
  stats: {
    color: '#59868F',
    display: "inline-flex",
    fontSize: "12px",
    lineHeight: "22px",
    "& svg": {
      top: "4px",
      width: "16px",
      height: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px",
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      top: "4px",
      fontSize: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px",
    },
  },
  cardCategory: {
    color: '#59868F',
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    paddingTop: "10px",
    marginBottom: "0",
  },
  cardCategoryWhite: {
    color: '#fff',
    margin: "0",
    fontSize: "12px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitle: {
    color: '#124954',
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    // fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: '#124954',
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  cardTitleWhite: {
    color: '#fff',
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "bold",
    fontSize: '16px',
    // fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  chartStroke: {
    '& .ct-series-a .ct-bar, .ct-series-a .ct-line, .ct-series-a .ct-slice-donut': {
      stroke: '#7AE3B1',
      strokeWidth: '2px',
    },
    '& .ct-series-a .ct-bar, .ct-series-a .ct-line, .ct-series-a .ct-point, .ct-series-a .ct-slice-donut': {
      stroke: '#7AE3B1',
    },
    '& .ct-label': {
      color: '#fff'
    },
    '& .ct-grid.ct-vertical': {
      stroke: '#fff'
    },
    '& .ct-grid.ct-horizontal': {
      stroke: '#124954'
    },
    '& .ct-label.ct-horizontal.ct-end': {
      marginTop: '6px',
      transform: 'rotate(-60deg)'
    },
    '& .ct-series-a .ct-bar': {
      strokeWidth: '15px'
    }
  }
};

export default dashboardStyle;
