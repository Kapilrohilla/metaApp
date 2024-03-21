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

export default function Filter_Menu() {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const dispatch = useDispatch();
  const historyState = useSelector(state => state.history);
  console.log(historyState);
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
          dispatch(symbolSort());
          setIsFilterVisible(false);
        }}
        title="Symbol"
      />
      <Divider />
      <Menu.Item
        onPress={() => {
          dispatch(ticketPositionSort());
          setIsFilterVisible(false);
        }}
        title="Ticket"
      />
      <Divider />
      <Menu.Item
        onPress={() => {
          dispatch(typePositionSort());
          setIsFilterVisible(false);
        }}
        title="Type"
      />
      <Divider />
      <Menu.Item
        onPress={() => {
          dispatch(volumePositionSort());
          setIsFilterVisible(false);
        }}
        title="Volume"
      />
      <Divider />
      <Menu.Item
        onPress={() => {
          dispatch(openTimePositionSort());
          setIsFilterVisible(false);
        }}
        title="Open time"
      />
      <Divider />
      <Menu.Item
        onPress={() => {
          dispatch(closeTimePositionSort());
          setIsFilterVisible(false);
        }}
        title="Close Time"
      />
      <Divider />
      <Menu.Item
        onPress={() => {
          dispatch(profitPositionSort());
          setIsFilterVisible(false);
        }}
        title="Profit"
      />
    </Menu>
  );
}
