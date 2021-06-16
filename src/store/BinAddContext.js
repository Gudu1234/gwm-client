import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import useStateObject from '../hooks/useStateObject';

export const BinAddContext = createContext([{}, (value) => value]);

BinAddContext.displayName = 'BinAddContext';

export const BinAddProvider = ({ children }) => {
    const [state, setState] = useStateObject({});

    return (
        <BinAddContext.Provider value={[state, setState]}>{children}</BinAddContext.Provider>
    );
};

BinAddProvider.propTypes = {
    children: PropTypes.any.isRequired,
    value: PropTypes.object,
};

export const useBinAddData = () => useContext(BinAddContext);

// export const withInstituteOnBoardingData = (Component) => {
//     const WithInstituteOnBoardingData = () => (
//         <InstituteOnBoardingProvider>
//             <Component />
//         </InstituteOnBoardingProvider>
//     );
//
//     if (typeof Component.layout !== 'undefined') WithInstituteOnBoardingData.layout = Component.layout;
//     return WithInstituteOnBoardingData;
// };
