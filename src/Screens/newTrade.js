import React, {useContext, useEffect, useRef, useState} from 'react';
import WebView from 'react-native-webview';
import {AuthContext} from '../Navigation/AuthProvider';
import store from '../../ReduxToolkit/store';
import {Alert, ToastAndroid, View} from 'react-native';
import {DrawerActions, useIsFocused, useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Text} from 'react-native';
import {Divider, Menu} from 'react-native-paper';
import {scale} from '../utils/overAllNormalization';
import {Actionsheet, Box} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import {BASEURL} from '@env';
import {useDispatch, useSelector} from 'react-redux';
import {populateUser} from '../../ReduxToolkit/slices/userSlice';

export default function NewTrade() {
  const {Token} = useContext(AuthContext);
  const BASEURL = useSelector(state => state.baseUrl);

  function getHTML() {
    const TradeWebViewHtml = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>TradePanel</title>
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
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      body {
        font-family: "Poppins", sans-serif;
      }
      .balanceSectionText {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        line-height: 1.5rem;
      }
      #positionDropDown {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        line-height: 1.5rem;
      }
      #cardDesign-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .redColor {
        color: #ba5a5d;
      }
      .blueColor {
        color: #498ee6;
      }
      .greyColor {
        color: #8fa1b5;
      }
      .bold {
        font-weight: 600;
      }
      .none {
        display: none;
      }
      .cardDesign-bottomText {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-size: 12px;
      }
    </style>
    <body style="background-color: #0f1821; color: white">
      <!-- balance section -->
      <div style="width: 100%; padding: 10px">
        <p class="balanceSectionText">
          <span class="bold">Balance: </span>
          <span class="bold" id="balanceValue">0.00</span>
        </p>
        <p class="balanceSectionText">
          <span class="bold">Equity: </span>
          <span class="bold" id="equityValue">0.00</span>
        </p>
        <p class="balanceSectionText" id="usedMarginContainer">
          <span class="bold">Used Margin: </span>
          <span class="bold" id="marginValue">0.00</span>
        </p>
        <p class="balanceSectionText">
          <span class="bold">FreeMargin: </span>
          <span class="bold" id="freeMarginValue">0.00</span>
        </p>
        <p class="balanceSectionText" id="marginLevelContainer">
          <span class="bold">Margin Level (%): </span>
          <span class="bold" id="marginLevel">0.00</span>
        </p>
      </div>
      <hr style="border: 1px solid #1e2733" />
      <!-- positions text -->
      <div style="padding: 5px 10px">
      <div id="positionActions">
      </div>
      </div>
      <hr style="border: 1px solid #1e2733" />
      <!-- positions -->
      <div
        id="positionsContainer"
        style="overflow-y: scroll; overflow-x: hidden"
      ></div>
  
      <script
        src="https://cdn.socket.io/4.7.4/socket.io.min.js"
        integrity="sha384-Gr6Lu2Ajx28mzwyVR8CFkULdCU7kMlZ9UthllibdOSo6qAiN+yXNHqtgdTvFXMT4"
        crossorigin="anonymous"
      ></script>
      <!-- handle populate card -->
      <script>
        const nativeData = JSON.parse(window.ReactNativeWebView.injectedObjectJson());
        const balance = nativeData?.userData?.balance;
        const equity = document.getElementById("equityValue");
        equity.innerHTML = (balance).toFixed(2);
        const positionsContainer = document.getElementById("positionsContainer");
        const freeMargin = document.getElementById("freeMarginValue");
        const usedMargin = document.getElementById("usedMarginContainer");
        const marginLevel = document.getElementById("marginLevelContainer");
        usedMargin.style.display = "none";
        marginLevel.style.display = "none";
        freeMargin.innerHTML = (balance).toFixed(2);
        const apiUrl = '${BASEURL}/get-positions';
        let positions = []; // array populated by apiUrl
        const Token = nativeData?.token
        // const Token =    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTliYTdhMTRiNGQyZmEzMDU4ZDM5ZWMiLCJpYXQiOjE3MDY3OTI1NTYsImV4cCI6MTcwNzM5NzM1Nn0.5OdnIr_coua7B8-XosoYSSyr8DbkRnXXPTag10AmTrk";
        
        function formatDate(openPositionTime) {
          const year = openPositionTime?.split("-")[0];
          const month = openPositionTime?.split("-")[1];
          const date = openPositionTime?.split("T")[0]?.split("-")[2];
          const hour = openPositionTime?.split("T")[1]?.split(":")[0];
          const minute = openPositionTime?.split("T")[1]?.split(":")[1];
          const second = openPositionTime
            ?.split("T")[1]
            ?.split(":")[2]
            ?.slice(0, 2);
          const formatedDate =
            year +
            "." +
            month +
            "." +
            date +
            " " +
            hour +
            ":" +
            minute +
            ":" +
            second;
          return formatedDate;
        }
  
        function getDigit(symbol) {
         let watchlistData = nativeData?.watchlistData;
          for (let i = 0; i < watchlistData.length; i++) {
            if (symbol === watchlistData[i].symbol) {
              return {digit: watchlistData[i].digits, contractSize: watchlistData[i].contractSize};
            }
          }
        }
  
        function getCardHtml(details) {
          const symbol = details?.symbol;
          const digit = getDigit(symbol)?.digit;
          // alert(digit);
          const volume = details?.volume;
          const typeNum = details?.type;
          const price = details?.price?.toFixed(digit);
          let typeLabel;
          switch (typeNum) {
            case 0:
              typeLabel = "Sell";
              break;
            case 1:
              typeLabel = "Buy";
              break;
            case 2:
              typeLabel = "Buy Limit";
              break;
            case 3:
              typeLabel = "Sell Limit";
              break;
            case 4:
              typeLabel = "Buy Stop";
              break;
            case 5:
              typeLabel = "Sell Stop";
              break;
            case 6:
              typeLabel = "Buy Stop Limit";
              break;
            case 7:
              typeLabel = "Sell Stop Limit";
              break;
          }
          const stopLoss = (details?.stopLoss || 0)?.toFixed(digit);
          const takeProfit = (details?.takeProfit || 0)?.toFixed(digit);
          const swap = (details?.swap || 0)?.toFixed(digit);
          const ticket = details?.ticket || 0;
          let time = details?.updatedAt || "";
          if (time) {
            time = formatDate(time);
          }
          const currentColor = (typeNum === 1 || typeNum === 2 || typeNum === 4 || typeNum === 6) ? "blueColor" : "redColor";
          return (
            '<div style="padding: 7px 10px" class="card"> \
          <div id="cardDesign-top">\
            <div>\
              <div class="bold">\
                <span class="currentSymbol">' +
            symbol +
            '</span>,<span class="'+currentColor+'">' +
            typeLabel +
            " " +
            volume +
            '</span> \
              </div> \
              <div class="greyColor bold"> \
                <span>' +
            price +
            '</span><span> → </span> \
                <span class="currentPrice"></span> \
              </div> \
            </div> \
            <div> \
              <span class="blueColor bold profit" style="margin-right: 5px" >0.0</span> \
            </div> \
          </div> \
          <div id="cardDesign-bottom" class="cardBottom non"> \
            <p style="font-size: 12px" class="greyColor bold"> \
              ' +
            time +
            '</p> \
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px"> \
              <div \
                style=" \
                  display: flex; \
                  flex-direction: row; \
                  justify-content: space-between; \
                  font-size: 12px; \
                " \
                class="greyColor" \
              > \
                <span>S/L</span><span> ' +
            stopLoss +
            '</span> \
              </div> \
              <div class="greyColor cardDesign-bottomText"> \
                <span>Swap</span><span> ' +
            swap +
            '</span> \
              </div> \
              <div \
                style=" \
                  display: flex; \
                  flex-direction: row; \
                  justify-content: space-between; \
                  font-size: 12px; \
                " \
                class="greyColor" \
              > \
                <span>T/P</span><span>' +
            takeProfit +
            '</span> \
              </div> \
              <div \
                style=" \
                  display: flex; \
                  flex-direction: row; \
                  justify-content: space-between;\
                  font-size: 12px; \
                " \
                class="greyColor" \
              > \
                <span></span><span>#' +
            ticket +
            '</span> \
              </div> \
            </div> \
          </div> \
          <hr style="border: 1px solid #1e2733" />  \
        </div> \
        '
          );
        }
        let margin2set = 0;
        fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: Token,
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        })
          .then((r) => r.json())
          .then((data) => {
            // console.log(data);
            positions = data?.positions;
            margin2set = data?.totalMargin;
            const marginValue = document.getElementById("marginValue");
  
            marginValue.innerText = margin2set;
            if(positions.length > 0){
              usedMargin.style.display = "flex";
              marginLevel.style.display = "flex";
  
              const positionActionHTML = \`
                <p id="positionDropDown" class="bold">
                  <span>Positions</span> <span>P/L <span id="runningProfit" style="font-size: 25, font-weight: 800">0.0 </span></span>
                </p>
              \`
              const positionActions = document.getElementById("positionActions");
              positionActions.innerHTML = positionActionHTML;
            
            }
            for (let i = 0; i < positions.length; i++) {
              positionsContainer.innerHTML += getCardHtml(positions[i]);
            }
            const cards = document.getElementsByClassName("card");
            const cardsBottom = document.getElementsByClassName("cardBottom");
            const symbols = document.getElementsByClassName("currentSymbol");
            // alert(JSON.stringify(positions));
            // applying events
            for (let i = 0; i < cards.length; i++) {
              cards[i].addEventListener("click", () => {
                const ticket = positions[i]?.ticket;
                const currentProfits = document.getElementsByClassName("profit");
                const profit = currentProfits[i].innerHTML;
                const digitAndContractSize = getDigit(symbols[i].innerHTML);
                const digit = digitAndContractSize?.digit;
                const contractSize = digitAndContractSize?.contractSize;
                const data2send2native = JSON.stringify({
                  symbol: symbols[i].innerHTML, 
                  price: positions[i]?.price,
                  id: positions[i]?._id, 
                  volume: positions[i]?.volume, 
                  orderType: positions[i]?.type, 
                  profit: profit,
                  contractSize: contractSize,
                  digit: digit,
                  ticket: ticket
                });
                window.ReactNativeWebView.postMessage(data2send2native);
              });
              let timer;
              cards[i].addEventListener("mousedown", () => {
                console.log("down");
                timer = setTimeout(() => {
                  console.log("hold start");
                }, 500);
              });
              cards[i].addEventListener("mouseup", () => {
                 clearTimeout(timer);
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
  
          const userData = nativeData?.userData
        const balanceValue = document.getElementById("balanceValue");
        balanceValue.innerText = userData?.balance?.toFixed(2);
        // marginValue.innerText = userData?.margin?.toFixed(2);
      
      </script>
      <!-- handle socket -->
      <script>
        const socket = io('${BASEURL}', {
          transports: ["websocket"],
          withCredentials: false,
        });
        let socketResponse;
        function updateData(response) {
          const currentPrices = document.getElementsByClassName("currentPrice");
          const currentSymbols = document.getElementsByClassName("currentSymbol");
          const currentProfits = document.getElementsByClassName("profit");
          const socketSymbol = response?.symbol;
          for (let i = 0; i < currentSymbols.length; i++) {
            if (socketSymbol === currentSymbols[i].innerHTML) {
              // const digit = getDigit(socketSymbol)?.digit;
              const digitAndContractSize = getDigit(socketSymbol);
              const digit = digitAndContractSize?.digit;
              const contractSize = Number(digitAndContractSize?.contractSize);
              const volume = positions[i]?.volume;
              const price = Number(Number(positions[i]?.price)?.toFixed(digit));
              const type = positions[i]?.type;
              const ask = Number(response?.ask).toFixed(digit);
              const bid = Number(response?.bid).toFixed(digit);
              
              let profit;
              if (type === 1 || type === 2 || type === 4 || type === 6) {
                profit = (Number(bid) * volume * contractSize - price * volume * contractSize).toFixed(
                  2
                );
              } else {
                profit = (price * volume * contractSize - ask * volume * contractSize).toFixed(
                  2
                );
              }
  
              if(type === 1 || type === 2 || type === 4 || type === 6){
                currentPrices[i].innerHTML = bid;
              }else{
                currentPrices[i].innerHTML = ask;
              }
              
              currentProfits[i].innerHTML = profit;
              let currentColor = "";
              if(profit > 0){
                currentColor = "#498ee6";
              }else{
                currentColor = "#ba5a5d";
              }
              currentProfits[i].style.color = currentColor;
            }
          }
        }
  
        function calculateRunningProfit_N_Update() {
          const currentProfits = document.getElementsByClassName("profit");
          const balanceValue = document.getElementById("balanceValue");
          const equityValue = document.getElementById("equityValue");
          const freeMarginValue = document.getElementById("freeMarginValue");
           const marginValue = document.getElementById("marginValue");
          const marginLevel = document.getElementById("marginLevel");
          let runningProfit = 0;
          for (let i = 0; i < currentProfits.length; i++) {
            const profitOnCard = currentProfits[i].innerHTML;
            runningProfit += Number(profitOnCard);
          }
          let currentColor;
          if(runningProfit> 0){
             currentColor = "#498ee6";
          }else{
            currentColor = "#ba5a5d";
          }
          const runningProfitField = document.getElementById("runningProfit");
          runningProfitField.style.color = currentColor;
          const equity = (Number(balanceValue.innerText) + Number(runningProfit)).toFixed(2);
          equityValue.innerHTML = equity;
          runningProfitField.innerHTML = (runningProfit).toFixed(2);
          marginLevel.innerHTML = (Number(equity)/Number(marginValue.innerText) * 100).toFixed(2)
          freeMarginValue.innerHTML = Number(
            equity - Number(marginValue.innerText)
          )?.toFixed(2);
        }
  
        socket.on("newMessage", (response) => {
          socketResponse = response?.newMessage;
          updateData(response?.newMessage);
          calculateRunningProfit_N_Update();
        });
      </script>
        <script>
        function openBulkOperation () {
          window.ReactNativeWebView.postMessage("openBulkOperation")
        }
        </script>
    </body>
  </html>
  `;

    return TradeWebViewHtml;
  }
  const watchlistData = store.getState().watchlist;
  const isFocuesed = useIsFocused();
  const webViewRef = useRef();

  const userData = useSelector(state => state.user);
  const [openBulkOperationActionSheet, setOpenBulkOperationActionSheet] = useState(null);
  const [openPositionBulkOperationActionSheet, setOpenPositionBulkOperationActionSheet] = useState(null);
  const [actionSheet4ClosePosition, setActionSheet4ClosePosition] = useState(null);
  const navigation = useNavigation();
  const TradeWebViewHtml = getHTML(Token);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const onDismiss = () => setOpenFilterModal(false);
  const openMenu = () => setOpenFilterModal(true);
  const handleCloseActionSheet = () => setActionSheet4ClosePosition(null);
  let positionType;
  const dispatch = useDispatch();
  switch (openPositionBulkOperationActionSheet?.orderType) {
    case 0:
      positionType = 'Sell';
      break;
    case 1:
      positionType = 'Buy';
      break;
    case 2:
      positionType = 'Buy limit';
      break;
    case 3:
      positionType = 'Sell limit';
      break;
    case 4:
      positionType = 'Buy stop';
      break;
    case 5:
      positionType = 'Sell Stop';
      break;
    case 6:
      positionType = 'Buy stop limit';
      break;
    case 7:
      positionType = 'Sell stop limit';
      break;
    default:
      positionType = 'unexpected';
      break;
  }

  const fetchUserDetails = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', Token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${BASEURL}/user`, requestOptions)
      .then(response => response.json())
      .then(result => {
        dispatch(populateUser(result?.user));
        webViewRef.current.reload();
      })
      .catch(error => {
        console.log('error while fetching user data', error);
      });
  };

  useEffect(() => {
    if (isFocuesed) {
      fetchUserDetails();
    }
  }, [isFocuesed]);

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 10,
          paddingHorizontal: 5,
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
            Trade
          </Text>
        </TouchableOpacity>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            marginRight: 5,
          }}>
          <FontAwesome
            name="refresh"
            color={'#fff'}
            size={25}
            style={{marginRight: 20}}
            onPress={() => {
              fetchUserDetails();
            }}
          />
          {/* <Menu
            visible={openFilterModal}
            onDismiss={onDismiss}
            anchor={
              <TouchableOpacity
                onPress={openMenu}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 20,
                  transform: [{rotate: `90deg`}],
                }}>
                <Octicons name="arrow-switch" color={'#fff'} size={scale(25)} />
              </TouchableOpacity>
            }>
            <Menu.Item onPress={() => {}} title="Order" />
            <Divider />
            <Menu.Item onPress={() => {}} title="Time" />
            <Divider />
            <Menu.Item onPress={() => {}} title="Symbol" />
            <Divider />
            <Menu.Item onPress={() => {}} title="Profit" />
          </Menu> */}
          <AntDesign
            name="addfile"
            color={'#fff'}
            size={scale(25)}
            onPress={() => navigation.navigate('OrderCreate', {key: 'New'})}
          />
        </View>
      </View>
      <WebView
        ref={webViewRef}
        source={{html: TradeWebViewHtml}}
        renderLoading={() => <View style={{flex: 1, backgroundColor: '#0f1821'}}></View>}
        injectedJavaScriptObject={{
          watchlistData: watchlistData,
          token: Token,
          userData: userData,
        }}
        onMessage={event => {
          if (event.nativeEvent.data === 'openBulkOperation') {
            setOpenBulkOperationActionSheet(true);
            return;
          }
          const clickedSymbol = JSON.parse(event.nativeEvent.data);

          setActionSheet4ClosePosition({
            symbol: clickedSymbol?.symbol,
            price: clickedSymbol?.price,
            id: clickedSymbol?.id,
            volume: clickedSymbol?.volume,
            orderType: clickedSymbol?.orderType,
            profit: clickedSymbol?.profit,
            contractSize: clickedSymbol?.contractSize,
            digit: clickedSymbol?.digit,
            ticket: clickedSymbol?.ticket,
          });
        }}
        // ref={webViewRef}
      />
      <Actionsheet isOpen={actionSheet4ClosePosition !== null} onClose={handleCloseActionSheet}>
        <Actionsheet.Content style={{backgroundColor: '#1a1a1a'}}>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 10,
              }}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: scale(14),
                      fontWeight: '600',
                      alignSelf: 'center',
                    }}>
                    {actionSheet4ClosePosition?.symbol}
                  </Text>
                  <Text
                    style={{
                      //   color: selectData?.type === '1' ? '#48FF00' : '#C10101CF',
                      fontSize: scale(12),
                      fontWeight: '600',
                      marginLeft: scale(5),
                      textAlignVertical: 'bottom',
                    }}>
                    {/* {selectData?.type === '1' ? 'Buy' : 'Sell'}{' '}
                    {selectData?.volume} */}
                  </Text>
                </View>
                {/* <Text
                  style={{
                    color: '#FFFFFF8E',
                    fontSize: scale(12),
                    fontWeight: '600',
                    alignSelf: 'center',
                  }}>
                  {actionSheet4ClosePosition?.price} → 1.0748
                </Text> */}
              </View>
              <Text
                style={{
                  color: '#fff',
                  fontSize: scale(14),
                  fontWeight: '500',
                  alignSelf: 'center',
                }}>
                {/* {selectData?.price} */}
              </Text>
            </View>
          </Box>
          <Actionsheet.Item
            onPress={() => {
              handleCloseActionSheet();
              const positionId = actionSheet4ClosePosition?.id;
              const symbol = actionSheet4ClosePosition?.symbol;
              const price = actionSheet4ClosePosition?.price;
              const volume = actionSheet4ClosePosition?.volume;
              const orderType = actionSheet4ClosePosition?.orderType;
              const profit = actionSheet4ClosePosition?.profit;
              const ticket = actionSheet4ClosePosition?.ticket;
              const contractSize = Number(actionSheet4ClosePosition?.contractSize);
              const digit = Number(actionSheet4ClosePosition?.digit);

              navigation.navigate('ClosePosition', {
                id: positionId,
                symbol: symbol,
                price: price,
                volume: volume,
                orderType: orderType,
                ticket,
                profit,
                contractSize,
                digit,
              });
            }}
            style={{
              backgroundColor: '#1a1a1a',
            }}>
            <Text
              style={{
                color: '#ffffff',
                fontSize: scale(12),
                fontWeight: '600',
              }}>
              Close Position
            </Text>
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={() => {
              const positionId = actionSheet4ClosePosition?.id;
              const symbol = actionSheet4ClosePosition?.symbol;
              const price = actionSheet4ClosePosition?.price;
              const volume = actionSheet4ClosePosition?.volume;
              const orderType = actionSheet4ClosePosition?.orderType;
              const profit = actionSheet4ClosePosition?.profit;
              const digit = Number(actionSheet4ClosePosition?.digit);
              const ticket = actionSheet4ClosePosition?.ticket;

              navigation.navigate('ModifyPosition', {
                id: positionId,
                symbol: symbol,
                price: price,
                volume: volume,
                orderType: orderType,
                profit,
                digit,
                ticket,
              });
              //   onClose();
              //   navigation.navigate('OrderCreate', {
              // key: 'Modify',
              // symbol: {
              //       symbol: actionSheet4ClosePosition?.symbol,
              //       description: '',
              //     },
              //   });
            }}
            style={{
              backgroundColor: '#1a1a1a',
            }}>
            <Text
              style={{
                color: '#ffffff',
                fontSize: scale(12),
                fontWeight: '600',
              }}>
              Modify Position
            </Text>
          </Actionsheet.Item>
          <Actionsheet.Item
            style={{
              backgroundColor: '#1a1a1a',
            }}
            onPress={() => {
              const symbol = actionSheet4ClosePosition?.symbol;
              console.log(symbol);
              navigation.navigate('OrderCreate', {
                key: 'New',
                symbol: {
                  symbol: symbol,
                  description: '',
                },
              });
            }}>
            <Text
              style={{
                color: '#ffffff',
                fontSize: scale(12),
                fontWeight: '600',
              }}>
              New Order
            </Text>
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={() => {
              //   onClose();
              const symbol = actionSheet4ClosePosition?.symbol;
              // console.log(symbol);
              navigation.navigate('Chart', {
                symbol: {
                  name: symbol,
                  description: '',
                },
              });
              handleCloseActionSheet();
            }}
            style={{
              backgroundColor: '#1a1a1a',
            }}>
            <Text
              style={{
                color: '#ffffff',
                fontSize: scale(12),
                fontWeight: '600',
              }}>
              Chart
            </Text>
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={() => {
              setOpenPositionBulkOperationActionSheet(actionSheet4ClosePosition);
              setActionSheet4ClosePosition(null);
            }}
            style={{
              backgroundColor: '#1a1a1a',
            }}>
            <Text
              style={{
                color: '#ffffff',
                fontSize: scale(12),
                fontWeight: '600',
              }}>
              {' '}
              Bulk Operations...
            </Text>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
      <Actionsheet isOpen={openBulkOperationActionSheet !== null} onClose={() => setOpenBulkOperationActionSheet(null)}>
        <Actionsheet.Content style={{backgroundColor: '#293543'}}>
          <Text
            style={{
              color: '#fff',
              fontSize: 15,
              fontWeight: '800',
              paddingBottom: 10,
            }}>
            Bulk Operation
          </Text>
          <Actionsheet.Item
            style={{backgroundColor: '#293543'}}
            onPress={() => {
              console.log('Close all position clieck');
              var myHeaders = new Headers();
              myHeaders.append('Authorization', Token);

              var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                redirect: 'follow',
              };

              fetch(`${BASEURL}/exit-all-positions`, requestOptions)
                .then(response => response.json())
                .then(result => {
                  ToastAndroid.show('All Position Closed', 1000);
                  setOpenBulkOperationActionSheet(null);
                  // webViewRef.current.reload();
                  webViewRef.current.reload();
                })
                .catch(error => console.log('error', error));
            }}>
            <Text style={{color: '#fff', fontWeight: '600', fontSize: 14}}>Close All Position</Text>
          </Actionsheet.Item>
          <Actionsheet.Item
            style={{backgroundColor: '#293543'}}
            onPress={() => {
              var myHeaders = new Headers();
              myHeaders.append(
                'Authorization',
                Token,
                // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWM3M2M2YTk1MDg2MWM5MmRkMDJlM2YiLCJpYXQiOjE3MDc1NjQ1NTMsImV4cCI6MTcwODE2OTM1M30.SmgR2CkOy67UbzLHuW7FGcm0lktl9ifGbk8CpDFRCRQ',
              );

              // var raw = '';

              var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                redirect: 'follow',
              };

              fetch(`${BASEURL}/exit-profit-positions`, requestOptions)
                .then(response => response.json())
                .then(result => {
                  console.log(result, '<- close profitable resposne');
                  ToastAndroid.show('Profitable Position closed', 1000);
                  setOpenBulkOperationActionSheet(null);
                  webViewRef.current.reload();
                })
                .catch(error => console.log('error', error));
            }}>
            <Text style={{color: '#fff', fontWeight: '600', fontSize: 14}}>Close Profitable Position</Text>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
      <Actionsheet
        isOpen={openPositionBulkOperationActionSheet !== null}
        onClose={() => {
          setOpenPositionBulkOperationActionSheet(null);
        }}>
        <Actionsheet.Content style={{backgroundColor: '#293543'}}>
          <Text
            style={{
              color: '#fff',
              fontSize: 15,
              fontWeight: '800',
              paddingBottom: 10,
            }}>
            Bulk Operation
          </Text>
          <Text
            style={{
              color: '#fff',
              fontSize: 13,
              fontWeight: '600',
              paddingBottom: 10,
            }}>
            #{openPositionBulkOperationActionSheet?.id} {positionType} {openPositionBulkOperationActionSheet?.volume}{' '}
            {openPositionBulkOperationActionSheet?.symbol} {openPositionBulkOperationActionSheet?.price}
          </Text>
          <Actionsheet.Item
            style={{backgroundColor: '#293543'}}
            onPress={() => {
              console.log(Token);
              var myHeaders = new Headers();
              myHeaders.append('Authorization', Token);

              var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                redirect: 'follow',
              };

              fetch(`${BASEURL}/exit-all-positions`, requestOptions)
                .then(response => response.json())
                .then(result => {
                  console.log(result);
                  setOpenPositionBulkOperationActionSheet(null);
                  webViewRef.current.reload();
                })
                .catch(error => console.log('error', error));
            }}>
            <Text style={{color: '#fff', fontWeight: '600', fontSize: 14}}>Close All Position</Text>
          </Actionsheet.Item>
          <Actionsheet.Item
            style={{backgroundColor: '#293543'}}
            onPress={() => {
              var myHeaders = new Headers();
              myHeaders.append(
                'Authorization',
                Token,
                // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWM3M2M2YTk1MDg2MWM5MmRkMDJlM2YiLCJpYXQiOjE3MDc1NjQ1NTMsImV4cCI6MTcwODE2OTM1M30.SmgR2CkOy67UbzLHuW7FGcm0lktl9ifGbk8CpDFRCRQ',
              );

              var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                redirect: 'follow',
              };

              fetch(`${BASEURL}/exit-profit-positions`, requestOptions)
                .then(response => response.json())
                .then(result => {
                  if (result?.message === 'sucess') {
                    ToastAndroid.show('Profitable Position closed', 1000);
                    setOpenPositionBulkOperationActionSheet(null);
                    webViewRef.current.reload();
                  }
                })
                .catch(error => console.log('error', error));
            }}>
            <Text style={{color: '#fff', fontWeight: '600', fontSize: 14}}>Close Profitable Position</Text>
          </Actionsheet.Item>
          <Actionsheet.Item
            style={{backgroundColor: '#293543'}}
            onPress={() => {
              console.log(openPositionBulkOperationActionSheet?.orderType);
              var myHeaders = new Headers();
              myHeaders.append(
                'Authorization',
                Token,
                // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWM3M2M2YTk1MDg2MWM5MmRkMDJlM2YiLCJpYXQiOjE3MDc1NjQ1NTMsImV4cCI6MTcwODE2OTM1M30.SmgR2CkOy67UbzLHuW7FGcm0lktl9ifGbk8CpDFRCRQ',
              );
              myHeaders.append('Content-Type', 'application/json');

              var raw = JSON.stringify({
                type: openPositionBulkOperationActionSheet?.orderType,
              });
              console.log(raw);
              var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow',
              };

              fetch(`${BASEURL}/exit-positions-by-order-type`, requestOptions)
                .then(response => response.json())
                .then(result => {
                  ToastAndroid.show('Positions Closed', 1000);
                  setOpenPositionBulkOperationActionSheet(null);
                  console.log(result);
                  webViewRef.current.reload();
                })
                .catch(error => console.log('error', error));
            }}>
            <Text style={{color: '#fff', fontWeight: '600', fontSize: 14}}>Close {positionType} Position</Text>
          </Actionsheet.Item>
          <Actionsheet.Item
            style={{backgroundColor: '#293543'}}
            onPress={() => {
              // console.log(openPositionBulkOperationActionSheet?.symbol);
              var myHeaders = new Headers();
              myHeaders.append('Authorization', Token);
              myHeaders.append('Content-Type', 'application/json');

              var raw = JSON.stringify({
                symbol: openPositionBulkOperationActionSheet?.symbol,
              });

              var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow',
              };

              fetch(`${BASEURL}/exit-symbol-positions`, requestOptions)
                .then(response => response.json())
                .then(result => {
                  ToastAndroid.show(`${openPositionBulkOperationActionSheet?.symbol} positions closed `, 1000);
                  console.log(result);
                  setOpenPositionBulkOperationActionSheet(null);
                  webViewRef.current.reload();
                })
                .catch(error => console.log('error', error));
            }}>
            <Text style={{color: '#fff', fontWeight: '600', fontSize: 14}}>
              Close {openPositionBulkOperationActionSheet?.symbol} Position
            </Text>
          </Actionsheet.Item>
          {/*<Actionsheet.Item
            style={{backgroundColor: '#293543'}}
            onPress={() => {}}>
            <Text style={{color: '#fff', fontWeight: '600', fontSize: 14}}>
              Close Profitable {positionType} Positions
            </Text>
          </Actionsheet.Item>*/}
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}
