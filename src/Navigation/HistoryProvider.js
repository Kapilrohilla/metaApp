import {createContext} from 'react';
import {useSelector} from 'react-redux';

export const HistoryContext = createContext();

const HistoryContextProvider = ({children}) => {
  let positionData = useSelector(state => state.historyPosition);
  if (!positionData) {
    positions = [];
  }
  //   const deals = useSelector(state => state.historyDeals);
  const orders = useSelector(state => state.historyOrder);
  return <HistoryContext.Provider value={positionData}>{children}</HistoryContext.Provider>;
};
export default HistoryContextProvider;
