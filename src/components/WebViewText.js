/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';

export default function WebViewText() {
  const [symbolData, setSymbolData] = useState({});

  // Function to get the HTML content for the WebView
  const getWebviewContent = () => {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Display Array in List</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
    
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 10px;
            }
    
            ul {
                list-style: none;
                padding: 0;
            }
        </style>
    </head>
    
    <body>
        <div class="table-responsive">
            <table id="dataTable" class="table table-striped">
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Change</th>
                        <th>Bid</th>
                        <th>Ask</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    
        <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.7.1/socket.io.js"
            integrity="sha512-Z6C1p1NIexPj5MsVUunW4pg7uMX6/TT3CUVldmjXx2kpip1eZcrAnxIusDxyFIikyM9A61zOVNgvLr/TGudOQg=="
            crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    
        <script src="https://cdn.socket.io/4.0.0/socket.io.min.js"></script>
    
        <script>
            const symbolDataMap = new Map();
            let symbolColor;
            let changeColor;
            let bidColor;
            let askColor;
            let symbolIcon;
    
            // Function to handle row click
            const handleRowClick = (symbol, rowElement) => {
                const { symbol: symbolData, change_percent, change_points, bid, ask } = symbolDataMap.get(symbol);
                console.log("Clicked row data:", { symbol: symbolData, change_percent, change_points, bid, ask });
                window.ReactNativeWebView.postMessage(JSON.stringify({ symbol: symbolData, change_percent, change_points, bid, ask }));
    
            };
    
            const updateTable = () => {
                const tableBody = document.querySelector('#dataTable tbody');
                tableBody.innerHTML = '';
    
                symbolDataMap.forEach(data => {
                    const newRow = document.createElement('tr');
                    newRow.setAttribute('data-symbol', data.symbol);
                    newRow.addEventListener('click', () => handleRowClick(data.symbol, newRow)); // Pass the row element
    
                    const symbolCell = document.createElement('td');
                    if (data.askChange === 'falling') {
                        symbolColor = 'red';
                        symbolIcon = "<i class='fa fa-arrow-down'> ";
                    } else if (data.askChange === 'rising') {
                        symbolColor = 'green';
                        symbolIcon = "<i class='fa fa-arrow-up'>";
                    }
                    symbolCell.innerHTML = symbolIcon;
                    symbolCell.style.color = symbolColor;
                    symbolCell.innerHTML += data.symbol;
                    newRow.appendChild(symbolCell);
    
                    const changeCell = document.createElement('td');
                    const changePoints = data.change_points;
                    const changePercent = data.change_percent;
                    if (changePercent < 0) {
                        changeColor = 'red';
                    } else if (changePercent > 0) {
                        changeColor = 'green';
                    }
                    changeCell.style.color = changeColor;
                    changeCell.textContent = changePoints + '(' + changePercent + '%)';
                    newRow.appendChild(changeCell);
    
                    const bidCell = document.createElement('td');
                    bidCell.textContent = data.bid;
                    newRow.appendChild(bidCell);
    
                    const askCell = document.createElement('td');
                    askCell.textContent = data.ask;
                    newRow.appendChild(askCell);
    
                    tableBody.appendChild(newRow);
                });
            };
    
            const socket = io('http://65.0.59.137:8080', { transports: ['websocket'], withCredentials: false });
            socket.on('connect', () => {
                console.log('Connected to server');
            });
            socket.on('newMessage', newDataPoint => {
                let tableData = newDataPoint.newMessage;
                let symbol = tableData.symbol;
                if (symbolDataMap.has(symbol)) {
                    symbolDataMap.set(symbol, {
                        symbol: symbol,
                        change_percent: tableData.changePercent,
                        change_points: tableData.changePoints,
                        bid: tableData.bid,
                        ask: tableData.ask,
                        bidChange: tableData.bidChange,
                        askChange: tableData.askChange
                    });
                } else {
                    symbolDataMap.set(symbol, {
                        symbol: symbol,
                        change_percent: tableData.changePercent,
                        change_points: tableData.changePoints,
                        bid: tableData.bid,
                        ask: tableData.ask,
                    });
                }
                updateTable();
            });
        </script>
    </body>
    
    </html>`;
  };

  const onMessageReceived = event => {
    const dataArray = JSON.parse(event.nativeEvent.data);
    console.log('====================================');
    console.log(dataArray);
    console.log('====================================');
    setSymbolData(dataArray);
  };

  return (
    <>
      <WebView
        style={{flex: 1}}
        source={{
          html: getWebviewContent(),
        }}
        onMessage={onMessageReceived}
      />
      {symbolData.length > 0 && (
        <View style={styles.selectedItemContainer}>
          <Text style={{color: '#262626'}}>Symbols:</Text>
          {symbolData.map((symbol, index) => (
            <View key={index}>
              <Text style={{color: '#262626'}}>Symbol: {symbol.symbol}</Text>
              <Text style={{color: '#262626'}}>
                Change Points: {symbol.change_points}
              </Text>
              <Text style={{color: '#262626'}}>
                Change Percent: {symbol.change_percent}
              </Text>
              <Text style={{color: '#262626'}}>Bid: {symbol.bid}</Text>
              <Text style={{color: '#262626'}}>Ask: {symbol.ask}</Text>
            </View>
          ))}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  selectedItemContainer: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    marginTop: 10,
    borderRadius: 5,
  },
});
