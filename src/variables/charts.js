/**
 * Created by Soumya (soumya@smarttersstudio.com) on 26/05/21 at 7:37 PM.
 * @description variables for charts
 */

// ##############################
// // // variables used to create animation on charts
// #############################
let delays = 80,
    durations = 500;
let delays2 = 80,
    durations2 = 500;

// ##############################
// // // Waste Recycle
// #############################

/**
 *
 * @returns {{data: {series: *[], labels: string[]}, options: {onlyInteger: boolean, high: number, divisor: number, low: number, height: string}, animation: {draw: animation.draw}}}
 * @param viewData
 */
const wasteRecycle = (viewData) => {
    let higherValue = Math.max(...viewData);
    return {
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [viewData],
        },
        options: {
            low: 0,
            high: higherValue,
            divisor: 20,
            onlyInteger: true,
            height: '280px',
        },
        animation: {
            draw: function (data) {
                if (data.type === "line" || data.type === "area") {
                    data.element.animate({
                        d: {
                            begin: 600,
                            dur: 700,
                            from: data.path
                                .clone()
                                .scale(1, 0)
                                .translate(0, data.chartRect.height())
                                .stringify(),
                            to: data.path.clone().stringify(),
                        },
                    });
                } else if (data.type === "point") {
                    data.element.animate({
                        opacity: {
                            begin: (data.index + 1) * delays,
                            dur: durations,
                            from: 0,
                            to: 1,
                            easing: "ease",
                        },
                    });
                }
            },
        },
    }
};

// ##############################
// // // Bin Allocation
// #############################

/**
 *
 * @returns {{responsiveOptions: [string, {seriesBarDistance: number, axisX: {labelInterpolationFnc: (function(*): *)}}][], data: {series: *[], labels: string[]}, options: {high: number, low: number, axisX: {showGrid: boolean}, chartPadding: {top: number, left: number, bottom: number, right: number}, height: string}, animation: {draw: animation.draw}}}
 * @param viewData
 */
const binAllocation = (viewData) => {
    let higherValue = Math.max(...viewData);
    return {
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [viewData],
        },
        options: {
            axisX: {
                showGrid: false,
            },
            low: 0,
            high: higherValue,
            height: '280px',
            chartPadding: {
                top: 0,
                right: 5,
                bottom: 0,
                left: 0,
            },
        },
        responsiveOptions: [
            [
                "screen and (max-width: 640px)",
                {
                    seriesBarDistance: 5,
                    axisX: {
                        labelInterpolationFnc: function (value) {
                            return value[0];
                        },
                    },
                },
            ],
        ],
        animation: {
            draw: function (data) {
                if (data.type === "bar") {
                    data.element.animate({
                        opacity: {
                            begin: (data.index + 1) * delays2,
                            dur: durations2,
                            from: 0,
                            to: 1,
                            easing: "ease",
                        },
                    });
                }
            },
        },
    }
};

export {
    wasteRecycle,
    binAllocation,
};