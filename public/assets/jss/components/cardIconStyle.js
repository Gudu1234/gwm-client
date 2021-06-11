import {
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader,
  darkCardHeader,
  grayColor,
} from '../nextjs-material-dashboard';

const cardIconStyle = {
  cardIcon: {
    "&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$roseCardHeader,&$darkCardHeader": {
      borderRadius: "5px",
      backgroundColor: grayColor[0],
      padding: "15px",
      marginTop: "-20px",
      marginRight: "15px",
      float: "right",
      fontWeight: '500',
      fontSize: '24px',
      lineHeight: '140.1%',
      letterSpacing: '0.06em',
      width: '65px',
      height: '70px'
    },
  },
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader,
  darkCardHeader,
};

export default cardIconStyle;
