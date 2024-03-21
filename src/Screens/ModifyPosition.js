import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useContext} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {scale} from '../utils/overAllNormalization';
import WebView from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../Navigation/AuthProvider';
import {useSelector} from 'react-redux';
// import {BASEURL} from '@env';

export default function ModifyPosition({route}) {
  const navigation = useNavigation();
  const positionDetail = route?.params;
  const BASEURL = useSelector(state => state.baseUrl);
  const getWebViewHTML = () => {
    return `
    <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
        crossorigin="anonymous"
      />
      <meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width, height=device-height, target-densitydpi=device-dpi">
      <style>
        * {
          box-sizing: border-box;
          margin: 0;
          -webkit-user-select: none; /* Safari */
          -ms-user-select: none; /* IE 10 and IE 11 */
          user-select: none; /* Standard syntax */
        }
        body,
        html {
          margin: 0;
          padding: 0;
          overflow-y: unset !important;
          background-color: #000;
        }
  
        #container {
          display: flex;
          flex-direction: column;
          height: 100%;
          margin-left: 45px;
        }
  
        #top-container {
          display: flex;
          flex: 1;
          overflow: hidden;
        }
  
        #box2 {
          width: -webkit-fill-available;
          border: 1px solid #ccc;
          overflow: hidden;
        }
        .text-primary {
          color: #969696 !important;
        }
        .bg-dark {
          background-color: #1a1a1a !important;
        }
  
        #vertical-divider {
          width: 5px;
          cursor: ew-resize;
          background-color: #ddd;
          height: 100%; /* Added to fill the entire height */
        }
  
        #box3 {
          flex-shrink: 0;
          height: 200px; /* Initial height of box3 */
          border: 1px solid #ccc;
          overflow: hidden;
        }
  
        #horizontal-divider {
          height: 5px;
          cursor: ns-resize;
          background-color: #ddd;
        }
  
        /* For WebKit based browsers (Chrome, Safari, etc.) */
        ::-webkit-scrollbar {
          width: 5px;
        }
  
        ::-webkit-scrollbar-thumb {
          background: #ffffff;
          border-radius: 10px;
        }
  
        ::-webkit-scrollbar-track {
          background-color: #adadad;
        }
  
        /* For Firefox */
        /* Note: Mozilla uses a different syntax for scrollbar styling */
        /* This example uses the older -moz- prefix for Firefox */
        /* For newer versions of Firefox, consider using the scrollbar-width property */
        /* * {
          scrollbar-width: thin;
          scrollbar-color: #ffffff #b8b6b7;
        } */
  
        tbody {
          padding-bottom: 60px;
        }
  
        tfoot {
          /* position: absolute;
          bottom: 0;
          width: 100%; */
          /* background: #fff; */
          /* box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3); */
          background: #f0f5f9;
        }
        tfoot tr td {
          text-align: left !important;
          font-size: 10px;
        }
  
        tfoot tr td span {
          margin: 0 10px;
        }
  
        .add-symbol {
          font-size: 12px;
          color: rgb(89, 89, 231);
          font-weight: bold;
          width: 100%;
          text-align: right;
        }
  
        #contractSpace {
          font-size: 10px;
          color: rgb(89, 89, 231);
          font-weight: bold;
          width: 100%;
          text-align: right;
        }
  
        .context-menu-list {
          position: absolute;
          display: inline-block;
          min-width: 13em;
          max-width: 26em;
          padding: 0.25em 0;
          margin: 0.3em;
          font-family: inherit;
          font-size: 12px;
          list-style-type: none;
          background: #fff;
          border: 1px solid #bebebe;
          /* border-radius: 0.2em; */
          -webkit-box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
        }
      </style>
  
      <style>
        * {
          font-family: "Poppins";
          /* overflow: hidden !important; */
        }
        .top-bar {
          border-bottom: 1px solid #eee !important;
          /* padding:10px; */
        }
        .menu {
          /* margin: 10px; */
          color: gray !important;
          border-right: 1px solid #eee !important;
        }
  
        .group.svelte-oa8u7q + .group.svelte-oa8u7q:before {
          background-color: rgba(128, 128, 128, 0.4);
          content: "";
          height: 15px;
          margin: 0 5px;
          width: 1px;
          padding: 0;
        }
        .icon-button {
          margin: 0 5px;
        }
        .icon-button:hover {
          background: #f2f2f2;
        }
        .icon {
          color: gray !important;
          padding: 5px;
        }
        .icon.svelte-14kqgfa:hover {
          color: rgb(89, 89, 231) !important;
        }
        .active > .icon {
          color: rgb(89, 89, 231) !important;
        }
  
        /* .group:hover{
          
        
        } */
        .left-panel.svelte-1h0rw33.svelte-1h0rw33 {
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          display: flex;
        }
  
        .green {
          background: "green";
        }
  
        .red {
          background: "red";
        }
        .trade-btn {
          display: flex;
          position: fixed;
          top: 35px;
          left: 45px;
          z-index: 99;
        }
        .trade-btn button,
        .trade-btn input {
          /* width:50px; */
          border-radius: 0px;
          font-size: 12px;
          text-align: center;
        }
  
        .trade-btn1 {
          display: flex;
        }
        .trade-btn1 button {
          /* width:50px; */
          border-radius: 0px;
          font-size: 12px;
          text-align: center;
        }
        .minus-btn,
        .plus-btn {
          /* background-color: #007bff; */
          color: black;
          font-size: 16px;
          border: none;
          padding: 5px 10px;
          cursor: pointer;
        }
        input {
          border-top: none !important;
          border-bottom: 1px solid #969696 !important;
          border-right: none !important;
          border-left: none !important;
          color: #969696 !important;
        }
        input:focus {
          border-bottom: 1px solid #74cc64 !important;
        }
        input::placeholder {
          color: #969696 !important;
        }
        textarea::placeholder {
          color: #969696 !important;
        }
        .form-control:focus {
          outline: 0;
          box-shadow: none !important;
          color: #969696 !important;
        }
      </style>
      <style>
        table {
          font-size: 10px;
        }
        .bottom-section table {
          table-layout: fixed;
        }
        thead {
          position: sticky;
          top: 0;
          box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
        }
        tr {
          cursor: pointer;
        }
  
        .bottom-section {
          height: 100%;
          overflow: hidden;
          overflow-y: auto;
        }
  
        .top-section {
          /* height: 70vh !important; */
          height: 100%;
          overflow: hidden;
          overflow-y: auto;
        }
        .bottom-section {
          /* position: absolute; */
          z-index: 9999;
          background: #fff;
  
          box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
          /* height: 30vh; */
          bottom: 0;
          width: 100%;
        }
  
        .context-menu {
          display: none;
          position: absolute;
          background-color: #fff;
          border: 1px solid #ccc;
          padding: 8px;
          list-style-type: none;
          z-index: 99999;
        }
  
        .context-menu ul {
          margin: 0;
          padding: 0;
        }
  
        .context-menu li {
          cursor: pointer;
          margin: 5px 0;
          list-style-type: none;
        }
  
        th {
          text-transform: uppercase;
        }
  
        .bottom-section table {
          width: 100%;
          border-collapse: collapse;
        }
        .bottom-section table td {
          /* border: 1px solid #ddd; */
          padding: 8px;
          text-align: center;
        }
        .bottom-section table th {
          background-color: #ffffff;
          color: #000;
          padding: 8px;
          text-align: center;
        }
  
        .split {
          display: flex;
          flex-direction: row;
        }
  
        .gutter {
          background-color: #eee;
          background-repeat: no-repeat;
          background-position: 50%;
        }
  
        .gutter.gutter-horizontal {
          background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==");
          cursor: col-resize;
        }
  
        .card {
          border-radius: 0;
        }
  
        .custom-dropdown {
          cursor: pointer;
        }
  
        .dropdown-content {
          display: none;
          position: absolute;
          background-color: #f9f9f9;
          min-width: 160px;
          box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
          z-index: 1;
        }
  
        .dropdown-content a {
          color: black;
          padding: 12px 16px;
          text-decoration: none;
          display: block;
        }
  
        .show {
          display: block;
        }
  
        .menu-item {
          cursor: pointer;
          padding: 8px;
          border-bottom: 1px solid #ccc;
        }
        .drop-menu {
          position: relative;
          z-index: 10;
        }
        .sub-menu {
          position: absolute;
          z-index: 1000; /* Set a high z-index value */
          background-color: white;
          width: max-content;
          box-shadow: 0px 3px 8px 2px rgba(0, 0, 0, 0.1);
          /* margin-top: 40px;
          margin-top: 35px; */
          border: 1px solid rgb(216 204 204 / 40%);
          display: none;
        }
  
        #order-form {
          background-color: white;
          width: max-content;
          /* box-shadow: 0px 3px 8px 2px rgba(0, 0, 0, 0.1); */
  
          border: 1px solid rgb(216 204 204 / 40%);
          width: 100%;
          padding: 30px 15px;
        }
        /* #order-form {
          display: block;
        
          background-color: white;
          width: max-content;
          box-shadow: 0px 3px 8px 2px rgba(0, 0, 0, 0.1);
        
          border: 1px solid rgb(216 204 204 / 40%);
          width: 30%;
          padding: 30px 15px;
      
        } */
        .form-group {
          margin-bottom: 10px;
        }
  
        .form-group input,
        .form-group select,
        .form-group textarea {
          border-radius: 0px;
          /* background-color: transparent; */
        }
  
        .sub-menu-item {
          color: gray;
          font-size: 12px;
          padding: 5px 15px;
          cursor: pointer;
        }
  
        .sub-menu-item:hover {
          background-color: rgba(89, 89, 231, 0.1) !important;
          color: rgba(89, 89, 231, 1) !important;
        }
        .selected {
          background-color: rgba(89, 89, 231, 0.1) !important;
          color: rgba(89, 89, 231, 1) !important;
        }
        .submenu.svelte-1myguw4 {
          padding-right: 0px;
        }
  
        .width {
          padding-right: 0px;
        }
  
        .left-panel {
          width: 45px;
          position: absolute;
          left: 0;
          top: 35;
  
          z-index: 999;
          background: #fff;
          border-right: 1px solid rgb(209 191 191 / 50%);
        }
  
        .input-group {
          display: flex;
        }
  
        .input-group input {
          text-align: center;
        }
  
        /* Sandeep css */
        form#customized_order label {
          font-size: 10px;
        }
  
        .form-group input,
        select {
          font-size: 0.7rem !important;
        }
  
        .activeCheckLabel {
          background: blue;
        }
  
        #create-orderModal {
          display: none;
          position: absolute;
          top: 0px;
          width: 200px;
          left: 0px;
          z-index: 999;
        }
  
        #orderFormOverlay {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgb(255, 255, 255);
          display: none;
          font-size: 20px;
          align-items: center;
          justify-content: center;
        }
  
        #orderFormOverlay a {
          margin-left: 15px;
        }
        /* css by dipak */
        @media (max-width: 992px) {
          #order-form {
            width: 50%;
          }
          #box1 {
            width: 100%;
          }
          #box2 {
            width: 30%;
          }
        }
        @media (max-width: 768px) {
          #order-form {
            width: 70%;
          }
          #box1 {
            width: 100%;
          }
          #box2 {
            width: 100%;
          }
        }
  
        @media (max-width: 576px) {
          #order-form {
            width: 100%;
          }
          #box1 {
            width: 100%;
          }
          #box2 {
            width: 100%;
          }
        }
        @media (min-width: 992px) {
          #order-form {
            width: 100%;
          }
          #box1 {
            width: 100%;
          }
        }
      </style>
      <style>
        .closePositionBtn {
          background-color: #1a1a1a;
          z-index: 999;
        }
        .closePositionBtn:hover {
          background-color: #000;
        }
      </style>
    </head>
    <body>
      <div class="container-fluid bg-dark" style="height: 100vh">
        <div class="row pt-4">
          <div class="col-12 pb-3">
            <div id="order-form bg-dark">
              <form id="customized_order" class="bg-dark">
                <div class="row">
                  <div class="col-12 col-md-6" id="dropDownType"></div>
  
                  <div class="col-12" id="buySellSocket">
                    <div class="d-flex justify-content-around align-items-center">
                      <div>
                        <span class="buy-btn text-primary" id="buy-socket"></span>
                      </div>
                      <div>
                        <span
                          class="sell-btn text-primary"
                          id="sell-socket"
                        ></span>
                      </div>
                    </div>
                  </div>
                  <div class="col-6 col-md-6">
                    <div class="form-group">
                      <div class="input-group">
                        <span
                          class="minus-btn"
                          style="color: white; font-weight: 600"
                          onclick="decrement('stop_loss')"
                          >-</span
                        >
                        <input
                          type="number"
                          class="form-control bg-dark text-primary"
                          name="stop_loss"
                          id="stop_loss"
                          placeholder="Set S/L"
                          autocomplete="false"
                          min="0"
                          onclick="clicked('stop_loss')"
                        />
                        <span
                          class="plus-btn"
                          style="color: white; font-weight: 600"
                          onclick="increment('stop_loss')"
                          >+</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-6 col-md-6">
                    <div class="form-group">
                      <div class="input-group">
                        <span
                          class="minus-btn"
                          style="color: white; font-weight: 600"
                          onclick="decrement('take_profit')"
                          >-</span
                        >
                        <input
                          type="number"
                          class="form-control bg-dark text-primary"
                          name="take_profit"
                          id="take_profit"
                          min="0"
                          placeholder="Set T/F"
                          autocomplete="false"
                          onclick="clicked('take_profit')"
                        />
                        <span
                          class="plus-btn"
                          style="color: white; font-weight: 600"
                          onclick="increment('take_profit')"
                          >+</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <div id="orderFormOverlay"></div>
            </div>
          </div>
          <div class="col-12">
            <div class="mb-5">
              <div class="my-4" id="box1"></div>
  
              <div class="col-12">
                <div class="row">
                  <button
                    class="closePositionBtn"
                    style="
                      color: white;
                      padding-block: 10px;
                      text-align: center;
                      width: 100%;
                      position: absolute;
                      bottom: 0;
                    "
                    onClick="modifyPosition()"
                  >
                    Modify
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.7.1/socket.io.js"
        integrity="sha512-Z6C1p1NIexPj5MsVUunW4pg7uMX6/TT3CUVldmjXx2kpip1eZcrAnxIusDxyFIikyM9A61zOVNgvLr/TGudOQg=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      ></script>
  
      <script>
        // window.ReactNativeWebView = {
        //   injectedObjectJson: function () {
        //     return JSON.stringify({
        //       symbol: "XAUUSD",
        //       digit: 2,
        //       positionId: "65e23619fe882f505c739966",
        //       orderType: 1,
        //       token:
        //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWRjMThiODRjMDQ0MTljYTFiNWJkZDQiLCJpYXQiOjE3MDkwNDEwMjAsImV4cCI6MTcwOTY0NTgyMH0.VGpn3Jmm2yCfJmkw8PHPEAqka9f5Ewr_0fBhof6db2A",
        //     });
        //   },
        //   postMessage: function (body) {
        //     console.log(JSON.stringify(body));
        //   },
        // };
        const bidPlace = document.getElementById("buy-socket");
        const askPlace = document.getElementById("sell-socket");
        const obj = JSON.parse(window.ReactNativeWebView.injectedObjectJson());
        //   console.log(obj);
        const symbol = obj.symbol;
  
        const token = obj.token;
        const positionId = obj.positionId;
        const digit = obj.digit;
        let latestAskUntilFieldActive = null;
        let isAlreadyClicked = true;
        const socket = io('${BASEURL}', {
          transports: ["websocket"],
          withCredentials: false,
        });
        socket.on("newMessage", (data) => {
          if (symbol === data?.newMessage?.symbol) {
            updateData(data?.newMessage);
          }
        });
        function updateData(data) {
          bidPlace.innerHTML = (data?.bid).toFixed(digit);
          askPlace.innerHTML = (data?.ask).toFixed(digit);
          if (isAlreadyClicked) {
            latestAskUntilFieldActive = data?.ask;
          }
        }
        function increment(field) {
          const targetedInput = document.getElementById(field);
          if(!targetedInput.value){
           targetedInput.value = Number(latestAskUntilFieldActive).toFixed(
              digit
            );
            isAlreadyClicked = false;
            return;
          }
          targetedInput.value = (Number(targetedInput.value) + 0.01).toFixed(
            digit
          );
        }
        function decrement(field) {
          const targetedInput = document.getElementById(field);
         
          if (targetedInput.value != 0) {
            targetedInput.value = (Number(targetedInput.value) - 0.01).toFixed(
              digit
            );
          }else{
            targetedInput.value = Number(latestAskUntilFieldActive).toFixed(
              digit
            );
            isAlreadyClicked = false;
          }
        }
        function clicked(field) {
          const targetedInput = document.getElementById(field);
          if (targetedInput.value === "") {
            targetedInput.value = Number(latestAskUntilFieldActive).toFixed(
              digit
            );
            isAlreadyClicked = false;
          }
        }
  
        function modifyPosition() {
          const stopLoss = Number(document.getElementById("stop_loss").value);
          const takeProfit = Number(document.getElementById("take_profit").value);
          if (stopLoss === 0 || takeProfit === 0) {
            window.ReactNativeWebView.postMessage("error");
            return;
          }
          const myHeaders = new Headers();
          myHeaders.append("Authorization", obj?.token);
          myHeaders.append("Content-Type", "application/json");
  
          const raw = JSON.stringify({
            positionId: obj?.positionId,
            stopLoss: stopLoss,
            takeProfit: takeProfit,
          });
  
          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };
  
          fetch('${BASEURL}/update-position', requestOptions)
            .then((response) => response.json())
            .then((result) => {
              // alert(JSON.stringify(result));
              window.ReactNativeWebView.postMessage(JSON.stringify(result))
            }).catch((error) => window.ReactNativeWebView.postMessage(error));
        }
      </script>
    </body>
  </html>
  `;
  };
  const {Token} = useContext(AuthContext);
  const id = positionDetail?.id;
  const price = positionDetail?.price;
  const symbol = positionDetail?.symbol;
  const profit = positionDetail?.profit;
  const volume = positionDetail?.volume;
  const orderType = positionDetail?.orderType;
  const digit = positionDetail?.digit;
  const ticket = positionDetail?.ticket;
  let orderTypeText = '';
  switch (orderType) {
    case 0:
      orderTypeText = 'Sell';
      break;
    case 1:
      orderTypeText = 'Buy';
      break;
    case 2:
      orderTypeText = 'Buy limit';
      break;
    case 3:
      orderTypeText = 'Sell limit';
      break;
    case 4:
      orderTypeText = 'Buy stop';
      break;
    case 5:
      orderTypeText = 'Sell Stop';
      break;
    case 6:
      orderTypeText = 'Buy stop limit';
      break;
    case 7:
      orderTypeText = 'Sell stop limit';
      break;
    default:
      orderTypeText = 'unexpected';
      break;
  }
  return (
    <View style={{flex: 1, backgroundColor: '#0f1821'}}>
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}>
        <TouchableOpacity onPress={navigation.goBack}>
          <AntDesign name="arrowleft" color={'#ffffff'} size={scale(25)} />
        </TouchableOpacity>
        <View>
          <Text style={{fontSize: 15, color: '#fff', fontWeight: '700'}}>
            Modify position #{ticket}
          </Text>
          <Text style={{fontSize: 12, opacity: 0.4, fontWeight: '600'}}>
            {orderTypeText} {volume} {symbol} at {price.toFixed(digit)}
          </Text>
        </View>
      </View>
      <WebView
        source={{html: getWebViewHTML()}}
        injectedJavaScriptObject={{
          token: Token,
          positionId: id,
          symbol: symbol,
          digit: digit,
          orderType: '1',
        }}
        onMessage={event => {
          const response = event.nativeEvent.data;
          if (response === 'error') {
            return;
          }
          if (JSON.parse(response).status === true) {
            navigation.goBack();
          }
        }}
      />
    </View>
  );
}
