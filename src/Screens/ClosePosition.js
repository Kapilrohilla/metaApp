import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useContext, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {scale} from '../utils/overAllNormalization';
import WebView from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../Navigation/AuthProvider';
// import {BASEURL} from '@env';
import Success from '../components/Success';
import {useSelector} from 'react-redux';

const getWebViewHTML = () => {
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
                <div class="col-12 col-md-6" id="instantSelect">
                  <div class="form-group">
                    <!-- <label for="type">Execution Type</label> -->
                    <select
                      name="type"
                      class="form-control bg-dark text-center"
                      id="dropDownType"
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

                <div class="col-12">
                  <div class="d-flex justify-content-around align-items-center">
                    <div>
                      <span class="buy-btn text-primary" id="buy-socket"
                        >0</span
                      >
                    </div>
                    <div>
                      <span class="sell-btn text-primary" id="sell-socket"
                        >0</span
                      >
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
                        >-</span
                      >
                      <!-- onclick="decrement('qty')" -->
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
                        disabled
                      />
                      <span
                        class="plus-btn"
                        style="color: white; font-weight: 600"
                        >+</span
                      >
                      <!-- onclick="increment('qty')" -->
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
                          >-</span
                        >
                        <!-- onclick="decrement('price')" -->
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
                          >+</span
                        >
                        <!-- onclick="increment('price')" -->
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
                        >-</span
                      >
                      <!-- onclick="decrement('limit')" -->
                      <input
                        type="number"
                        class="form-control bg-dark text-primary"
                        name="limit"
                        placeholder="set the limit"
                        autocomplete="false"
                        disabled
                      />
                      <span
                        class="plus-btn"
                        style="color: white; font-weight: 600"
                        >+</span
                      >
                      <!-- onclick="increment('limit')" -->
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
                        >-</span
                      >
                      <!-- onclick="decrement('stop_loss')" -->
                      <input
                        type="number"
                        class="form-control bg-dark text-primary"
                        name="stop_loss"
                        placeholder="Set S/L"
                        autocomplete="false"
                        disabled
                      />
                      <span
                        class="plus-btn"
                        style="color: white; font-weight: 600"
                        >+</span
                      >
                      <!-- onclick="increment('stop_loss')" -->
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
                        >-</span
                      >
                      <!-- onclick="decrement('take_profit')" -->
                      <input
                        type="number"
                        class="form-control bg-dark text-primary"
                        name="take_profit"
                        placeholder="Set T/F"
                        autocomplete="false"
                        disabled
                      />
                      <span
                        class="plus-btn"
                        style="color: white; font-weight: 600"
                        >+</span
                      >
                      <!-- onclick="increment('take_profit')" -->
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
                      disabled
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
                        >-</span
                      >
                      <!-- onclick="decrement('deviation')" -->
                      <input
                        type="number"
                        class="form-control bg-dark text-primary"
                        name="deviation"
                        placeholder="Deviation"
                        autocomplete="false"
                        disabled
                      />
                      <span
                        class="plus-btn"
                        style="color: white; font-weight: 600"
                        >+</span
                      >
                      <!-- onclick="increment('deviation')" -->
                    </div>
                  </div>
                </div>

                <div class="col-sm-12" id="placeorderBtn">
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
        <div class="col-12" style="position: relative">
          <div class="mb-5">
            <div class="my-4" id="box1"></div>

            <div
              class="col-12"
              style="position: absolute; bottom: 14px"
              id="buySellBtns"
            >
              <!-- <div id="form-trade-btn">
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
                      id="sellBtn"
                    >
                      <small>Sell</small>
                    </button>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
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
                background-color: #1a1a1a;
              "
              onclick="closePositionBtn()"
            >
              CLOSE WITH PROFIT <span id="closePositionBtnProfit">0</span>
            </button>
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
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
      crossorigin="anonymous"
    ></script>
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
      //       symbol: "EURUSD",
      //       profit: 0.3,
      //       positionId: "65c61057f801b9caefa02400",
      //       baseURL: "http://3.111.211.154:8080",
      //     });
      //   },
      //   postMessage: () => {
      //     console.log("hello world");
      //   },
      // };
      const reactNativeObj = JSON.parse(
        window.ReactNativeWebView.injectedObjectJson()
      );

      const Token = reactNativeObj.token;
      const contractSize = reactNativeObj.contractSize;
      const baseUrl = reactNativeObj?.baseURL;
      const digit = reactNativeObj?.digit;
      // Get the URLSearchParams object from the current URL
      //   const urlParams = new URLSearchParams(window.location.search);
      //   console.log(urlParams, "urlParams");

      const symbol = reactNativeObj.symbol;

      if (symbol === null) {
        defaultSymbol = "XAUUSD";
      } else {
        defaultSymbol = symbol;
      }

      const setMargin = (newMargin) => {
        margin = newMargin;
      };

      // Function to get the number of decimal places based on the symbol
      const getDecimalPlaces = (symbol) => {
        const symbolInfo = symbolDigits.find((info) => info.symbol === symbol);

        return symbolInfo ? symbolInfo.digits : 2;
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
            updatePriceLine(input.value, fieldName);
          } else {
            input.value = prevClose;
          }
        });
      }

      const setSymbolData = (symbol, time) => {
        fetchData(symbol, time)
          .then((data) => {
            defaultSymbol = symbol;
            defaultTime = time;
            if (data) {
              //   document.getElementById('symbol_place').innerHTML = symbol+ '&nbsp;:&nbsp;';
              chartData = [];
              lineData = [];
              volumeData = [];
              data.forEach((result) => {
                if (result._id.symbol == symbol) {
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
                  chartData.push(newDataPoint);
                  lineData.push({ value: close, time: timestamp });
                  if (open > close) {
                    volumeData.push({
                      time: timestamp,
                      value: parseFloat(result.volume),
                      color: "#dc3545",
                    });
                  } else {
                    volumeData.push({
                      time: timestamp,
                      value: parseFloat(result.volume),
                      color: "#198754",
                    });
                  }
                }
              });

              // const smaValues = calculateSMA(chartData, 5);
              // smaSeries.setData(smaValues);

              if (symbolDataMap.has(defaultSymbol)) {
                // Retrieve the symbol data from the map
                const symbolData = symbolDataMap.get(defaultSymbol);

                // Now you can use symbolData and set the latest price
                setLatestPrice(symbolData.ask, symbolData.bid);
                setStepForNumberFields(defaultSymbol);
                setMinMaxValue(defaultSymbol);
              }
            } else {
              console.log("No data retrieved from the API.");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      };

      const setMinMaxValue = (symbol) => {
        const qtyInputs = document.querySelectorAll('input[name="qty"]');

        // Set min, max, and step values for each input
        qtyInputs.forEach((input) => {
          // Set your desired min, max, and step values here
          const minMax = getMinMax(symbol);

          // const step = 0.01;

          // Set attributes for the input element
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
          buyButton.innerHTML = ask.toFixed(digit);
        }

        // Update sell buttons
        for (const sellButton of sellButtons) {
          sellButton.innerHTML = bid.toFixed(digit);
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
        // console.log(price);
        return price.toFixed(getDecimalPlaces(defaultSymbol));
      };

      // Function to add or update a new data point in the candlestick chart

      // Starting socket connection
      const socket = io(baseUrl, {
        transports: ["websocket"],
        withCredentials: false,
      });
      socket.on("connect", () => {
        console.log("Connected to server");
      });

      // Event handler for new data points from the WebSocket
      socket.on("newMessage", (newDataPoint) => {
        const ask = newDataPoint.newMessage?.ask;
        const bid = newDataPoint.newMessage?.bid;
        const symbol = newDataPoint?.newMessage?.symbol;
        if (symbol === defaultSymbol) {
          calculateProfitAndUpdate(ask, bid);
          setLatestPrice(bid, ask);
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

      // Function to set prevClose in the specified input field
      const setPrevCloseInField = (field, input) => {
        if (field.value == "") {
          field.value = prevClose;
        }
        if (input == "limit") {
          LimitLineSeries.setData([{ time: Date.now(), value: prevClose }]);
        } else if (input == "price") {
          PriceLineSeries.setData([{ time: Date.now(), value: prevClose }]);
        } else if (input == "stoploss") {
          StopLossLineSeries.setData([{ time: Date.now(), value: prevClose }]);
        } else {
          TakeProfitLineSeries.setData([
            { time: Date.now(), value: prevClose },
          ]);
        }
      };

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
    <script>
      const buySellBtns = document.getElementById("buySellBtns");
      buySellBtns.style.display = "none";
      const placeOrderBtn = document.getElementById("placeorderBtn");
      placeOrderBtn.style.display = "none";
      const instantSelect = document.getElementById("instantSelect");
      instantSelect.style.display = "none";

      const closePositionBtnProfit = document.getElementById(
        "closePositionBtnProfit"
      );
      // closePositionBtnProfit.innerHTML = reactNativeObj.profit;
      const closePositionBtn = () => {
        const api = baseUrl + "/exit-position";

        const positionId = reactNativeObj.positionId;
        const jsonbody = JSON.stringify({
          positionId: positionId,
        });
        var myHeaders = new Headers();
        myHeaders.append("Authorization", Token);
        myHeaders.append("Content-Type", "application/json");

        window.ReactNativeWebView.postMessage("hit");

        fetch(api, {
          method: "POST",
          body: jsonbody,
          headers: myHeaders,
        })
          .then((r) => {
            return r.json();
          })
          .then((data) => {
            if (data?.message === "try again") {
              alert(data?.message);
              window.ReactNativeWebView.postMessage("failed");
            } else {
              window.ReactNativeWebView.postMessage("success");
            }
          })
          .catch((err) => {
            console.log(err.message);
            window.ReactNativeWebView.postMessage("failed");
          });
      };
      function calculateProfitAndUpdate(ask, bid) {
        const digit = reactNativeObj?.digit;
        const closePositionBtnProfit = document.getElementById(
          "closePositionBtnProfit"
        );
        let profit;
        const volume = Number(reactNativeObj?.volume);
        const type = Number(reactNativeObj?.orderType);
        const price = Number(reactNativeObj?.price);

        if (type === 1 || type === 2 || type === 4 || type === 6) {
          profit = (
            bid * volume * contractSize -
            price * volume * contractSize
          ).toFixed(digit);
        } else {
          profit = (
            price * volume * contractSize -
            ask * volume * contractSize
          ).toFixed(digit);
        }

        closePositionBtnProfit.innerHTML = profit;
      }
    </script>
  </body>
</html>

  `;
};
export default function ClosePosition({route}) {
  const BASEURL = useSelector(state => state.baseUrl);
  const navigation = useNavigation();
  const positionDetail = route?.params;
  const {Token} = useContext(AuthContext);
  const [orderState, setOrderState] = useState(null);
  // console.log(Token, 'token');
  // console.log(positionDetail);
  const id = positionDetail?.id;
  const price = positionDetail?.price;
  const symbol = positionDetail?.symbol;
  const profit = positionDetail?.profit;
  const volume = positionDetail?.volume;
  const orderType = positionDetail?.orderType;
  const contractSize = positionDetail?.contractSize;
  const digit = positionDetail?.digit;
  const ticket = positionDetail?.ticket;
  console.log(ticket);
  console.log(digit);
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
    <>
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
              Close position #{ticket}
            </Text>
            <Text style={{fontSize: 12, opacity: 0.4, fontWeight: '600'}}>
              {orderTypeText} {volume} {symbol} at {price}
            </Text>
          </View>
        </View>
        <WebView
          source={{html: getWebViewHTML()}}
          injectedJavaScriptObject={{
            token: Token,
            profit,
            positionId: id,
            baseURL: BASEURL,
            symbol: symbol,
            contractSize,
            volume,
            orderType,
            price,
            digit,
          }}
          onMessage={response => {
            const data = response.nativeEvent.data;
            console.log(data);
            if (data === 'hit') return setOrderState('hit');
            else if (data === 'success') {
              setOrderState('success');
              setTimeout(() => {
                setOrderState(null);
                navigation.goBack();
              }, 1000);
            } else {
              setTimeout(() => {
                setOrderState(null);
                navigation.goBack();
              }, 1000);
              setOrderState('failed');
            }
          }}
        />
      </View>
      <Success
        orderState={orderState}
        symbol={symbol}
        price={Number(price) + Number(profit)}
        setOrderState={setOrderState}
      />
    </>
  );
}
