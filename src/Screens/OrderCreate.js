import {Dimensions, StyleSheet, ToastAndroid} from 'react-native';
import WebView from 'react-native-webview';
import {scale} from '../utils/overAllNormalization';
import {View, Text} from 'react-native-animatable';
import {TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react';
import {Menu} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import store from '../../ReduxToolkit/store';
import {AuthContext} from '../Navigation/AuthProvider';
import {useDispatch, useSelector} from 'react-redux';
import {updateMargin} from '../../ReduxToolkit/slices/userSlice';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Success from '../components/Success';
// import {BASEURL} from '@env';

const symbolMenuItems = ['XAUUSD', 'EURUSD', 'GBPUSD', 'USDCHF', 'USDJPY', 'USDCNH', 'USDRUB', 'AUDUSD', 'NZDUSD'];

export default function OrderCreate({navigation, route}) {
  const key = route?.params?.key;
  const BASEURL = useSelector(state => state.baseUrl);
  const {Token} = useContext(AuthContext);

  // const navigation = useNavigation();
  const webviewRef = useRef();
  const watchlistData = store.getState().watchlist;
  // orderSTate = "notplaced", "hit", "success", failed"
  const [orderState, setOrderState] = useState(null);
  const symbolInfo = useMemo(
    () =>
      watchlistData.reduce((prev, current) => {
        return prev.concat({
          symbol: current.symbol,
          description: current.description,
        });
      }, []),
    [],
  );
  const symbolFromNavigation = route?.params?.symbol;

  // code for close position start
  const positionId = route?.params?.position?.id;
  const positionSymbol = route?.params?.position?.symbol;
  const positionPrice = route?.params?.position?.price;
  // code for close position end
  console.log(symbolFromNavigation, '<< -- symbol from navigation');
  let initialOrderSymbol = symbolFromNavigation ? symbolFromNavigation : symbolInfo.length > 0 ? symbolInfo[0] : null;

  const [orderSymbol, setOrderSymbol] = useState(initialOrderSymbol);
  const [orderSymbolMenuVisible, setOrderSymbolMenuVisible] = useState(false);
  const [placedOrderPrice, setPlacedOrderPrice] = useState(0);
  const dispatch = useDispatch();

  const height = Dimensions.get('screen').height;
  const width = Dimensions.get('screen').width;

  console.log(Token, '< token');
  const getHTML = () => {
    return `
      <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width, height=device-height, target-densitydpi=device-dpi"
    />
    <title>Document</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
      crossorigin="anonymous"
    />

    <!-- Include Toastr CSS (for styling) -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.css"
      integrity="sha512-3pIirOrwegjM6erE5gPSwkUzO+3cTjpnV9lexlNZqvupR64iZBnOOTiiLPb9M36zpMScbmUNIcHUqKD47M719g=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />

    <!-- <link
      rel="stylesheet"
      href="https://trade.metatrader5.com/terminal/6ff0a086.css"
    />
    <link
      rel="stylesheet"
      href="https://trade.metatrader5.com/terminal/01251fd4.css"
    />
    <link
      rel="stylesheet"
      href="https://trade.metatrader5.com/terminal/7313b880.css"
    />
    <link
      rel="stylesheet"
      href="https://trade.metatrader5.com/terminal/6f913017.css"
    />
    <link
      rel="stylesheet"
      href="https://trade.metatrader5.com/terminal/97ec8503.css"
    />
    <link
      rel="stylesheet"
      href="https://trade.metatrader5.com/terminal/f1661fb5.css"
    />
    <link
      rel="stylesheet"
      href="https://trade.metatrader5.com/terminal/c47cc20c.css"
    /> -->
    <!-- <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.9.2/jquery.contextMenu.min.css"
      integrity="sha512-SWjZLElR5l3FxoO9Bt9Dy3plCWlBi1Mc9/OlojDPwryZxO0ydpZgvXMLhV6jdEyULGNWjKgZWiX/AMzIvZ4JuA=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    /> -->
    <style>
      * {
        box-sizing: border-box;
        margin: 0;
      }
      body,
      html {
        margin: 0;
        padding: 0;
        overflow-y: unset !important;
        background-color: #000;
        overflow: hidden;
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
  </head>
  <body style="height: 100vh">
    <div class="container-fluid bg-dark" style="height: 100vh">
      <div class="row pt-4">
        <div class="col-12 pb-3">
          <div id="order-form bg-dark">
            <form id="customized_order" class="bg-dark">
              <div class="row" id="dropDownType">
                <div class="col-12 col-md-6" id="dropDownType">
                  <div class="form-group">
                    <!-- <label for="type">Execution Type</label> -->
                    <select
                      name="type"
                      class="form-control bg-dark text-center"
                      style="
                        color: white;
                        border-top: none;
                        border-left: none;
                        border-right: none;
                        border-bottom: 2px solid #969696;
                      "
                      required=""
                    >
                      <option value="0" id="instant-sell" class="text-primary">
                        Instant
                      </option>
                      <!-- <option value="1" id="instant-buy">Instant Buy</option> -->
                      <option value="2" id="buy-limit" class="text-primary">
                        Buy Limit
                      </option>
                      <option value="3" id="sell-limit" class="text-primary">
                        Sell Limit
                      </option>
                      <option value="4" id="buy-stop" class="text-primary">
                        Buy Stop
                      </option>
                      <option value="5" id="sell-stop" class="text-primary">
                        Sell Stop
                      </option>
                      <option
                        value="6"
                        id="buy-stop-limit"
                        class="text-primary"
                      >
                        Buy Stop Limit
                      </option>
                      <option
                        value="7"
                        id="sell-stop-limit"
                        class="text-primary"
                      >
                        Sell Stop Limit
                      </option>
                    </select>
                  </div>
                </div>

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

                <div class="col-6 col-md-6 bg-dark">
                  <div class="form-group">
                    <!-- <div class="row">
                            <div class="col-5">
                              
                            </div>
                            <div class="col-12">
                              <span id="contractSpace" class="text-primary"></span>
                            </div>
                          </div> -->

                    <div class="input-group">
                      <span
                        class="minus-btn"
                        style="color: white; font-weight: 600"
                        onclick="decrement('qty')"
                        >-</span
                      >
                      <input
                        type="number"
                        class="form-control bg-dark text-primary"
                        name="qty"
                        placeholder="Volume"
                        required=""
                        value="0.01"
                        step="0.01"
                        min="0.01"
                        autocomplete="false"
                      />
                      <span
                        class="plus-btn"
                        style="color: white; font-weight: 600"
                        onclick="increment('qty')"
                        >+</span
                      >
                    </div>
                  </div>
                </div>
                <div class="col-6 col-md-6" id="price-group">
                  <div class="form-group" id="price-field">
                    <!-- <label>Price</label> -->
                    <div class="input-group">
                      <div
                        class="d-flex align-items-center justify-content-center"
                      >
                        <span
                          class="minus-btn"
                          style="color: white; font-weight: 600"
                          onclick="decrement('price')"
                          >-</span
                        >
                        <input
                          type="number"
                          class="form-control bg-dark text-primary"
                          name="price"
                          placeholder="set the price"
                          autocomplete="false"
                        />
                        <span
                          class="plus-btn"
                          style="color: white; font-weight: 600"
                          onclick="increment('price')"
                          >+</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6 col-md-6" id="limit-group">
                  <div class="form-group">
                    <!-- <label>Limit</label> -->
                    <div class="input-group">
                      <span
                        class="minus-btn"
                        style="color: white; font-weight: 600"
                        onclick="decrement('limit')"
                        >-</span
                      >
                      <input
                        type="number"
                        class="form-control bg-dark text-primary"
                        name="limit"
                        placeholder="set the limit"
                        autocomplete="false"
                      />
                      <span
                        class="plus-btn"
                        style="color: white; font-weight: 600"
                        onclick="increment('limit')"
                        >+</span
                      >
                    </div>
                  </div>
                </div>
                <div class="col-6 col-md-6">
                  <div class="form-group">
                    <!-- <label >Stop Loss</label> -->
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
                        placeholder="Set S/L"
                        autocomplete="false"
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
                    <!-- <label >Take Profit</label> -->
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
                        placeholder="Set T/F"
                        autocomplete="false"
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
                <div class="col-12">
                  <div class="form-group">
                    <select
                      name="expiration"
                      class="form-control text-center bg-dark"
                      style="
                        color: white;
                        border-top: none;
                        border-left: none;
                        border-right: none;
                        border-bottom: 2px solid #969696;
                      "
                      required=""
                    >
                      <option class="text-primary" value="gtc" id="gtc">
                        GTC
                      </option>
                      <option class="text-primary" value="today" id="today">
                        Today
                      </option>
                      <option
                        class="text-primary"
                        value="specified"
                        id="specified"
                      >
                        Specified
                      </option>
                      <option
                        class="text-primary"
                        value="specified-day"
                        id="specified"
                      >
                        Specified Day
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group">
                    <!-- <label for="">Take Profit</label> -->
                    <input
                      type="date"
                      class="form-control bg-dark text-primary"
                      name="expiration-date"
                    />
                  </div>
                </div>
                <!-- <div class="col-12">
                    <div class="form-group">
                        
                        <textarea class="form-control bg-dark text-primary" name="comment" placeholder="comment"></textarea>
                    </div>
                    
                  </div> -->

                <div class="col-12">
                  <div class="form-group">
                    <!-- <label >Take Profit</label> -->
                    <div class="input-group">
                      <span
                        class="minus-btn"
                        style="color: white; font-weight: 600"
                        onclick="decrement('deviation')"
                        >-</span
                      >
                      <input
                        type="number"
                        class="form-control bg-dark text-primary"
                        name="deviation"
                        placeholder="Deviation"
                        autocomplete="false"
                      />
                      <span
                        class="plus-btn"
                        style="color: white; font-weight: 600"
                        onclick="increment('deviation')"
                        >+</span
                      >
                    </div>
                  </div>
                </div>

                <div class="col-sm-12">
                  <div class="form-group">
                    <input
                      type="submit"
                      name="submit"
                      class="btn btn-sm btn-success"
                      id="submit-btn"
                      value="Place Order"
                    />
                  </div>
                </div>
              </div>
            </form>
            <!-- <div class="row">
              <div class="col-12">
                <div id="form-trade-btn">
                  <div class="row trade-btn1" >
                    <div class="col-6">
                      <button class="form-control d-inline-block btn btn-success btn-sm instant-trade" data-trade="buy"> <small>Buy</small> <span class="buy-btn" ></span> </button>
                    </div>
                    <div class="col-6">
                      <button class="form-control d-inline-block btn btn-danger btn-sm instant-trade" data-trade="sell"> <small>Sell</small> <span class="sell-btn" ></span> </button>
                    </div>
                  </div>
                </div>
              </div>
            </div> -->
            <div id="orderFormOverlay"></div>
          </div>
        </div>
        <div class="col-12" style="position: absolute; bottom: 0">
          <div class="mb-5">
            <div class="my-4" id="box1"></div>

            <div
              class="col-12"
              style="position: absolute; bottom: 14px"
              id="buySellBtns"
            >
              <div id="form-trade-btn">
                <div class="row trade-btn1">
                  <div class="col-6">
                    <button
                      class="form-control d-inline-block btn btn-success btn-sm instant-trade"
                      data-trade="buy"
                    >
                      <small>Buy</small>
                    </button>
                  </div>
                  <div class="col-6">
                    <button
                      class="form-control d-inline-block btn btn-danger btn-sm instant-trade"
                      data-trade="sell"
                    >
                      <small>Sell</small>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <script
      src="https://code.jquery.com/jquery-3.7.1.min.js"
      integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo="
      crossorigin="anonymous"
    ></script> -->
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.7.1/socket.io.js"
      integrity="sha512-Z6C1p1NIexPj5MsVUunW4pg7uMX6/TT3CUVldmjXx2kpip1eZcrAnxIusDxyFIikyM9A61zOVNgvLr/TGudOQg=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
      crossorigin="anonymous"
    ></script>
    <!-- <script src="https://cdn.jsdelivr.net/npm/lightweight-charts@4.1.0/dist/lightweight-charts.standalone.production.min.js"></script> -->
    <!-- Include Toastr JS -->
    <!-- <script
      src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"
      integrity="sha512-VEd+nq25CkR676O+pLBnDW09R7VQX9Mdiij052gVCp5yVH3jGtH70Ho/UUv4mJDsEdTvqRCFZg0NKGiojGnUCw=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    ></script> -->
    <!-- <script
      src="https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.9.2/jquery.contextMenu.min.js"
      integrity="sha512-kvg/Lknti7OoAw0GqMBP8B+7cGHvp4M9O9V6nAYG91FZVDMW3Xkkq5qrdMhrXiawahqU7IZ5CNsY/wWy1PpGTQ=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    ></script> -->
    <!-- Include html2canvas from CDN -->
    <!-- <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script> -->
    <!-- <script src="menu.js" ></script> -->
    <script>
      let chartData = [];
      let lineData = [];
      let defaultSymbol;
      let defaultTime = 1;
      let defaultSeries = "candlestick";
      let defaultVolume = "withOutVolume";
      let lastEquity;
      let lastFreeMargin;
      let currentCandleOpen = null;
      let balance;
      let margin = 0;
      const symbolDataMap = new Map();
      let symbolColor;
      let changeColor;
      let bidColor;
      let askColor;
      let symbolIcon;
      let prevTimestamp;
      let prevOpen;
      let prevHigh;
      let prevLow;
      let isPrevSet = false;
      let prevClose;
      let volumeData = [];
      let symbolDigits = [];
      let dataFetched = false;
      let watchlistFetched = false;
      let orderType = 1;
      let defaultTemplate = "red-green";

      // window.ReactNativeWebView = {
      //   injectedObjectJson: () => {
      //     return JSON.stringify({
      //       token:
      //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWMzN2VjYWVkYjNhYmU1MjAxOGY5NzQiLCJpYXQiOjE3MDc2MzYyNjgsImV4cCI6MTcwODI0MTA2OH0.A3dJOpWkVbYn7b9NNTKJ-RnyJWamiNpDDASqhW9EQiI",
      //       symbol: "XAUUSD",
      //       digits: 2,
      //     });
      //   },
      //   postMessage: (params) => {
      //     console.log(params);
      //   },
      // };
      const reactNativeObj = JSON.parse(
        window.ReactNativeWebView.injectedObjectJson()
      );

      // const buySellSocket = document.getElementById("buySellSocket");
      //       const dropDownType = document.getElementById("dropDownType");
      //       const buySellBtns = document.getElementById("buySellBtns");
      //       buySellSocket.style.display = "none";
      //       dropDownType.style.display = "none";
      //       buySellBtns.style.display = "none";

      let Token = reactNativeObj.token;

      const baseUrl = '${BASEURL}/';

      // Get the URLSearchParams object from the current URL
      const urlParams = new URLSearchParams(window.location.search);
      console.log(urlParams, "urlParams");
      // Get the value of the "symbol" parameter
      // const symbol = urlParams.get("symbol");
      const symbol = reactNativeObj.symbol;
      console.log(symbol, "< - symbol");
      if (symbol === null) {
        defaultSymbol = "XAUUSD";
      } else {
        defaultSymbol = symbol;
      }

      // toastr.options = {
      //   closeButton: true,
      //   progressBar: true,
      //   positionClass: "toast-top-right",
      //   timeOut: 3000,
      // };

      const setMargin = (newMargin) => {
        margin = newMargin;
      };

      // Function to set prevClose in the specified input field
      const setPrevCloseInField = (field, input) => {
        if (field.value == "") {
          isPrevSet = true;
          field.value = prevClose;
          console.log(prevClose, ", prevclose");
        }
      };

      async function checkUserToken() {
        // Check if the token is available
        if (!Token) {
          // Redirect to the login page if the token is not available
          window.location.href = "/login-page";
          return;
        }

        // Validate the token by making a request to the /user API
        try {
          const response = await fetch(baseUrl + "user", {
            method: "GET",
            headers: {
              Authorization: Token,
              "Content-Type": "application/json",
            },
          });

          const userData = await response.json();

          // Check if the response is successful
          if (!response.ok) {
            // Redirect to the login page if the token is not valid
            window.location.href = "/login-page";
            return;
          }

          // Token is valid, continue with the application logic

          balance = parseFloat(userData.user.balance).toFixed(2);
          lastEquity = balance;
          lastFreeMargin = (balance - parseFloat(margin)).toFixed(2);
          document.getElementById("equity").textContent = lastEquity;
          document.getElementById("free-margin").textContent = lastFreeMargin;
          document.getElementById("balance").textContent = balance;
          document.getElementById("current-balance").textContent = balance;
        } catch (error) {
          console.error("Error validating user token:", error);
          // Handle error (e.g., redirect to login page)
          window.location.href = "/login-page";
        }
      }

      // Function to get the number of decimal places based on the symbol
      const getDecimalPlaces = () => {
        // const symbolInfo = symbolDigits.find((info) => info.symbol === symbol);

        // return symbolInfo ? symbolInfo.digits : 2;
        return reactNativeObj?.digits || 2;
      };

      // Set step for all number input fields in a form
      function setStepForNumberFields(symbol) {
        const form = document.getElementById("customized_order");
        if (!form) {
          console.error("Form not found.");
          return;
        }

        // Select all input fields with type "number" within the form
        const numberInputFields = form.querySelectorAll('input[type="number"]');

        // Loop through each input field and set the step attribute
        numberInputFields.forEach((inputField) => {
          if (inputField.name !== "qty") {
            const decimalPlaces = getDecimalPlaces(symbol); // Default to 2 if step is not set
            // console.log(decimalPlaces);
            // console.log(Math.pow(10, -decimalPlaces));
            inputField.step = "0." + "".padEnd(decimalPlaces - 1, "0") + "1";
          }
        });
      }

      // Call the function to check the user token on page load
      //checkUserToken();
      function increment(fieldName) {
        const quantityInputs = document.querySelectorAll(
          '[name="' + fieldName + '"]'
        );

        quantityInputs.forEach((input) => {
          if (input.value) {
            input.stepUp();
            input.value = parseFloat(input.value).toFixed(
              getDecimalPlaces(defaultSymbol)
            );
            disableBtn(typeSelect.value);
            if (fieldName == "stop_loss") {
              fieldName = "stoploss";
            } else if (fieldName == "take_profit") {
              fieldName = "takeprofit";
            } else if (fieldName == "qty") {
              let contractSize = getContractSize(defaultSymbol);
              input.value = parseFloat(input.value).toFixed(2);
              let textContent = parseFloat(input.value) * contractSize;
            }
          } else {
            console.log(prevClose);
            input.value = prevClose;
          }
        });
      }

      function decrement(fieldName) {
        const quantityInputs = document.querySelectorAll(
          '[name="' + fieldName + '"]'
        );

        quantityInputs.forEach((input) => {
          if (input.value) {
            input.stepDown();
            input.value = parseFloat(input.value).toFixed(
              getDecimalPlaces(defaultSymbol)
            );
            disableBtn(typeSelect.value);
            if (fieldName == "stop_loss") {
              fieldName = "stoploss";
            } else if (fieldName == "take_profit") {
              fieldName = "takeprofit";
            } else if (fieldName == "qty") {
              let contractSize = getContractSize(defaultSymbol);
              input.value = parseFloat(input.value).toFixed(2);
              let textContent = parseFloat(input.value) * contractSize;
            }
          } else {
            input.value = prevClose;
          }
        });
      }

      const setMinMaxValue = (symbol) => {
        const qtyInputs = document.querySelectorAll('input[name="qty"]');

        // Set min, max, and step values for each input
        qtyInputs.forEach((input) => {
          // Set your desired min, max, and step values here
          const minMax = getMinMax(symbol);

          input.setAttribute("min", minMax.min);
          input.setAttribute("max", minMax.max);
          input.value = minMax.min;

          let contractSize = getContractSize(symbol);
          let textContent = parseFloat(minMax.min) * contractSize;
        });
      };
      const setLatestPrice = (ask, bid) => {
        const buyButtons = document.getElementsByClassName("buy-btn");
        const sellButtons = document.getElementsByClassName("sell-btn");

        // Update buy buttons
        for (const buyButton of buyButtons) {
          const digit = getDecimalPlaces();
          buyButton.innerHTML = Number(ask).toFixed(digit);
        }

        // Update sell buttons
        for (const sellButton of sellButtons) {
          const digit = getDecimalPlaces();
          sellButton.innerHTML = Number(bid).toFixed(digit);
        }
      };

      // Function to get the number of decimal places based on the symbol
      const getContractSize = (symbol) => {
        const symbolInfo = symbolDigits.find((info) => info.symbol === symbol);

        return symbolInfo ? symbolInfo.contractSize : 100;
      };

      // Function to get the number of decimal places based on the symbol
      const getMinMax = (symbol) => {
        const symbolInfo = symbolDigits.find((info) => info.symbol === symbol);
        if (symbolInfo) {
          return { min: symbolInfo.minVolume, max: symbolInfo.maxVolume };
        } else {
          return { min: 0.01, max: 100 };
        }

        // return symbolInfo ? symbolInfo.contractSize : 100;
      };

      // Function to update the table with symbol data
      const updateTable = () => {
        symbolDataMap.forEach((data) => {
          if (data.symbol == defaultSymbol) {
            setLatestPrice(data.ask, data.bid);
          }
        });
      };

      const getSpecification = async (symbol) => {
        try {
          const headers = {
            Authorization: Token,
          };

          const response = await fetch(
            baseUrl + "get-specification?symbol=" + symbol,
            {
              headers: headers,
            }
          );

          if (!response.ok) {
            throw new Error(
              "API request failed with status: " + response.status
            );
          }

          const data = await response.json();

          openModal(data.message);

          // return data.message;
        } catch (error) {
          console.error("Error fetching data:", error);
          return null;
        }
      };
      // Function to fetch inital data for chart
      const fetchWatchListData = async () => {
        try {
          const headers = {
            Authorization: Token,
          };

          const response = await fetch(baseUrl + "get-watchlist-data", {
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

      // Function to calculate Exponential Moving Average (EMA)
      function calculateEMA(data, period) {
        const multiplier = 2 / (period + 1);
        emaValues = [];
        const ema = [data[0].close]; // Initial value is the same as the first data point

        for (let i = 1; i < data.length; i++) {
          emaValues.push({
            time: data[i].time,
            value:
              data[i].close * multiplier + data[i - 1].close * (1 - multiplier),
          });
        }

        return emaValues;
      }

      // Calculate SMA values
      const calculateSMA = (data, period) => {
        const smaValues = [];
        for (let i = period - 1; i < data.length; i++) {
          const sum = data
            .slice(i - period + 1, i + 1)
            .reduce((total, d) => total + d.close, 0);
          const sma = sum / period;
          smaValues.push({ time: data[i].time, value: sma });
        }
        return smaValues;
      };

      let container = document.getElementById("box1");

      const toolTipWidth = 100;
      const toolTipHeight = 100;
      const toolTipMargin = 15;

      // Create and style the tooltip html element
      let toolTip = document.createElement("div");

      toolTip.style =
        "width: 100px; height: 100px; position: absolute; display: none; padding: 8px; box-sizing: border-box; font-size: 12px; text-align: left; z-index: 1000; top: 12px; left: 12px; pointer-events: none; border: 1px solid; border-radius: 2px;font-family: -apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;";
      toolTip.style.background = "white";
      toolTip.style.color = "black";
      toolTip.style.borderColor = "#2962FF";
      container.appendChild(toolTip);

      const myPriceFormatter = (p) => {
        let price = parseFloat(p);
        return price.toFixed(getDecimalPlaces(defaultSymbol));
      };

      // Function to add or update a new data point in the candlestick chart

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
        if (true) {
          let tableData = newDataPoint.newMessage;

          let symbol = tableData.symbol;

          if (symbol === defaultSymbol) {
            setLatestPrice(tableData.ask, tableData.bid);
            const digit = getDecimalPlaces();
            if (isPrevSet === false) {
              prevClose = Number(tableData?.ask).toFixed(digit);
              // console.log(tableData);
            }
          }
        }
      });

      let OrderForm = document.getElementById("customized_order");
      OrderForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission behavior
        let res = submitForm();
        if (res) {
          OrderForm.reset();
        }
      });

      let submitForm = () => {
        let type;
        let exc_type = document.getElementsByName("type")[0].value;
        if (exc_type == 0) {
          type = orderType;
        } else {
          type = exc_type;
        }

        // Get form data and serialize to JSON
        var formData = {
          symbol: defaultSymbol,
          type: type,
          exc_type: exc_type,
          qty: document.getElementsByName("qty")[0].value,
          price: document.getElementsByName("price")[0].value,
          limit: document.getElementsByName("limit")[0].value,
          stop_loss: document.getElementsByName("stop_loss")[0].value,
          take_profit: document.getElementsByName("take_profit")[0].value,
          // comment:document.getElementsByName("comment")[0].value,
          expiration: document.getElementsByName("expiration-date")[0].value,
        };

        // Convert the object to a JSON string
        var jsonData = JSON.stringify(formData);
        var xhr = new XMLHttpRequest();
        const apiUrl = baseUrl + "create-order";
       // alert(apiUrl);
        xhr.open("POST",apiUrl , true); // Replace with your server endpoint
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // Set JSON content type
        if (Token) {
          xhr.setRequestHeader("Authorization", Token);
        }
        xhr.onload = function () {
          if (xhr.status === 200) {
            const dataObj = JSON.parse(xhr.responseText);
           // alert(JSON.stringify(dataObj));
            window.ReactNativeWebView.postMessage(xhr.responseText);
            return dataObj;
          } else {
            window.ReactNativeWebView.postMessage("failed");
            console.log(xhr.status);
          }
        };
        xhr.send(jsonData);
        window.ReactNativeWebView.postMessage("hit");
        
      };

      const typeSelect = document.querySelector('[name="type"]');
      const limitField = document.getElementById("limit-group");
      const priceGroup = document.getElementById("price-group");
      const qtyField = document.querySelectorAll('input[name="qty"]');
      const expiration = document.querySelector('[name="expiration"]');
      const dateField = document.querySelector('[name="expiration-date"]');
      const priceInput = document.querySelector('[name="price"]');
      const priceField = document.querySelector("#price-field");
      const limitInput = document.querySelector('[name="limit"]');
      const submitBtn = document.querySelector('[name="submit"]');
      const stopLossInput = document.querySelector('[name="stop_loss"]');
      const takeProfitInput = document.querySelector('[name="take_profit"]');
      const formTradeBtn = document.querySelector("#form-trade-btn");

      // Initially hide the limit and price fields
      limitField.style.display = "none";
      priceGroup.style.display = "none";
      // Initially hide the date field
      dateField.style.display = "none";
      expiration.style.display = "none";
      submitBtn.style.display = "none";

      const disableBtn = (selectType = "0") => {
        const stopLoss = parseFloat(stopLossInput.value);
        const takeProfit = parseFloat(takeProfitInput.value);
        const price = parseFloat(priceInput.value) || prevClose;
        const limit = parseFloat(limitInput.value);

        if (selectType == "0") {
          const instantTradeButtons =
            document.querySelectorAll(".instant-trade");

          instantTradeButtons.forEach((button) => {
            const dataTrade = button.getAttribute("data-trade");

            if (takeProfit && stopLoss) {
              if (
                (stopLoss > price && takeProfit > price) ||
                (stopLoss < price && takeProfit < price)
              ) {
                button.disabled = true;
              } else if (stopLoss > price && takeProfit < price) {
                if (dataTrade == "buy") {
                  button.disabled = true;
                } else {
                  button.disabled = false;
                }
              } else if (stopLoss < price && takeProfit > price) {
                if (dataTrade == "sell") {
                  button.disabled = true;
                } else {
                  button.disabled = false;
                }
              }
            } else if (!takeProfit && stopLoss) {
              if (stopLoss > price) {
                if (dataTrade == "buy") {
                  button.disabled = true;
                } else {
                  button.disabled = false;
                }
              } else {
                if (dataTrade == "sell") {
                  button.disabled = true;
                } else {
                  button.disabled = false;
                }
              }
            } else if (takeProfit && !stopLoss) {
              if (takeProfit > price) {
                if (dataTrade == "sell") {
                  button.disabled = true;
                } else {
                  button.disabled = false;
                }
              } else {
                if (dataTrade == "buy") {
                  button.disabled = true;
                } else {
                  button.disabled = false;
                }
              }
            } else {
              button.disabled = false;
            }
          });
        } else if (selectType == "2") {
          let button = document.getElementById("submit-btn");
          if (price > prevClose) {
            button.disabled = true; //disable place order button
          } else {
            if (takeProfit && stopLoss) {
              if (
                (stopLoss > price && takeProfit > price) ||
                (stopLoss < price && takeProfit < price)
              ) {
                button.disabled = true; //disable place order button
              } else if (stopLoss > price && takeProfit < price) {
                button.disabled = true; //disable place order button
              } else {
                button.disabled = false; //enable button
              }
            } else if (!takeProfit && stopLoss) {
              if (stopLoss > price) {
                button.disabled = true; //disable place order button
              } else {
                button.disabled = false; //enable place order button
              }
            } else if (takeProfit && !stopLoss) {
              if (takeProfit > price) {
                button.disabled = false; //enable place order button
              } else {
                button.disabled = true; //disable place order button
              }
            } else {
              button.disabled = false; //enable place order button
            }
          }
        } else if (selectType == "3") {
          let button = document.getElementById("submit-btn");
          if (price < prevClose) {
            button.disabled = true; //disable place order button
          } else {
            if (takeProfit && stopLoss) {
              if (
                (stopLoss > price && takeProfit > price) ||
                (stopLoss < price && takeProfit < price)
              ) {
                button.disabled = true; //disable place order button
              } else if (stopLoss > price && takeProfit < price) {
                button.disabled = false; //enable place order button
              } else {
                button.disabled = true; //disable button
              }
            } else if (!takeProfit && stopLoss) {
              if (stopLoss > price) {
                button.disabled = false; //enable place order button
              } else {
                button.disabled = true; //disable place order button
              }
            } else if (takeProfit && !stopLoss) {
              if (takeProfit > price) {
                button.disabled = true; //disable place order button
              } else {
                button.disabled = false; //enable place order button
              }
            } else {
              button.disabled = false; //enable place order button
            }
          }
        } else if (selectType == "4") {
          let button = document.getElementById("submit-btn");
          if (price < prevClose) {
            button.disabled = true; //disable place order button
          } else {
            if (takeProfit && stopLoss) {
              if (
                (stopLoss > price && takeProfit > price) ||
                (stopLoss < price && takeProfit < price)
              ) {
                button.disabled = true; //disable place order button
              } else if (stopLoss > price && takeProfit < price) {
                button.disabled = true; //disable place order button
              } else {
                button.disabled = false; //enable button
              }
            } else if (!takeProfit && stopLoss) {
              if (stopLoss > price) {
                button.disabled = true; //disable place order button
              } else {
                button.disabled = false; //enable place order button
              }
            } else if (takeProfit && !stopLoss) {
              if (takeProfit > price) {
                button.disabled = false; //enable place order button
              } else {
                button.disabled = false; //enable place order button
              }
            } else {
              button.disabled = false; //enable place order button
            }
          }
        } else if (selectType == "5") {
          let button = document.getElementById("submit-btn");

          if (price > prevClose) {
            button.disabled = true; //disable place order button
          } else {
            if (takeProfit && stopLoss) {
              if (
                (stopLoss > price && takeProfit > price) ||
                (stopLoss < price && takeProfit < price)
              ) {
                button.disabled = true; //disable place order button
              } else if (stopLoss > price && takeProfit < price) {
                button.disabled = false; //enable place order button
              } else {
                button.disabled = true; //disable button
              }
            } else if (!takeProfit && stopLoss) {
              if (stopLoss > price) {
                button.disabled = false; //enable place order button
              } else {
                button.disabled = true; //disable place order button
              }
            } else if (takeProfit && !stopLoss) {
              if (takeProfit > price) {
                button.disabled = true; //disable place order button
              } else {
                button.disabled = false; //enable place order button
              }
            } else {
              button.disabled = false; //enable place order button
            }
          }
        } else if (selectType == "6") {
          let button = document.getElementById("submit-btn");
          if (price < prevClose) {
            button.disabled = true; //disable place order button
          } else {
            if (limit && limit < price) {
              if (takeProfit && stopLoss) {
                if (
                  (stopLoss > limit && takeProfit > limit) ||
                  (stopLoss < limit && takeProfit < limit)
                ) {
                  button.disabled = true; //disable place order button
                } else if (stopLoss > limit && takeProfit < limit) {
                  button.disabled = true; //disable place order button
                } else {
                  button.disabled = false; //enable button
                }
              } else if (!takeProfit && stopLoss) {
                if (stopLoss > limit) {
                  button.disabled = true; //disable place order button
                } else {
                  button.disabled = false; //enable place order button
                }
              } else if (takeProfit && !stopLoss) {
                if (takeProfit > limit) {
                  button.disabled = false; //enable place order button
                } else {
                  button.disabled = false; //enable place order button
                }
              } else {
                if (limit && limit < price) {
                  button.disabled = false; //enable place order button
                } else {
                  button.disabled = true; //enable place order button
                }
              }
            } else {
              button.disabled = true;
            }
          }
        } else {
          let button = document.getElementById("submit-btn");

          if (price > prevClose) {
            button.disabled = true; //disable place order button
          } else {
            if (limit && limit > price) {
              if (takeProfit && stopLoss) {
                if (
                  (stopLoss > limit && takeProfit > limit) ||
                  (stopLoss < limit && takeProfit < limit)
                ) {
                  button.disabled = true; //disable place order button
                } else if (stopLoss > limit && takeProfit < limit) {
                  button.disabled = false; //disable place order button
                } else {
                  button.disabled = true; //enable button
                }
              } else if (!takeProfit && stopLoss) {
                if (stopLoss > limit) {
                  button.disabled = false; //disable place order button
                } else {
                  button.disabled = true; //enable place order button
                }
              } else if (takeProfit && !stopLoss) {
                if (takeProfit > limit) {
                  button.disabled = true; //enable place order button
                } else {
                  button.disabled = false; //enable place order button
                }
              } else {
                button.disabled = false; //enable place order button
              }
            } else {
              button.disabled = true;
            }
          }
        }
      };

      // Add event listener to the type select
      typeSelect.addEventListener("change", () => {
        const selectedType = typeSelect.value;
        disableBtn(typeSelect.value);
        // Toggle visibility based on the selected option
        if (selectedType === "0" || selectedType === "1") {
          limitField.style.display = "none";
          priceGroup.style.display = "none";
          expiration.style.display = "none";
          dateField.style.display = "none";
          formTradeBtn.style.display = "block";
          submitBtn.style.display = "none";
        } else if (selectedType === "6" || selectedType === "7") {
          limitField.style.display = "block";
          priceGroup.style.display = "block";
          formTradeBtn.style.display = "none";
          submitBtn.style.display = "block";

          expiration.style.display = "block";
        } else {
          limitField.style.display = "none";
          priceGroup.style.display = "block";
          expiration.style.display = "block";
          formTradeBtn.style.display = "none";
          submitBtn.style.display = "block";
        }

        // if(selectedType !== '0' && selectedType !== '1'){
        //     expiration.style.display = 'block';

        // } else{
        //     expiration.style.display = 'none';
        //     dateField.style.display = 'none';

        // }
      });
      qtyField.forEach((input) => {
        input.addEventListener("change", () => {
          let contractSize = getContractSize(defaultSymbol);
          let textContent = parseFloat(input.value) * contractSize;
          let minMax = getMinMax(defaultSymbol);

          input.value = parseFloat(input.value).toFixed(2);
        });
      });

      // Add event listeners for individual input fields
      priceInput.addEventListener("click", () =>
        setPrevCloseInField(priceInput, "price")
      );
      limitInput.addEventListener("click", () =>
        setPrevCloseInField(limitInput, "limit")
      );
      stopLossInput.addEventListener("click", () =>
        setPrevCloseInField(stopLossInput, "stoploss")
      );
      takeProfitInput.addEventListener("click", () =>
        setPrevCloseInField(takeProfitInput, "takeprofit")
      );

      // Add event listeners for individual input fields
      priceInput.addEventListener("change", () => {
        disableBtn(typeSelect.value);
        priceInput.value = parseFloat(priceInput.value).toFixed(
          getDecimalPlaces(defaultSymbol)
        );
      });
      limitInput.addEventListener("change", () => {
        disableBtn(typeSelect.value);
        limitInput.value = parseFloat(limitInput.value).toFixed(
          getDecimalPlaces(defaultSymbol)
        );
      });
      stopLossInput.addEventListener("change", () => {
        disableBtn(typeSelect.value);
        stopLossInput.value = parseFloat(stopLossInput.value).toFixed(
          getDecimalPlaces(defaultSymbol)
        );
      });
      takeProfitInput.addEventListener("change", () => {
        disableBtn(typeSelect.value);
        takeProfitInput.value = parseFloat(takeProfitInput.value).toFixed(
          getDecimalPlaces(defaultSymbol)
        );
      });

      // Add event listener to the type select
      expiration.addEventListener("change", () => {
        const selectedType = expiration.value;
        // Toggle visibility based on the selected option
        if (selectedType === "specified" || selectedType === "specified-day") {
          dateField.type =
            selectedType === "specified" ? "datetime-local" : "date";
          dateField.style.display = "block";
        } else {
          dateField.style.display = "none";
        }
      });

      const instantTradeButtons = document.querySelectorAll(".instant-trade");
      // Add click event listener to each series element
      instantTradeButtons.forEach((seriesElement) => {
        seriesElement.addEventListener("click", (e) => {
          e.preventDefault();

          let series = seriesElement.getAttribute("data-trade");
          if (series == "buy") {
            orderType = 1;
          } else {
            orderType = 0;
          }

          submitForm();
        });
      });

      //close order form through button
      function closeOrderFormBox(orderFormBox) {
        orderFormBox.reset();
        orderFormBox.style.display = "none";
      }
    </script>
  </body>
</html>

    `;
  };

  useEffect(() => {
    webviewRef.current.reload();
  }, [orderSymbol]);

  return (
    <>
      <View style={{flex: 1}}>
        <View style={styles.topBar}>
          <View style={styles.topBarLeft}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <AntDesign name="arrowleft" color={'#ffffff'} size={scale(25)} />
            </TouchableOpacity>
            <View style={{paddingHorizontal: scale(10)}}>
              <Text style={styles.title1}>{positionId ? `Close position #${positionId}` : orderSymbol?.symbol}</Text>
              <Text style={styles.title2}>
                {positionSymbol ? `${positionSymbol} at ${positionPrice}` : orderSymbol?.description}
              </Text>
            </View>
          </View>
          {!positionId && (
            <Menu
              visible={orderSymbolMenuVisible}
              onDismiss={() => setOrderSymbolMenuVisible(false)}
              anchor={
                <TouchableOpacity onPress={() => setOrderSymbolMenuVisible(true)}>
                  <MaterialIcons name="currency-exchange" size={scale(25)} color="white" />
                </TouchableOpacity>
              }>
              {symbolInfo.map((symbolDetails, index) => {
                // console.log(symbolDetails.symbol);
                return (
                  <Menu.Item
                    title={symbolDetails?.symbol}
                    key={index}
                    onPress={() => {
                      setOrderSymbol(symbolDetails);
                      setOrderSymbolMenuVisible(false);
                    }}
                  />
                );
              })}
            </Menu>
          )}
        </View>
        <WebView
          ref={webviewRef}
          source={{
            html: getHTML(),
          }}
          onMessage={event => {
            // console.log(event.nativeEvent.data, ' < native event');
            if (event.nativeEvent.data === 'hit') {
              return setOrderState('hit');
            } else if (event.nativeEvent.data === 'failed') {
              setOrderState('failed');
              return setTimeout(() => {
                setOrderState(null);
              }, 1000);
            } else {
              const updatedPosition = JSON.parse(event.nativeEvent.data);
              if (!updatedPosition?.valid) {
                setOrderState('failed');
                return setTimeout(() => {
                  setOrderState(null);
                }, 1000);
              }
              console.log(updatedPosition?.position, ' updatedPosition');
              dispatch(updateMargin(Number(updatedPosition?.totalMargin)));
              setOrderState({
                type: 'sucess',
                data: {
                  price: updatedPosition?.position?.price,
                },
              });
              setTimeout(() => {
                navigation.goBack();
              }, 1000);
            }
          }}
          injectedJavaScriptObject={{
            token: Token,
            symbol: orderSymbol?.symbol,
            positionId: positionId,
            positionPrice: positionPrice,
            positionSymbol: positionSymbol,
            digits: 5,
          }}
        />
      </View>
      <Success orderState={orderState} price={orderState?.price} symbol={orderSymbol?.symbol} key={1} />
    </>
  );
}

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: '#181b18',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  topBarLeft: {flexDirection: 'row', alignItems: 'center'},
  title1: {
    fontSize: scale(14),
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
  },
  title2: {
    fontSize: scale(11),
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
  },
});
