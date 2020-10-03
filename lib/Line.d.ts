import * as React from 'react';
import { ChartDataPoint, Smoothing, Stroke, Shape } from './types';
declare type Props = {
    /** Theme for the line */
    theme?: {
        stroke?: Stroke;
        scatter?: {
            default?: Shape;
            selected?: Shape;
        };
    };
    smoothing?: Smoothing;
    /** Only works in combination with smoothing='bezier'. Value between 0 and 1. */
    tension?: number;
    /** Component to render tooltips. An example component is included: <Tooltip />. */
    tooltipComponent?: JSX.Element;
    /** Callback method that fires when a tooltip is displayed for a data point. */
    onTooltipSelect?: (value: ChartDataPoint, index: number) => void;
    /** Callback method that fires when the user stopped touching the chart. */
    onTooltipSelectEnd?: () => void;
    /** Data for the chart. Overrides optional data provided in `<Chart />`. */
    data?: ChartDataPoint[];
};
declare const Line: React.FC<Props>;
export { Line };
