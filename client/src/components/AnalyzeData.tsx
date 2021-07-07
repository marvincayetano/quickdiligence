import React from "react";

import { Line } from "react-chartjs-2";
import { Box, Badge } from "@chakra-ui/react";
import { Index__optionsTable, Index__optionsDiv } from "../styles/Index";
import { CheckBox } from "./CheckBox";
import { ResultContainer } from "./ResultContainer";

export interface AnalyzeDataInterface {
  Price: number;
  EPS: {
    data: number[];
    isPositiveNumber: boolean;
    isIncreasing: boolean;
  };
  PERatio: {
    data: string;
    isUndervalued: boolean;
    isOverValued: boolean;
  };
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
      <Index__optionsDiv>
        <CheckBox
          description="Earnings per share (EPS)"
          tip="EPS should be a positive number and increasing"
        />
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
                  labels.reverse(),
                  analyzedData?.EPS.data.reverse() as [number],
                  analyzedData?.EPS.isIncreasing ? "green" : "red"
                );
              }}
              options={eps_linechart_options}
            />
          )}
        </Box>
        {analyzedData && (
          <ResultContainer>
            <p>EPS is &nbsp;</p>
            {analyzedData.EPS.isPositiveNumber ? (
              <Badge colorScheme="green">positive</Badge>
            ) : (
              <Badge colorScheme="red">negative</Badge>
            )}
            <p>&nbsp; and is &nbsp;</p>
            {analyzedData.EPS.isIncreasing ? (
              <Badge colorScheme="green">increasing</Badge>
            ) : (
              <Badge colorScheme="red">not increasing</Badge>
            )}
          </ResultContainer>
        )}
      </Index__optionsDiv>
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

      <Index__optionsDiv>
        <CheckBox
          tip="Steady climb of Revenue growth is preferred"
          description="Revenue growth"
        />
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
                  labels.reverse(),
                  analyzedData?.RGrowth.data
                    .map((value) => parseInt(value))
                    .reverse() as [number],
                  analyzedData?.EPS.isIncreasing ? "green" : "red"
                );
              }}
              options={eps_linechart_options}
            />
          )}
        </Box>
        {analyzedData && (
          <ResultContainer>
            <p>
              Revenue growth of ${analyzedData.RGrowth.data[0]} &nbsp;
              {analyzedData.RGrowth.isIncreasing ? "and " : "but "}
              &nbsp; is &nbsp;
            </p>
            {analyzedData.RGrowth.isIncreasing ? (
              <Badge colorScheme="green">increasing</Badge>
            ) : (
              <Badge colorScheme="red">not increasing</Badge>
            )}
          </ResultContainer>
        )}
      </Index__optionsDiv>
      <Index__optionsDiv>
        <CheckBox
          tip="Stock holders' equity should be growing in the past 3 years"
          description="Stockholders' Equity"
        />
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
                  labels.reverse(),
                  analyzedData?.SHEquity.data
                    .map((value) => parseInt(value))
                    .reverse() as [number],
                  analyzedData?.SHEquity.isIncreasing ? "green" : "red"
                );
              }}
              options={eps_linechart_options}
            />
          )}
        </Box>
        {analyzedData && (
          <ResultContainer>
            <p>
              Share holders' equity growth of ${analyzedData.SHEquity.data[0]}{" "}
              and is &nbsp;
            </p>
            {analyzedData.SHEquity.isIncreasing ? (
              <Badge colorScheme="green">increasing</Badge>
            ) : (
              <Badge colorScheme="red">not increasing</Badge>
            )}
          </ResultContainer>
        )}
      </Index__optionsDiv>
      <Index__optionsDiv>
        <CheckBox
          tip="Stock price should be in a reasonable price unless the stock is a blue chip. PE Ratio of 15 or less is what we are looking for here"
          description="PE Ratio"
        />
        {analyzedData?.PERatio.data && analyzedData?.PERatio.data !== "N/A" ? (
          <ResultContainer>
            <p>
              PE Ratio of &nbsp;
              {analyzedData && ` ${analyzedData.PERatio.data}`}
              &nbsp; means &nbsp;
            </p>
            {analyzedData &&
              (analyzedData.PERatio.isOverValued ? (
                <Badge colorScheme="red">Overvalued</Badge>
              ) : (
                <Badge colorScheme="green">Good</Badge>
              ))}
          </ResultContainer>
        ) : (
          <ResultContainer>
            <p>PE Ratio is &nbsp;</p>
            <Badge colorScheme="orange">Unavailable</Badge>
          </ResultContainer>
        )}
      </Index__optionsDiv>
      <Index__optionsDiv>
        <CheckBox
          tip="Interest Coverage Ratio of 6 or higher is preferred"
          description="Interest Coverage Ratio"
        />
        <ResultContainer>
          <p>
            Interest coverage ratio of &nbsp;
            {analyzedData && `${analyzedData.IRatio.data.toFixed(2)}`}
            &nbsp; is &nbsp;
          </p>
          {analyzedData &&
            (analyzedData.IRatio.isSixHigher ? (
              <Badge colorScheme="green">Very Good</Badge>
            ) : analyzedData.IRatio.isOneToSix ? (
              <Badge colorScheme="yellow">Good</Badge>
            ) : (
              <Badge colorScheme="red">Bad</Badge>
            ))}
        </ResultContainer>
      </Index__optionsDiv>
      <Index__optionsDiv>
        <CheckBox
          tip="Positive number is a must"
          description="Operating Income/Loss"
        />
        <ResultContainer>
          <p>
            Operating income of $
            {analyzedData && `${analyzedData.IncomeLoss.data[0]}`}
            &nbsp; is &nbsp;
          </p>
          {analyzedData &&
            (analyzedData.IncomeLoss.isNegative ? (
              <Badge colorScheme="red">Bad</Badge>
            ) : (
              <Badge colorScheme="green">Good</Badge>
            ))}
        </ResultContainer>
      </Index__optionsDiv>
      <Index__optionsDiv>
        <CheckBox
          tip="Positive Net Income is a must"
          description="Net Income"
        />
        <ResultContainer>
          <p>
            Net income of $
            {analyzedData && `${analyzedData.PnetIncome.data[0]}`}
            &nbsp; is &nbsp;
          </p>
          {analyzedData &&
            (analyzedData.PnetIncome.isPositive ? (
              <Badge colorScheme="green">Good</Badge>
            ) : (
              <Badge colorScheme="red">Bad</Badge>
            ))}
        </ResultContainer>
      </Index__optionsDiv>
      <Index__optionsDiv>
        <CheckBox
          tip="Assets should always be higher than liabilities"
          description="Assets vs Liabilities"
        />
        <ResultContainer>
          <p>
            Assets of &nbsp;
            {analyzedData && `$${analyzedData.TotalAssets.data.assets}`}
            and Liabilities of &nbsp;
            {analyzedData && `$${analyzedData.TotalAssets.data.liabilities}`}
            &nbsp; is &nbsp;
          </p>
          {analyzedData &&
            (analyzedData.TotalAssets.isPositiveAL ? (
              <Badge colorScheme="green">Good</Badge>
            ) : (
              <Badge colorScheme="red">Bad</Badge>
            ))}
        </ResultContainer>
      </Index__optionsDiv>
      {/* <CheckBox
            name="GWIA"
            description="Goodwill and intangible assets should be 0 or less"
            currentOptions={currentOptions}
            setCurrentOptions={setCurrentOptions}
          /> */}
      <Index__optionsDiv>
        <CheckBox tip="Total cash that company has" description="Total cash" />
        <ResultContainer>
          <p>
            Total cash of ${analyzedData && `${analyzedData.TotalCash.data}`}
          </p>
        </ResultContainer>
      </Index__optionsDiv>
      <Index__optionsDiv>
        <CheckBox
          tip="Every company has debt, even apple has debt, but small debt is preferred"
          description="Long Term Debt"
        />
        <ResultContainer>
          <p>
            Long-term debt of &nbsp;
            {analyzedData && `$${analyzedData.LTD.data}`}
          </p>
        </ResultContainer>
      </Index__optionsDiv>
    </Index__optionsTable>
  );
};
