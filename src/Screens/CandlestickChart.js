/* eslint-disable prettier/prettier */
import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import {Line, G, Rect, Svg, Text as SvgText} from 'react-native-svg';
import * as d3 from 'd3-scale';

const CandlestickChart = ({data, width, height}) => {
  const xScale = d3
    .scaleLinear()
    .domain([0, data.length - 1])
    .range([0, width]);
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.high)])
    .range([height, 0]);

  const candleWidth = width / data.length - 2;

  return (
    <ScrollView horizontal contentContainerStyle={{paddingRight: 16}}>
      <View>
        <Svg width={width} height={height + 40}>
          <G>
            {data.map((d, i) => {
              const x = xScale(i);
              const candleHeight = yScale(d.high - d.low);
              const candleY = yScale(d.high);
              const wickY1 = yScale(d.high);
              const wickY2 = yScale(d.low);

              return (
                <G key={i}>
                  <Rect
                    x={x}
                    y={candleY}
                    width={candleWidth}
                    height={candleHeight}
                    fill={d.close > d.open ? 'green' : 'red'}
                  />
                  <Line
                    x1={x + candleWidth / 2}
                    y1={wickY1}
                    x2={x + candleWidth / 2}
                    y2={wickY2}
                    stroke="black"
                    strokeWidth="2"
                  />
                </G>
              );
            })}

            {/* Date labels */}
            {data.map((d, i) => (
              <SvgText
                key={i}
                x={xScale(i) + candleWidth / 2}
                y={height + 30} // Adjust the y position as needed
                fontSize="10"
                fill="black"
                textAnchor="middle">
                {d.date}
              </SvgText>
            ))}
          </G>
        </Svg>
      </View>
    </ScrollView>
  );
};

export default CandlestickChart;
