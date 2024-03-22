import {TouchableOpacity} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import {useState} from 'react';
import {Menu, Divider} from 'react-native-paper';
import {scale} from '../../utils/overAllNormalization';
import {useDispatch, useSelector} from 'react-redux';
import {
  closeTimePositionSort,
  openTimePositionSort,
  profitPositionSort,
  symbolSort,
  ticketPositionSort,
  typePositionSort,
  volumePositionSort,
} from '../../../ReduxToolkit/slices/historyPositionSlice';
import {
  closeTimeOrderSort,
  openTimeOrderSort,
  profitOrderSort,
  symbolOrderSort,
  typeOrderSort,
  volumeOrderSort,
} from '../../../ReduxToolkit/slices/historyOrderSlice';
import {
  closeTimeDealSort,
  openTimeDealSort,
  profitDealSort,
  symbolDealSort,
  typeDealSort,
  volumeDealSort,
} from '../../../ReduxToolkit/slices/historyDealSlice';

export default function Filter_Menu() {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const dispatch = useDispatch();
  const historyType = useSelector(state => state.historyType);
  console.log(historyType);
  return (
    <Menu
      visible={isFilterVisible}
      onDismiss={() => {
        setIsFilterVisible(false);
      }}
      anchor={
        <TouchableOpacity
          onPress={() => {
            setIsFilterVisible(true);
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{rotate: `90deg`}],
          }}>
          <Octicons name="arrow-switch" color={'#fff'} size={scale(25)} />
        </TouchableOpacity>
      }>
      <Menu.Item
        onPress={() => {
          if (historyType === 1) {
            dispatch(symbolSort());
          } else if (historyType === 2) {
            dispatch(symbolOrderSort());
          } else if (historyType === 3) {
            dispatch(symbolDealSort());
          }
          setIsFilterVisible(false);
        }}
        title="Symbol"
      />
      <Divider />
      <Menu.Item
        onPress={() => {
          if (historyType === 1) {
            dispatch(ticketPositionSort());
          } else if (historyType === 2) {
            dispatch(ticketPositionSort());
          } else if (historyType === 3) {
            dispatch(ticketPositionSort());
          }
          setIsFilterVisible(false);
        }}
        title="Ticket"
      />
      <Divider />
      <Menu.Item
        onPress={() => {
          if (historyType === 1) {
            dispatch(typePositionSort());
          } else if (historyType === 2) {
            dispatch(typeOrderSort());
          } else if (historyType === 3) {
            dispatch(typeDealSort());
          }
          setIsFilterVisible(false);
        }}
        title="Type"
      />
      <Divider />
      <Menu.Item
        onPress={() => {
          if (historyType === 1) {
            dispatch(volumePositionSort());
          } else if (historyType === 2) {
            dispatch(volumeOrderSort());
          } else if (historyType === 3) {
            dispatch(volumeDealSort());
          }
          setIsFilterVisible(false);
        }}
        title="Volume"
      />
      <Divider />
      <Menu.Item
        onPress={() => {
          if (historyType === 1) {
            dispatch(openTimePositionSort());
          } else if (historyType === 2) {
            dispatch(openTimeOrderSort());
          } else if (historyType === 3) {
            dispatch(openTimeDealSort());
          }
          setIsFilterVisible(false);
        }}
        title="Open time"
      />
      <Divider />
      <Menu.Item
        onPress={() => {
          if (historyType === 1) {
            dispatch(closeTimePositionSort());
          } else if (historyType === 2) {
            dispatch(closeTimeOrderSort());
          } else if (historyType === 3) {
            dispatch(closeTimeDealSort());
          }
          setIsFilterVisible(false);
        }}
        title="Close Time"
      />
      <Divider />
      <Menu.Item
        onPress={() => {
          if (historyType === 1) {
            dispatch(profitPositionSort());
          } else if (historyType === 2) {
            dispatch(profitOrderSort());
          } else if (historyType === 3) {
            dispatch(profitDealSort());
          }
          setIsFilterVisible(false);
        }}
        title="Profit"
      />
    </Menu>
  );
}
