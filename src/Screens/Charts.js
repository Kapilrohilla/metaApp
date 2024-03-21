import React, {useContext, useEffect, useState} from 'react';
import {StatusBar, StyleSheet, Text, View, Vibration, TouchableOpacity} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import {scale} from '../utils/overAllNormalization';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import {BASEURL} from '@env';
import Snackbar from 'react-native-snackbar';
import {Modal, Portal, Button, RadioButton, Menu} from 'react-native-paper';

import {AuthContext} from '../Navigation/AuthProvider';
import store from '../../ReduxToolkit/store';
import {useDispatch, useSelector} from 'react-redux';
import {updateMargin} from '../../ReduxToolkit/slices/userSlice';
// import {ToastAndroid} from 'react-native';

const Header = React.memo(({navigation, setFirst, view, setView, selected}) => {
  const BASEURL = useSelector(state => state.baseUrl);
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
      }}>
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Entypo name="menu" color={'#fff'} size={30} />
        <Text
          style={{
            fontSize: 18,
            color: '#fff',
            fontFamily: 'Inter-SemiBold',
            fontWeight: '600',
            marginLeft: 10,
          }}>
          Chart
        </Text>
      </TouchableOpacity>
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Entypo name="plus" color={'#fff'} size={40} onPress={() => navigation.navigate('AddSymbols')} />
        <TouchableOpacity onPress={() => setFirst(true)}>
          <Text
            style={{
              fontSize: scale(16),
              color: '#fff',
              marginLeft: 8,
              fontWeight: '700',
            }}>
            {selected}
          </Text>
        </TouchableOpacity>
        <AntDesign
          name="fork"
          color={'#fff'}
          size={30}
          style={{marginHorizontal: 10}}
          onPress={() => navigation.navigate('MainIndicator')}
        />
        <Entypo name="dropbox" color={'#fff'} size={25} onPress={() => setView(!view)} />
      </View>
    </View>
  );
});

const Charts = ({route}) => {
  const BASEURL = useSelector(state => state.baseUrl);
  const timeFilterValues = [
    ['M1', 1],
    ['M5', 5],
    ['M15', 15],
    ['M30', 30],
    ['H1', 60 * 1],
    ['H4', 60 * 4],
    ['D1', 24 * 60],
    ['W1', 7 * 24 * 60],
    ['MN', 28 * 24 * 60], // noOfDaysInMonth = 28
  ];
  const navigation = useNavigation();
  const [view, setView] = useState(false);
  const [first, setFirst] = useState(false);
  const isFocused = useIsFocused();
  const [symbol, setSymbol] = useState({
    name: route?.params?.symbol?.name,
    description: route?.params?.symbol?.description,
  });

  const createInstantOrder = (token, symbol) => {
    return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width, height=device-height, target-densitydpi=device-dpi"
    />
  </head>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: sans-serif;
    }
    .container {
      display: flex;
      flex-direction: row;
      gap: 0;
      height: 50px;
      max-width: 100%;
      width: 100%;
    }
    .sellBtn {
      background-color: #3283fe;
      outline: none;
      border: none;
      /* height: 50px; */
      height: 100%;
      padding-inline: 10px;
      width: 150px;
      position: relative;
    }
    .buyBtn {
      background-color: #eb4b4b;
      outline: none;
      border: none;
      height: 100%;
      padding-inline: 10px;
      width: 150px;
      position: relative;
    }
    .text {
      position: absolute;
      top: 3px;
      color: white;
      left: 3px;
    }
    .value {
      color: white;
      font-weight: 500;
      position: relative;
    }
    .bigText {
      font-size: 18px;
    }
    .superScript {
      margin-left: 1px;
      font-weight: 600;
      position: relative;
      bottom: 2px;
    }
    .volumeContainer {
      border: 1px solid #808080;
      display: flex;
      flex: 1;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
    input {
      height: 100%;
      text-align: center;
      outline: none;
      border: none;
      background-color: black;
      color: white;
    }
    button {
      border: none;
      outline: none;
      background-color: black;
    }
  </style>
      <script
      src="https://cdn.socket.io/4.7.4/socket.io.min.js"
      integrity="sha384-Gr6Lu2Ajx28mzwyVR8CFkULdCU7kMlZ9UthllibdOSo6qAiN+yXNHqtgdTvFXMT4"
      crossorigin="anonymous"
    ></script>
  <body style="background-color: black; overflow: hidden">
    <div class="container">
      <button class="sellBtn" onclick="handleCreateOrder(0)">
        <small class="text">SELL</small>
        <span class="value">
          <span class="mainText">0</span>
          <!-- <span class="bigText">09</span
          ><sup class="superScript">5</sup> -->
        </span>
      </button>
      <div class="volumeContainer">
        <button
          style="height: 100%; width: 40px"
          onclick="handleBtnClick(-0.01)"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M7 10L12 15L17 10"
                stroke="#fff"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </g>
          </svg>
        </button>
        <input type="number" name="" id="" value="0.01" style="width: 80px" />
        <button
          style="height: 100%; width: 40px"
          onclick="handleBtnClick(0.01)"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M5 15L10 9.84985C10.2563 9.57616 10.566 9.35814 10.9101 9.20898C11.2541 9.05983 11.625 8.98291 12 8.98291C12.375 8.98291 12.7459 9.05983 13.0899 9.20898C13.434 9.35814 13.7437 9.57616 14 9.84985L19 15"
                stroke="#fff"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </g>
          </svg>
        </button>
      </div>
      <button class="buyBtn" onclick="handleCreateOrder(1)">
        <small class="text">Buy</small>
        <span class="value"
          ><span class="mainText">0</span>
          <!-- <span class="bigText">09</span
          ><sup class="superScript">5</sup> -->
        </span>
      </button>
    </div>

    <script>
    const symbol = '${symbol}';
    const Token = '${token}';

      const socket = io('${BASEURL}', {
        transports: ["websocket"],
        withCredentials: false,
      });

      const maintext = document.getElementsByClassName("mainText");
      const updateBtnsText = (socket) => {
        if (socket.symbol === symbol) {
          const buyBtn = document.getElementsByClassName("buyBtn")[0];
          const sellBtn = document.getElementsByClassName("sellBtn")[0];
          if (Number(maintext[0].innerHTML) < Number(socket.bid)) {
            sellBtn.style.backgroundColor = "#eb4b4b";
          }
          if (Number(maintext[0].innerHTML) > Number(socket.bid)) {
            sellBtn.style.backgroundColor = "#3283fe";
          }
          if (Number(maintext[1].innerHTML) < Number(socket.ask)) {
            buyBtn.style.backgroundColor = "#eb4b4b";
          }
          if (Number(maintext[1].innerHTML) > Number(socket.ask)) {
            buyBtn.style.backgroundColor = "#3283fe";
          }
          maintext[0].innerHTML = Number(socket.bid).toFixed(4);
          maintext[1].innerHTML = Number(socket.ask).toFixed(4);
        }
      };
      socket.on("newMessage", (data) => {
        updateBtnsText(data?.newMessage);
      });
    </script>
    <script>
      const input = document.getElementsByTagName("input")[0];

      const handleBtnClick = (count) => {
        input.value = (Number(input.value) + Number(count)).toFixed(2);
      };

      const handleCreateOrder = (type) => {
        const body = JSON.stringify({
          qty: Number(document.getElementsByTagName("input")[0].value),
          symbol: symbol,
          type: type,
        });

        fetch("${BASEURL}/create-order", {
          method: "POST",
          body: body,
          headers: {
            Authorization: Token,
            "Content-Type": "application/json",
          },
        })
          .then((r) => r.json())
          .then((r) => {
            window.ReactNativeWebView.postMessage(JSON.stringify(r))
          })
          .catch((err) => {
            alert("failed");
            alert(err.message);
            console.log(err);
          });
      };
    </script>
  </body>
</html>
  `;
  };
  const dispatch = useDispatch();

  const {Token} = useContext(AuthContext);
  const [openChangeSymbolModal, setOpenChangeSymbolModal] = useState(false);

  useEffect(() => {
    console.log('mounting');
    if (isFocused) {
      setSymbol({
        name: route?.params?.symbol?.name,
        description: route?.params?.symbol?.description,
      });
      const timeout = setTimeout(() => {
        setFirst(false);
      }, 5000);
      return () => {
        clearTimeout(timeout);
        console.log('unmounting');
      };
    }
  }, [route]);

  // useEffect(() => {
  //   return () => console.log('unmounting');
  // }, [route]);

  const [visible, setVisible] = React.useState(false);

  const watchlistData = store.getState().watchlist;

  const symbolInfo = watchlistData.map(data => {
    return {symbol: data?.symbol, description: data?.description};
  });

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const containerStyle = {backgroundColor: 'white', padding: 20};

  const selectedItemLabel = Object.values(timeFilterValues[0])[1];
  const [selectedTime, setSelectedTime] = useState(selectedItemLabel);
  const getChartHTML = () => {
    return `
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
      }
    </style>
  </head>
  <body>
    <div id="container" style="max-width: 100%; height: 100vh"></div>

    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.7.1/socket.io.js"
      integrity="sha512-Z6C1p1NIexPj5MsVUunW4pg7uMX6/TT3CUVldmjXx2kpip1eZcrAnxIusDxyFIikyM9A61zOVNgvLr/TGudOQg=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    ></script>
    <!-- Lightweight Charts JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/lightweight-charts@4.1.0/dist/lightweight-charts.standalone.production.min.js"></script>

    <script>
      const data = {
        symbol: "XAUUSD",
        time: 1,
        type: "Bar",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWRjMThiODRjMDQ0MTljYTFiNWJkZDQiLCJpYXQiOjE3MDg5MjU5NjEsImV4cCI6MTcwOTUzMDc2MX0.FNLFsPXBIVVBi92zmpseekD3y1mQASP4DxirB6DbqmE",
      };
      const symbol = '${symbol.name}';
      const time = '${selectedTime}';
      const type = "candle";
      const urlToken = '${Token}';
      let defaultSymbol;
      let defaultType;

      let dataFetched = false;
      let watchlistFetched = false;
      let defaultRange = 0;
      if (symbol == null) {
        defaultSymbol = "XAUUSD";
      } else {
        defaultSymbol = symbol;
      }

      if (type == null) {
        defaultType = "candle";
      } else {
        defaultType = type;
      }

      let defaultTime;
      if (time == null) {
        defaultTime = 1;
      } else {
        defaultTime = time;
      }

      //initalize chart data as empty array
      const chartData = [];
      const lineData = [];
      const volumeData = [];
      const areaChartData = [];
      const symbolDataMap = new Map();
      let symbolDigits = [];
      const baseUrl = '${BASEURL}';

      // Function to fetch inital data for chart
      const fetchWatchListData = async () => {
        try {
          let token = urlToken;

          // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ5YTczZTY1MWMzMDM3MTU2N2Y3MzMiLCJpYXQiOjE3MDg3NjI5ODMsImV4cCI6MTcwOTM2Nzc4M30.0gN8U6O0O0Q6bWDSpkG2ChoHN6NALu-0DRQV3Lbu3VI';
          const headers = {
            Authorization: token,
          };

          const response = await fetch(baseUrl + "/get-watchlist-data", {
            headers: headers,
          });

          if (!response.ok) {
            throw new Error(
              "API request failed with status: " + response.status
            );
          }

          const data = await response.json();

          return data.message;
        } catch (error) {
          console.error("Error fetching data:", error);
          return null;
        }
      };

      // Function to fetch data from the API
      const fetchData = async (symbol, time) => {
        try {
          let newRange = defaultRange + 5;
          const url =
            baseUrl +
            "/get-data/" +
            symbol +
            "/" +
            time +
            "?from=" +
            defaultRange +
            "&to=" +
            newRange;
          const response = await fetch(url);

          if (!response.ok) {
            throw new Error(
              "API request failed with status: " + response.status
            );
          }
          defaultRange = newRange;
          const data = await response.json();

          return data;
        } catch (error) {
          console.error("Error fetching data:", error);
          return null;
        }
      };

      //initailizing chart
      let container = document.getElementById("container");
      var chart = LightweightCharts.createChart(container, {
        width: container.offsetWidth,
        height: container.offsetHeight,

        rightPriceScale: {
          scaleMargins: {
            top: 0.3,
            bottom: 0.25,
          },
          borderVisible: false,
        },
        layout: {
          background: {
            type: "solid",
            color: "#000",
          },
          textColor: "#d1d4dc",
        },
        grid: {
          vertLines: {
            color: "rgba(197, 203, 206, 0.5)",
          },
          horzLines: {
            color: "rgba(197, 203, 206, 0.5)",
          },
        },
        timeScale: {
          visible: true,
          timeVisible: true,
          secondsVisible: false,
          rightOffset: 30,
          tickMarkFormatter: (time, tickMarkType, locale) => {
            const date = new Date(time * 1000);
            const day = date.getDate();
            const month = date.toLocaleString(locale, { month: "short" });
            // const year = date.getFullYear().toString().slice(-2);
            const hours = date.getHours().toString().padStart(2, "0");
            const minutes = date.getMinutes().toString().padStart(2, "0");

            return month + " " + day + " " + hours + ":" + minutes;
          },
        },
        crosshair: {
          mode: LightweightCharts.CrosshairMode.Normal,
          // Vertical crosshair line (showing Date in Label)
          vertLine: {
            // color: '#C3BCDB44',
            style: LightweightCharts.LineStyle.Solid,
          },

          // Horizontal crosshair line (showing Price in Label)
          horzLine: {
            style: LightweightCharts.LineStyle.Solid,
          },
        },
      });

      const myPriceFormatter = (p) => {
        let price = parseFloat(p);
        // console.log(price);
        return price.toFixed(getDecimalPlaces(defaultSymbol));
      };

      chart.applyOptions({
        localization: {
          priceFormatter: myPriceFormatter,
        },
      });

      let candleSeries = chart.addCandlestickSeries({
        upColor: "#198754",
        downColor: "#dc3545",
        borderDownColor: "#dc3545",
        borderUpColor: "#198754",
        wickDownColor: "#dc3545",
        wickUpColor: "#198754",
      });
      let areaSeries = chart.addAreaSeries({
        lineColor: "#2962FF",
        topColor: "#2962FF",
        bottomColor: "rgba(41, 98, 255, 0.28)",
        priceLineStyle: 0,
        lineWidth: 2,
      });

      let barSeries = chart.addBarSeries({
        upColor: "#198754",
        downColor: "#dc3545",
        borderDownColor: "#dc3545",
        borderUpColor: "#198754",
        wickDownColor: "#dc3545",
        wickUpColor: "#198754",
        priceLineStyle: 0,
        lineWidth: 2,
      });

      let prevTimestamp = null;
      let prevOpen = null;
      let prevHigh = null;
      let prevLow = null;

      // Function to add or update a new data point recieved by socket in the candlestick chart
      const addOrUpdateDataPoint = (newDataPoint) => {
        if (chart) {
          if (newDataPoint.symbol == defaultSymbol) {
            const date = new Date(newDataPoint.createdAt);
            const timestamp =
              Math.floor(date.getTime() / (defaultTime * 60 * 1000)) *
              (defaultTime * 60);

            if (prevTimestamp == timestamp) {
              if (parseFloat(newDataPoint.high) > prevHigh) {
                prevHigh = parseFloat(newDataPoint.high);
              }
              if (parseFloat(newDataPoint.low) < prevLow) {
                prevLow = parseFloat(newDataPoint.low);
              }
            } else {
              prevTimestamp = timestamp;
              prevOpen = parseFloat(newDataPoint.open);
              prevHigh = parseFloat(newDataPoint.high);
              prevLow = parseFloat(newDataPoint.low);
            }

            let newData = {};
            newData.time = prevTimestamp;
            newData.open = prevOpen;
            newData.high = prevHigh;
            newData.low = prevLow;
            newData.close = newDataPoint.close;

            if (defaultType == "bar") {
              // Add a new candle with socket data
              barSeries.update(newData);
            } else if (defaultType == "candle") {
              candleSeries.update(newData);
            } else {
              areaSeries.update({ value: close, time: prevTimestamp });
            }
          }
        }
      };

      fetchWatchListData()
        .then((data) => {
          if (data) {
            data.forEach((result) => {
              if (result !== null) {
                if (defaultSymbol == null) {
                  defaultSymbol = result.symbol;
                }

                const existingSymbol = symbolDigits.find(
                  (symbol) => symbol.symbol === result.symbol
                );

                if (existingSymbol) {
                  // Update existing object
                  existingSymbol.digits = parseInt(result.digits);
                  existingSymbol.contractSize = parseInt(result.contractSize);
                  (existingSymbol.maxVolume = parseFloat(result.maxVolume)),
                    (existingSymbol.minVolume = parseFloat(result.minVolume));
                } else {
                  // Add new object
                  symbolDigits.push({
                    symbol: result.symbol,
                    digits: parseInt(result.digits),
                    contractSize: parseInt(result.contractSize),
                    description: result.description,
                    maxVolume: parseFloat(result.maxVolume),
                    minVolume: parseFloat(result.minVolume),
                  });
                }
                symbolDataMap.set(result.symbol, {
                  symbol: result.symbol,
                  change_percent: parseFloat(result.changePercent).toFixed(
                    result.digits
                  ),
                  change_points: parseFloat(result.changePoints).toFixed(
                    result.digits
                  ),
                  bid: parseFloat(result.bid).toFixed(result.digits),
                  ask: parseFloat(result.ask).toFixed(result.digits),
                  bidChange: result.bidChange,
                  askChange: result.askChange,
                  source: result.source,
                  // volume: result.volume
                });
              }
            });

            populateChart(defaultSymbol, defaultTime);

            watchlistFetched = true;
          } else {
            console.log("No data retrieved from the API.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      const populateChart = (defaultSymbol, defaultTime) => {
        // Fetch data from API and populate chartData with inital data by calling function defined on top
        fetchData(defaultSymbol, defaultTime)
          .then((data) => {
            if (data) {
              data.forEach((result) => {
                if (result._id.symbol == defaultSymbol) {
                  let open = parseFloat(result.open);
                  let high = parseFloat(result.high);
                  let low = parseFloat(result.low);
                  let close = parseFloat(result.close);

                  let timestamp = Math.floor(
                    new Date(result.date).getTime() / 1000
                  );

                  prevTimestamp = timestamp;
                  prevOpen = open;
                  prevHigh = high;
                  prevLow = low;

                  const newDataPoint = {
                    time: timestamp,
                    open: open,
                    high: high,
                    low: low,
                    close: close,
                  };
                  const areaChartValues = {
                    value: close,
                    time: timestamp,
                  };
                  areaChartData.push(areaChartValues);
                  chartData.push(newDataPoint);
                }
              });

              if (defaultType === "area") {
                areaChartData.sort((a, b) => a.time - b.time);
                const uniqueChartData = Array.from(
                  new Map(
                    areaChartData.map((item) => [item.time, item])
                  ).values()
                );

                areaSeries.setData(uniqueChartData);
                barSeries.setData([]);
                candleSeries.setData([]);
              } else if (defaultType === "bar") {
                chartData.sort((a, b) => a.time - b.time);

                const uniqueChartData = Array.from(
                  new Map(chartData.map((item) => [item.time, item])).values()
                );
                barSeries.setData(uniqueChartData);
                areaSeries.setData([]);
                candleSeries.setData([]);
              } else {
                chartData.sort((a, b) => a.time - b.time);

                const uniqueChartData = Array.from(
                  new Map(chartData.map((item) => [item.time, item])).values()
                );
                candleSeries.setData(uniqueChartData);
                barSeries.setData([]);
                areaSeries.setData([]);
              }
            } else {
              console.log("No data retrieved from the API.");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      };

      window.addEventListener("resize", () => {
        chart.resize(window.innerWidth, window.innerHeight);
      });

      // Starting socket connection
      const socket = io('${BASEURL}', {
        transports: ["websocket"],
        withCredentials: false,
      });
      socket.on("connect", () => {
        console.log("Connected to server");
      });

      // Event handler for new data points from the WebSocket
      socket.on("newMessage", (newDataPoint) => {
        let tableData = newDataPoint.newMessage;

        let symbol = tableData.symbol;

        if (symbolDataMap.has(symbol)) {
          // Update existing symbol data
          symbolDataMap.set(symbol, {
            symbol: symbol,
            change_percent: tableData.changePercent,
            change_points: tableData.changePoints,
            bid: tableData.bid,
            ask: tableData.ask,
            bidChange: tableData.bidChange,
            askChange: tableData.askChange,
            // volume: result.volume
          });
        } else {
          // Add new symbol data
          symbolDataMap.set(symbol, {
            symbol: symbol,
            change_percent: tableData.changePercent,
            change_points: tableData.changePoints,
            bid: tableData.bid,
            ask: tableData.ask,
            // volume: result.volume
          });
        }

        //calling add or update function to update candlestick chart in real time
        addOrUpdateDataPoint(newDataPoint.results);
      });

      // Event handler for row clicks
      function handleTimeChange(time) {
        //  console.log(time);
        if ((defaultSymbol, time)) {
          fetchData(defaultSymbol, time)
            .then((data) => {
              defaultTime = time;

              if (data) {
                let chartData = [];
                data.forEach((result) => {
                  if (result._id.symbol == defaultSymbol) {
                    let open = parseFloat(result.open);
                    let high = parseFloat(result.high);
                    let low = parseFloat(result.low);
                    let close = parseFloat(result.close);
                    let timestamp = Math.floor(
                      new Date(result.date).getTime() / 1000
                    );

                    const newDataPoint = {
                      time: timestamp,
                      open: open,
                      high: high,
                      low: low,
                      close: close,
                    };

                    prevTimestamp = timestamp;
                    prevOpen = open;
                    prevHigh = high;
                    prevLow = low;

                    chartData.push(newDataPoint);
                  }
                });
                chartData.sort((a, b) => a.time - b.time);
                const uniqueChartData = Array.from(
                  new Map(chartData.map((item) => [item.time, item])).values()
                );
                candleSeries.setData(uniqueChartData);
              } else {
                console.log("No data retrieved from the API.");
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      }

      const getDecimalPlaces = (symbol) => {
        const symbolInfo = symbolDigits.find((info) => info.symbol === symbol);

        return symbolInfo ? symbolInfo.digits : 2;
      };

      let beforapiCalled = false;
      function onVisibleLogicalRangeChanged(newVisibleLogicalRange) {
        const barsInfo = candleSeries.barsInLogicalRange(
          newVisibleLogicalRange
        );

        // If there are fewer than 50 bars to the left of the visible area
        if (barsInfo !== null && barsInfo.barsBefore < 1 && !beforapiCalled) {
          beforapiCalled = true;

          fetchData(defaultSymbol, defaultTime)
            .then((data) => {
              if (data) {
                data.reverse().forEach((result) => {
                  if (result._id.symbol == defaultSymbol) {
                    let open = parseFloat(result.open);
                    let high = parseFloat(result.high);
                    let low = parseFloat(result.low);
                    let close = parseFloat(result.close);
                    let timestamp = Math.floor(
                      new Date(result.date).getTime() / 1000
                    );

                    const newDataPoint = {
                      time: timestamp,
                      open: open,
                      high: high,
                      low: low,
                      close: close,
                    };

                    prevTimestamp = timestamp;
                    prevOpen = open;
                    prevHigh = high;
                    prevLow = low;
                    prevClose = close;

                    // Prepend data to chartData array
                    chartData.push(newDataPoint);
                    areaChartData.push({ value: close, time: prevTimestamp });
                  }
                });
                chartData.sort((a, b) => a.time - b.time);

                const uniqueChartData = Array.from(
                  new Map(chartData.map((item) => [item.time, item])).values()
                );

                areaChartData.sort((a, b) => a.time - b.time);

                const uniqueAreaChartData = Array.from(
                  new Map(
                    areaChartData.map((item) => [item.time, item])
                  ).values()
                );

                if (defaultType === "area") {
                  areaSeries.setData(uniqueAreaChartData);
                } else if (defaultType == "bar") {
                  barSeries.setData(uniqueChartData);
                } else {
                  candleSeries.setData(uniqueChartData);
                }

                beforapiCalled = false;
              } else {
                console.log("No data retrieved from the API.");
                beforapiCalled = false;
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      }

      chart
        .timeScale()
        .subscribeVisibleLogicalRangeChange(onVisibleLogicalRangeChanged);
    </script>
  </body>
</html>
`;
  };
  let selectedTimeLabel;
  timeFilterValues.forEach(time => {
    if (time[1] === selectedTime) {
      selectedTimeLabel = time[0];
    }
  });

  console.log(symbol);
  return (
    <>
      <View style={styles.container}>
        {
          <View
            style={{
              position: 'absolute',
              top: view ? 120 : 70,
              left: 5,
              zIndex: 99,
            }}>
            <Menu
              visible={openChangeSymbolModal}
              onDismiss={() => setOpenChangeSymbolModal(false)}
              anchor={
                <TouchableOpacity
                  onPress={() => {
                    setOpenChangeSymbolModal(true);
                  }}>
                  <View style={{flexDirection: 'row', gap: 3}}>
                    <Text style={{color: '#3183ff', fontSize: 12}}>{symbol?.name}</Text>
                    <Text style={{color: '#fff', fontSize: 12}}>{selectedTimeLabel}</Text>
                  </View>
                  <Text style={{color: '#fff', fontSize: 12}}>{symbol?.description}</Text>
                </TouchableOpacity>
              }>
              {symbolInfo.map(symbolDetails => {
                return (
                  <Menu.Item
                    key={symbolDetails?.symbol}
                    onPress={() => {
                      setSymbol({
                        name: symbolDetails?.symbol,
                        description: symbolDetails?.description,
                      });
                      setOpenChangeSymbolModal(false);
                    }}
                    title={symbolDetails?.symbol}
                  />
                );
              })}
            </Menu>
          </View>
        }
        {first ? (
          <>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                padding: 10,
                marginTop: 10,
              }}>
              {timeFilterValues.slice(0, 6).map((item, index) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedTime(item[1]);
                        setFirst(false);
                      }}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: scale(16),
                          color: '#ffffff',
                          fontWeight: '700',
                        }}>
                        {item[0]}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
              <AntDesign
                name="setting"
                color={'#fff'}
                size={30}
                style={{marginHorizontal: 10}}
                onPress={() => showModal()}
              />
            </View>
          </>
        ) : (
          <Header
            navigation={navigation}
            setFirst={setFirst}
            setView={setView}
            view={view}
            selected={selectedTimeLabel}
          />
        )}
        {view === true ? (
          <View style={{height: 80}}>
            <WebView
              source={{html: createInstantOrder(Token, symbol?.name)}}
              style={{height: 80, zIndex: 9999}}
              renderLoading={() => {
                <View style={{height: 80, zIndex: 9999}}></View>;
              }}
              onMessage={event => {
                const updatedPosition = JSON.parse(event.nativeEvent.data);
                console.log(updatedPosition);
                if (!updatedPosition?.valid) {
                  console.warn('failed');
                  Snackbar.show({
                    text: updatedPosition?.message,
                    textColor: 'red',
                    backgroundColor: '#ccc',
                  });
                } else {
                  Snackbar.show({
                    text: 'Order successfully created',
                    textColor: 'green',
                    backgroundColor: '#ccc',
                  });
                }
                dispatch(updateMargin(Number(updatedPosition?.totalMargin)));
              }}
            />
          </View>
        ) : null}

        <WebView
          source={{
            html: getChartHTML(),
          }}
          renderLoading={() => <View style={{flex: 1, backgroundColor: '#000'}}></View>}
          style={{flex: 1, zIndex: 99}}
        />
      </View>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <>
            <ModalContent
              timeFilterValues={timeFilterValues}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              hideModal={hideModal}
            />
          </>
        </Modal>
      </Portal>
      {/* <Snackbar visible={showSnackbar}>Order Placed</Snackbar> */}
    </>
  );
};

const ModalContent = ({timeFilterValues, selectedTime, setSelectedTime, hideModal}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}>
      <RadioButton.Group
        onValueChange={newValue => {
          setSelectedTime(newValue);
        }}
        value={selectedTime}>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10}}>
          {timeFilterValues?.map((item, index) => {
            const label = item[0];
            const time = item[1];
            return (
              <>
                <View style={{flexDirection: 'row', alignItems: 'center'}} key={index}>
                  <RadioButton value={time} />
                  <Text style={{color: '#000'}}>{label}</Text>
                </View>
              </>
            );
          })}
        </View>
      </RadioButton.Group>

      <Button onPress={() => hideModal()}>Cancel</Button>
      <Button
        onPress={() => {
          hideModal();
        }}>
        Ok
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default Charts;
