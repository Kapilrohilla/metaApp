import moment from 'moment';
import {createContext, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

export const HistoryContext = createContext();

const HistoryContextProvider = ({children}) => {
  const [positionData, setPositionData] = useState([]);
  const pd = useSelector(state => state.historyPosition);
  const [orderData, setOrderData] = useState([]);
  const od = useSelector(state => state.historyOrder);
  const [dealData, setDealData] = useState([]);
  const dd = useSelector(state => state.histroyDeal);
  function timeBasedSort4Position(action) {
    let state = pd;
    const today = moment().format('l');
    const lastweek = moment().subtract(7, 'days').format('l');
    const lastMonth = moment().subtract(1, 'month').calendar();
    const last3Month = moment().subtract(3, 'month').calendar();

    let filteredArray = [];

    switch (action.type) {
      case 'today':
        for (let i = 0; i < state.length; i++) {
          if (
            new Date(state[i]?.createdAt).toDateString() ===
            new Date(today.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/, '$3-$1-$2')).toDateString()
          ) {
            // console.log('found');
            filteredArray.push(state[i]);
          } else {
            // console.log('not found');
            // console.log(new Date(positionData[i].createdAt).toDateString());
            // console.log(new Date(today).toDateString());
          }
        }
        setPositionData(filteredArray);
        break;
      case 'lastweek':
        const reFormattedLastWeek = lastweek.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/, '$3-$1-$2');

        let date2compare = new Date(reFormattedLastWeek).getTime();
        const orderDate = new Date(state[0]?.createdAt).getTime();
        for (let i = 0; i < state.length; i++) {
          if (orderDate > date2compare) {
            filteredArray.push(state[i]);
          } else {
          }
        }
        setPositionData(filteredArray);
        break;
      case 'lastMonth':
        let filter = [];
        const reFormattedLastMonth = lastMonth.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/, '$3-$1-$2');
        for (let i = 0; i < state.length; i++) {
          if (new Date(state[i].createdAt).getTime() > new Date(reFormattedLastMonth).getTime()) {
            filter.push(state[i]);
          }
        }
        setPositionData(filter);

        break;
      case 'last3Month':
        const reFormattedLast3Month = last3Month.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/, '$3-$1-$2');
        for (let i = 0; i < state.length; i++) {
          if (new Date(state[i].createdAt).getTime() > new Date(reFormattedLast3Month).getTime()) {
            filteredArray.push(state[i]);
          }
        }
        setPositionData(filteredArray);
        break;
      case 'customPeriod':
        break;
      default:
      // filteredArray = state;
      // return state;
    }
  }

  function timeBasedSort4Order(action) {
    console.log('history sorting');
    let state = od;
    const today = moment().format('l');
    const lastweek = moment().subtract(7, 'days').format('l');
    const lastMonth = moment().subtract(1, 'month').calendar();
    const last3Month = moment().subtract(3, 'month').calendar();
    console.log('total: ' + state?.length);
    let filteredArray = [];

    switch (action.type) {
      case 'today':
        for (let i = 0; i < state.length; i++) {
          if (
            new Date(state[i]?.createdAt).toDateString() ===
            new Date(today.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/, '$3-$1-$2')).toDateString()
          ) {
            // console.log('found');
            filteredArray.push(state[i]);
          } else {
            // console.log('not found');
            // console.log(new Date(positionData[i].createdAt).toDateString());
            // console.log(new Date(today).toDateString());
          }
        }
        console.log('filtered: ' + filteredArray.length);
        setOrderData(filteredArray);
        break;
      case 'lastweek':
        const reFormattedLastWeek = lastweek.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/, '$3-$1-$2');

        let date2compare = new Date(reFormattedLastWeek).getTime();
        const orderDate = new Date(state[0]?.createdAt).getTime();
        for (let i = 0; i < state.length; i++) {
          if (orderDate > date2compare) {
            filteredArray.push(state[i]);
          } else {
          }
        }
        console.log('filtered: ' + filteredArray.length);
        setOrderData(filteredArray);
        break;
      case 'lastMonth':
        let filter = [];
        const reFormattedLastMonth = lastMonth.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/, '$3-$1-$2');
        for (let i = 0; i < state.length; i++) {
          if (new Date(state[i].createdAt).getTime() > new Date(reFormattedLastMonth).getTime()) {
            filter.push(state[i]);
          }
        }
        console.log('filtered: ' + filter.length);
        setOrderData(filter);

        break;
      case 'last3Month':
        const reFormattedLast3Month = last3Month.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/, '$3-$1-$2');
        for (let i = 0; i < state.length; i++) {
          if (new Date(state[i].createdAt).getTime() > new Date(reFormattedLast3Month).getTime()) {
            filteredArray.push(state[i]);
          }
        }
        console.log('filtered: ' + filteredArray.length);
        setOrderData(filteredArray);
        break;
      case 'customPeriod':
        break;
      default:
      // filteredArray = state;
      // return state;
    }
  }
  function timeBasedSort4Deal(action) {
    let state = dd;
    const today = moment().format('l');
    const lastweek = moment().subtract(7, 'days').format('l');
    const lastMonth = moment().subtract(1, 'month').calendar();
    const last3Month = moment().subtract(3, 'month').calendar();
    console.log('total: ' + state?.length);
    let filteredArray = [];

    switch (action.type) {
      case 'today':
        for (let i = 0; i < state.length; i++) {
          if (
            new Date(state[i]?.createdAt).toDateString() ===
            new Date(today.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/, '$3-$1-$2')).toDateString()
          ) {
            // console.log('found');
            filteredArray.push(state[i]);
          } else {
          }
        }
        console.log('filtered: ' + filteredArray.length);
        setDealData(filteredArray);
        break;
      case 'lastweek':
        const reFormattedLastWeek = lastweek.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/, '$3-$1-$2');

        let date2compare = new Date(reFormattedLastWeek).getTime();
        const orderDate = new Date(state[0]?.createdAt).getTime();
        for (let i = 0; i < state.length; i++) {
          if (orderDate > date2compare) {
            filteredArray.push(state[i]);
          } else {
          }
        }
        console.log('filtered: ' + filteredArray.length);
        setDealData(filteredArray);
        break;
      case 'lastMonth':
        let filter = [];
        const reFormattedLastMonth = lastMonth.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/, '$3-$1-$2');
        for (let i = 0; i < state.length; i++) {
          if (new Date(state[i].createdAt).getTime() > new Date(reFormattedLastMonth).getTime()) {
            filter.push(state[i]);
          }
        }
        console.log('filtered: ' + filter.length);
        setDealData(filter);

        break;
      case 'last3Month':
        const reFormattedLast3Month = last3Month.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/, '$3-$1-$2');
        for (let i = 0; i < state.length; i++) {
          if (new Date(state[i].createdAt).getTime() > new Date(reFormattedLast3Month).getTime()) {
            filteredArray.push(state[i]);
          }
        }
        console.log('filtered: ' + filteredArray.length);
        setDealData(filteredArray);
        break;
      case 'customPeriod':
        break;
      default:
    }
  }
  useEffect(() => {
    setPositionData(pd);
  }, [pd]);
  useEffect(() => {
    setOrderData(od);
  }, [od]);
  useEffect(() => {
    setDealData(dd);
  }, [dd]);
  return (
    <HistoryContext.Provider
      value={{
        positionData,
        timeBasedSort4Position: timeBasedSort4Position,
        orderData,
        timeBasedSort4Order,
        dealData,
        timeBasedSort4Deal,
      }}>
      {children}
    </HistoryContext.Provider>
  );
};
export default HistoryContextProvider;
