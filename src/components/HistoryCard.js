import {useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import store from '../../ReduxToolkit/store';

function formatDate(openPositionTime) {
  const year = openPositionTime?.split('-')[0];
  const month = openPositionTime?.split('-')[1];
  const date = openPositionTime?.split('T')[0]?.split('-')[2];
  const hour = openPositionTime?.split('T')[1]?.split(':')[0];
  const minute = openPositionTime?.split('T')[1]?.split(':')[1];
  const second = openPositionTime?.split('T')[1]?.split(':')[2]?.slice(0, 2);
  const formatedDate = `${year}.${month}.${date} ${hour}:${minute}:${second}`;
  return formatedDate;
}

function getDigit(symbol) {
  const watchlistData = store.getState().watchlist;
  for (let i = 0; i < watchlistData.length; i++) {
    if (symbol === watchlistData[i].symbol) {
      return watchlistData[i].digits;
    }
  }
}

const HistoryCard = ({type, data}) => {
  const [opened, setOpened] = useState(false);
  const symbol = data?.symbol;

  const volume = data?.volume;
  const digit = useMemo(() => getDigit(symbol), []);
  const price = Number(data?.price).toFixed(digit);
  const closePrice = Number(data?.closePrice).toFixed(digit);
  const profit = Number(data?.profit).toFixed(2);
  const typeNum = data?.type;
  const stopLoss = data?.stopLoss?.toFixed(digit);
  const takeProfit = data?.takeProfit?.toFixed(digit);
  const id = data?.ticket;
  const commission = data?.comission;
  const swap = Number(data?.swap);
  const openPositionTime_n_orderTime = data?.createdAt;
  let open = openPositionTime_n_orderTime ? formatDate(openPositionTime_n_orderTime) : '';

  let closePositionTime = data?.closeTime;

  let closeTime = closePositionTime ? formatDate(closePositionTime) : '';
  let orderType;
  if (typeNum === 0) {
    orderType = 'Sell';
  } else if (typeNum === 1) {
    orderType = 'Buy';
  } else if (typeNum === 2) {
    orderType = 'Buy-Limit';
  } else if (typeNum === 3) {
    orderType = 'Sell-Limit';
  } else if (typeNum === 4) {
    orderType = 'Buy-Stop';
  } else if (typeNum === 5) {
    orderType = 'Sell-Stop';
  } else if (typeNum === 6) {
    orderType = 'Buy-Stop-Limit';
  } else if (typeNum === 7) {
    orderType = 'Sell-Stop-Limit';
  } else {
    orderType = 'invalid';
  }
  const initialVolume = data?.initialVolume;
  const currentVolume = data?.initialVolume - data?.currentVolume;

  const status = data?.status ? 'Filled' : 'Cancelled';
  const entry = data?.entry ? 'in' : 'out';
  const order = data?.order;
  const dealTime = data?.entry ? formatDate(data?.createdAt) : formatDate(data?.updatedAt);

  return (
    <TouchableOpacity onPress={() => setOpened(!opened)}>
      <View
        style={{
          borderTopWidth: 1,
          borderBlockColor: '#ccc',
          padding: 5,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View>
          <View style={{flexDirection: 'row', gap: 3}}>
            <Text style={{color: '#fff', fontWeight: '600'}}>{symbol}</Text>
            <Text
              style={{
                color: typeNum === 0 || typeNum === 3 || typeNum === 5 || typeNum === 7 ? '#ce262c' : '#3c6dac',
                fontWeight: '500',
              }}>
              {orderType + ' '}
              {type === 'positions' ? `, ${volume}` : type === 'deals' ? `, ${entry}` : null}
            </Text>
          </View>
          <Text style={{color: '#fff', opacity: 0.7, fontWeight: '600'}}>
            {type === 'positions'
              ? `${price} → ${closePrice}`
              : type === 'orders'
              ? //   ? '0.01/0.01 at 0.08377'
                `${currentVolume}/${initialVolume} at ${price}`
              : type === 'deals'
              ? `${volume} at ${price}`
              : null}
          </Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text
            style={{
              color: '#fff',
              opacity: 0.6,
            }}>
            {type === 'deals' ? dealTime : closeTime}
          </Text>
          <Text
            style={{
              color:
                type === 'positions' || type === 'deals'
                  ? // ? '#3c6dac'
                    profit < 0
                    ? '#ce262c'
                    : // : '#3c6dac'
                      'green'
                  : '#ffffff66',
              fontWeight: '800',
            }}>
            {type === 'positions' ? profit : type === 'orders' ? status : type === 'deals' ? profit : null}
          </Text>
        </View>
      </View>
      {opened && (
        <View>
          {type === 'orders' && <Text style={[styles.openedText, {paddingHorizontal: 10}]}>{open}</Text>}
          {(type === 'positions' || type === 'orders') && (
            <View
              style={{
                flexDirection: type === 'positions' ? 'row' : 'column',
                paddingHorizontal: 5,
              }}>
              <View style={styles.textView}>
                <Text style={styles.openedText}>S/L:</Text>
                {type === 'orders' && <Text>-</Text>}
                <Text style={styles.openedText}>{stopLoss}</Text>
              </View>
              <View style={styles.textView}>
                <Text style={styles.openedText}>T/P:</Text>
                {type === 'orders' && <Text>-</Text>}
                <Text style={styles.openedText}>{takeProfit}</Text>
              </View>
            </View>
          )}
          {type === 'positions' && (
            <>
              <View style={{flexDirection: 'row', paddingHorizontal: 5}}>
                <View style={styles.textView}>
                  <Text style={styles.openedText}>Open:</Text>

                  {/* <Text style={styles.openedText}>2024.01.30 17:30:16</Text>  */}

                  <Text style={[styles.openedText]}>{open}</Text>
                </View>
                <View style={styles.textView}>
                  <Text style={styles.openedText}>Swap: </Text>
                  <Text style={styles.openedText}>{swap}</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', paddingHorizontal: 5}}>
                <View style={styles.textView}>
                  <Text style={styles.openedText}>Id:</Text>
                  <Text style={styles.openedText}>#{id}</Text>
                </View>
                <View style={styles.textView}>
                  <Text style={styles.openedText}>Commission:</Text>
                  <Text style={styles.openedText}>{commission}</Text>
                </View>
              </View>
            </>
          )}
          {type === 'deals' && (
            <>
              <View style={{flexDirection: 'row', paddingHorizontal: 5}}>
                <View style={styles.textView}>
                  <Text style={styles.openedText}>Deal:</Text>

                  <Text style={styles.openedText}>{id}</Text>
                </View>
                <View style={styles.textView}>
                  <Text style={styles.openedText}>Swap: </Text>
                  <Text style={styles.openedText}>{swap}</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', paddingHorizontal: 5}}>
                <View style={styles.textView}>
                  <Text style={styles.openedText}>Order:</Text>
                  <Text style={styles.openedText}>{order}</Text>
                </View>
                <View style={styles.textView}>
                  <Text style={styles.openedText}>Charges:</Text>
                  <Text style={styles.openedText}>0.00</Text>
                </View>
              </View>
            </>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};
export default HistoryCard;

const styles = StyleSheet.create({
  textView: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  openedText: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.5,
  },
});
