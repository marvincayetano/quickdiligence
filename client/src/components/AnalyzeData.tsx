import React from "react";

import { Line } from "react-chartjs-2";
import { Box, Badge } from "@chakra-ui/react";
import { Index__optionsTable } from "../styles/Index";
import { CheckBox } from "./CheckBox";
import { ResultContainer } from "./ResultContainer";

export interface AnalyzeDataInterface {
  Price: number;
  EPS: {
    data: [number];
    isPositiveNumber: boolean;
    isIncreasing: boolean;
  };
  PERatio: { data: [number]; isUndervalued: boolean; isOverValued: boolean };
  IRatio: { data: number; isSixHigher: boolean; isOneToSix: boolean };
  RGrowth: {
    data: [string];
    isIncreasing: boolean;
  };
  IncomeLoss: { data: string[]; isNegative: boolean };
  PnetIncome: { data: string[]; isPositive: boolean };
  TotalCash: { data: string };
  TotalAssets: {
    data: { assets: string; liabilities: string };
    isPositiveAL: boolean;
  };
  SHEquity: {
    data: [string];
    isIncreasing: boolean;
  };
  LTD: {
    data: string;
  };
  // TODO: Goodwill and intagible assets
  GWIA: {};
}

const eps_linechart_options = {
  plugins: {
    legend: false,
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          callback: function (value: any, _: any, __: any) {
            return value / 1e6 + "M";
          },
        },
      },
    ],
  },
};

const createLineChartData = (
  labels: string[],
  data: [number],
  color: string
) => {
  return {
    labels: labels,
    datasets: [
      {
        data: data,
        fill: false,
        borderColor: "lightGray",
        pointBackgroundColor: color,
      },
    ],
  };
};

interface AnalyzeDataProps {
  analyzedData: AnalyzeDataInterface | undefined;
}

export const AnalyzeData: React.FC<AnalyzeDataProps> = ({ analyzedData }) => {
  return (
    <Index__optionsTable>
      <CheckBox description="Positive number EPS(earnings-per-share) and continued increase" />
      <Box p="0 2rem">
        {analyzedData && (
          <Line
            type="Line"
            height={95}
            data={() => {
              const currentYear = new Date().getFullYear();
              const labels = analyzedData?.EPS.data.map((_, i) => {
                return (currentYear - i).toString();
              });
              return createLineChartData(
                labels,
                analyzedData?.EPS.data,
                analyzedData?.EPS.isIncreasing ? "green" : "red"
              );
            }}
            options={eps_linechart_options}
          />
        )}
      </Box>
      {analyzedData && (
        <ResultContainer>
          EPS is &nbsp;
          {analyzedData.EPS.isPositiveNumber ? (
            <>
              <Badge colorScheme="green">positive</Badge>
              &nbsp; and
            </>
          ) : (
            <>
              <Badge colorScheme="red">negative</Badge>
              &nbsp; but
            </>
          )}
          &nbsp; is &nbsp;
          {analyzedData.EPS.isIncreasing ? (
            <Badge colorScheme="green">increasing</Badge>
          ) : (
            <Badge colorScheme="red">not increasing</Badge>
          )}
        </ResultContainer>
      )}
      {/* <CheckBox
            name="ROI"
            description="Return on investment continued growth"
            currentOptions={currentOptions}
            setCurrentOptions={setCurrentOptions}
          />
          <CheckBox
            name="DEBT"
            description="DEBT payback time (Long term debt or free cash flow). Must be 3years or less"
            currentOptions={currentOptions}
            setCurrentOptions={setCurrentOptions}
          /> */}
      <CheckBox description="Is the stock trading at a reasonable price? PE Ratio = Stock price/EPS. Must be 15 or less" />
      <ResultContainer>
        PE Ratio of &nbsp;
        <p>{analyzedData && ` ${analyzedData.PERatio.data}`}</p>
        is &nbsp;
        {analyzedData &&
          (analyzedData.PERatio.isOverValued ? (
            <Badge colorScheme="red">Overvalued</Badge>
          ) : (
            <Badge colorScheme="green">Good</Badge>
          ))}
      </ResultContainer>
      <CheckBox description="Interest coverage ratio of 6 or higher" />
      <ResultContainer>
        Interest coverage ratio of &nbsp;
        <p>{analyzedData && `${analyzedData.IRatio.data.toFixed(2)}`}</p>
        is &nbsp;
        {analyzedData &&
          (analyzedData.IRatio.isSixHigher ? (
            <Badge colorScheme="green">Very Good</Badge>
          ) : analyzedData.IRatio.isOneToSix ? (
            <Badge colorScheme="yellow">Good</Badge>
          ) : (
            <Badge colorScheme="red">Bad</Badge>
          ))}
      </ResultContainer>
      <CheckBox description="Steady climb or revenue growth over the last 3 years" />
      <Box p="0 2rem">
        {analyzedData && (
          <Line
            type="Line"
            height={95}
            data={() => {
              const currentYear = new Date().getFullYear();
              const labels = analyzedData?.RGrowth.data.map((_, i) => {
                return (currentYear - i).toString();
              });
              return createLineChartData(
                labels,
                analyzedData?.RGrowth.data.map((value) => parseInt(value)) as [
                  number
                ],
                analyzedData?.EPS.isIncreasing ? "green" : "red"
              );
            }}
            options={eps_linechart_options}
          />
        )}
      </Box>
      {analyzedData && (
        <ResultContainer>
          Revenue growth of ${analyzedData.RGrowth.data[0]}{" "}
          {analyzedData.RGrowth.isIncreasing ? "and " : "but "}is &nbsp;
          {analyzedData.RGrowth.isIncreasing ? (
            <Badge colorScheme="green">increasing</Badge>
          ) : (
            <Badge colorScheme="red">not increasing</Badge>
          )}
        </ResultContainer>
      )}
      <CheckBox description="Positive operating income/loss" />
      <ResultContainer>
        Operating income of $
        <p>{analyzedData && `${analyzedData.IncomeLoss.data[0]}`}</p>
        is &nbsp;
        {analyzedData &&
          (analyzedData.IncomeLoss.isNegative ? (
            <Badge colorScheme="red">Bad</Badge>
          ) : (
            <Badge colorScheme="green">Good</Badge>
          ))}
      </ResultContainer>
      <CheckBox description="Positive net income" />
      <ResultContainer>
        Net income of $
        <p>{analyzedData && `${analyzedData.PnetIncome.data[0]}`}</p>
        is &nbsp;{" "}
        {analyzedData &&
          (analyzedData.PnetIncome.isPositive ? (
            <Badge colorScheme="green">Good</Badge>
          ) : (
            <Badge colorScheme="red">Bad</Badge>
          ))}
      </ResultContainer>
      <CheckBox description="A lot of total cash" />
      <ResultContainer>
        Total cash of $<p>{analyzedData && `${analyzedData.TotalCash.data}`}</p>
      </ResultContainer>
      <CheckBox description="Higher assets than liabilities" />
      <ResultContainer>
        Assets of &nbsp;
        <p>{analyzedData && `$${analyzedData.TotalAssets.data.assets}`}</p>
        and Liabilities of &nbsp;
        <p>{analyzedData && `$${analyzedData.TotalAssets.data.liabilities}`}</p>
        is &nbsp;
        {analyzedData &&
          (analyzedData.TotalAssets.isPositiveAL ? (
            <Badge colorScheme="green">Good</Badge>
          ) : (
            <Badge colorScheme="red">Bad</Badge>
          ))}
      </ResultContainer>
      {/* <CheckBox
            name="GWIA"
            description="Goodwill and intangible assets should be 0 or less"
            currentOptions={currentOptions}
            setCurrentOptions={setCurrentOptions}
          /> */}
      <CheckBox description="Long term debt. Less is better" />
      <ResultContainer>
        Long-term debt of &nbsp;
        <p>{analyzedData && `$${analyzedData.LTD.data}`}</p>
      </ResultContainer>
      <CheckBox description="Stock holder equity. Want this to see growth over the past 3 years" />
      <Box p="0 2rem">
        {analyzedData && (
          <Line
            type="Line"
            height={95}
            data={() => {
              const currentYear = new Date().getFullYear();
              const labels = analyzedData?.SHEquity.data.map((_, i) => {
                return (currentYear - i).toString();
              });
              return createLineChartData(
                labels,
                analyzedData?.SHEquity.data.map((value) => parseInt(value)) as [
                  number
                ],
                analyzedData?.SHEquity.isIncreasing ? "green" : "red"
              );
            }}
            options={eps_linechart_options}
          />
        )}
      </Box>
      {analyzedData && (
        <ResultContainer>
          Share holders' equity growth of ${analyzedData.SHEquity.data[0]} and
          is &nbsp;
          {analyzedData.SHEquity.isIncreasing ? (
            <Badge colorScheme="green">increasing</Badge>
          ) : (
            <Badge colorScheme="red">not increasing</Badge>
          )}
        </ResultContainer>
      )}
    </Index__optionsTable>
  );
};
