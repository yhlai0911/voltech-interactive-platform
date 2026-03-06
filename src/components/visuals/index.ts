import { ComponentType } from 'react';

export { FormulaDisplay } from './FormulaDisplay';
export { CodeDisplay } from './CodeDisplay';
export { DataTable } from './DataTable';
export { QQPlotDisplay } from './QQPlotDisplay';
export { ACFBarChart } from './ACFBarChart';
export { NewsImpactCurve } from './NewsImpactCurve';
export { VolatilityTimeSeries } from './VolatilityTimeSeries';
export { VaRBacktestChart } from './VaRBacktestChart';
export { FeatureImportanceChart } from './FeatureImportanceChart';
export { GARCHVolatilityDashboard } from './GARCHVolatilityDashboard';
export { BiasVarianceDecomposition } from './BiasVarianceDecomposition';
export { LSTMGatesDiagram } from './LSTMGatesDiagram';
export { RiskMeasureDashboard } from './RiskMeasureDashboard';
export { VolatilityComparison } from './VolatilityComparison';

import { FormulaDisplay } from './FormulaDisplay';
import { CodeDisplay } from './CodeDisplay';
import { DataTable } from './DataTable';
import { QQPlotDisplay } from './QQPlotDisplay';
import { ACFBarChart } from './ACFBarChart';
import { NewsImpactCurve } from './NewsImpactCurve';
import { VolatilityTimeSeries } from './VolatilityTimeSeries';
import { VaRBacktestChart } from './VaRBacktestChart';
import { FeatureImportanceChart } from './FeatureImportanceChart';
import { GARCHVolatilityDashboard } from './GARCHVolatilityDashboard';
import { BiasVarianceDecomposition } from './BiasVarianceDecomposition';
import { LSTMGatesDiagram } from './LSTMGatesDiagram';
import { RiskMeasureDashboard } from './RiskMeasureDashboard';
import { VolatilityComparison } from './VolatilityComparison';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const VISUAL_COMPONENTS: Record<string, ComponentType<any>> = {
  FormulaDisplay,
  CodeDisplay,
  DataTable,
  QQPlotDisplay,
  ACFBarChart,
  NewsImpactCurve,
  VolatilityTimeSeries,
  VaRBacktestChart,
  FeatureImportanceChart,
  GARCHVolatilityDashboard,
  BiasVarianceDecomposition,
  LSTMGatesDiagram,
  RiskMeasureDashboard,
  VolatilityComparison,
};
