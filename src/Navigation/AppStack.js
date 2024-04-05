import React, {useEffect, useContext, lazy, Suspense, useState} from 'react';
import {View, Text, Image} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from '../Drawer/DrawerContent';
import Quots from '../Screens/Quots';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MainQuots from '../Screens/MainQuots';
import IonicIcons from 'react-native-vector-icons/Ionicons';
import Charts from '../Screens/Charts';
const Trades = lazy(() => import('../Screens/Trades'));
import History from '../Screens/History';
import Message from '../Screens/Message';
import SignIn from '../Screens/SignIn';
import SignUp from '../Screens/SignUp';
import AddSymbols from '../Screens/AddSymbols';
import SelectedSymbols from '../Screens/SelectedSymbols';
import News from '../Screens/News';
import {BarScreen} from '../Screens/BarScreen';
import MailBox from '../Screens/MailBox';
import Jurnal from '../Screens/Jurnal';
import AppLoading from '../Screens/AppLoading';
import Indicator from '../Screens/Indicator';
import MainIndicator from '../Screens/MainIndicator';
import IndicatorDetails from '../Screens/IndicatorDetails';
import ProblemDesc from '../Screens/ProblemDesc';
import Setting from '../Screens/Setting';
import SecurityPin from '../Screens/SecurityPin';
import Properties from '../Screens/Properties';
import DepthOfMarket from '../Screens/DepthOfMarket';
import MarketStatic from '../Screens/MarketStatic';
import OrderCreate from '../Screens/OrderCreate';
import HeaderChart from '../components/HeaderChart';
import AccountSetup from '../Screens/AccountSetup/AccountSetup';
import ChangePassword from '../Screens/AccountSetup/ChangePassword';
import Certificate from '../Screens/AccountSetup/Certificate';
import Brokers from '../Screens/AccountSetup/Brokers';
import BrokerInformation from '../Screens/AccountSetup/BrokerInformation';
import NewTrade from '../Screens/newTrade';
import ClosePosition from '../Screens/ClosePosition';
import ModifyPosition from '../Screens/ModifyPosition';
import {AuthContext} from './AuthProvider';
import Secondlogin from '../Screens/Secondlogin';
import Login from '../Screens/Login';
import OpenDemoAccount from '../Screens/AccountSetup/OpenDemoAccount';
import NewAccountRegistration from '../Screens/AccountSetup/NewAccountRegistration';
import NewAccountStart from '../Screens/AccountSetup/NewAccountStart';
import HistoryContextProvider from './HistoryProvider';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const activeTabColor = '#0388fc';
const tabColor = '#6d6d6e';

const HistoryP = () => {
  return (
    <HistoryContextProvider>
      <History />
    </HistoryContextProvider>
  );
};

const AppStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AppLoading"
        component={AppLoading}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Secondlogin"
        component={Secondlogin}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="accountSetupStack" component={ManageAccountNavigationStack} options={{headerShown: false}} />
      {/* <Stack.Screen
        name="accountSetup"
        component={AccountSetup}
        options={{headerShown: false}}
      /> */}

      <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="SignIn2" component={Login} options={{headerShown: false}} />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Charts"
        component={Charts}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HeaderChart"
        component={HeaderChart}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddSymbols"
        component={AddSymbols}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SelectedSymbols"
        component={SelectedSymbols}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Indicator"
        component={Indicator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MainIndicator"
        component={MainIndicator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="IndicatorDetails"
        component={IndicatorDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProblemDesc"
        component={ProblemDesc}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="SecurityPin"
        component={SecurityPin}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Properties"
        component={Properties}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DepthOfMarket"
        component={DepthOfMarket}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OrderCreate"
        component={OrderCreate}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MarketStatic"
        component={MarketStatic}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="ClosePosition" component={ClosePosition} options={{headerShown: false}} />
      <Stack.Screen name="ModifyPosition" component={ModifyPosition} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

const DrawerNavigator = ({navigation}) => {
  return (
    <Drawer.Navigator initialRouteName="BottomTab" drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="BottomTab" component={BottomTab} options={{headerShown: false}} />
    </Drawer.Navigator>
  );
};

const ManageAccountNavigationStack = () => {
  return (
    <Stack.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Stack.Screen name="accountHome" component={AccountSetup} options={{headerShown: false}} />
      <Stack.Screen name="accountCertificate" component={Certificate} options={{headerShown: false}} />
      <Stack.Screen name="accountBroker" component={Brokers} options={{headerShown: false}} />
      <Stack.Screen name="BrokerInfo" component={BrokerInformation} options={{headerShown: false}} />
      <Stack.Screen name="ChangePswd" component={ChangePassword} options={{headerShown: false}} />
      <Stack.Screen name="SigninAnotherAccount" component={OpenDemoAccount} options={{headerShown: false}} />
      <Stack.Screen name="NewAccountRegister" component={NewAccountRegistration} options={{headerShown: false}} />
      <Stack.Screen name="NewAccountStart" component={NewAccountStart} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

const Home = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="MainQuots"
        component={MainQuots}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Charts1"
        component={Charts}
      />
      <Stack.Screen name={'Journal'} component={Jurnal} options={{headerShown: false}} />
      <Stack.Screen name="Settings" component={Setting} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};
// const Home1 = ({navigation, route}) => {
//   // console.log(navigation + ' navigation');
//   // const [initialSymbol, setInitialSymbol] = useState({
//   //   symbol: route?.params?.symbol,
//   // });
//   const {chartRouteState, setChartRouteState} = useContext(AuthContext);

//   useEffect(() => {
//     console.log('mounting');
//     // setInitialSymbol({
//     //   symbol: route.params.symbol,
//     // });
//     // setRoute({
//     //   symbol: route?.params?.symbol,
//     // });
//     setChartRouteState({
//       symbol: route?.params?.symbol,
//     });
//     return () => {
//       console.log('unmounting');
//     };
//   }, [route]);
//   console.log(route.params.symbol, '<-: route app stack');
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         options={{
//           headerShown: false,
//         }}
//         // initialParams={{symbol: route.params.symbol}}
//         initialParams={chartRouteState}
//         name="Charts"
//         component={Charts}
//       />
//     </Stack.Navigator>
//   );
// };

const TradeStack = ({navigation, route}) => {
  return (
    // <SocketContextProvider>
    <Suspense fallback={<View>Loading...</View>}>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Trades"
          component={Trades}
        />
      </Stack.Navigator>
    </Suspense>
    // </SocketContextProvider>
  );
};
const NewsStack = ({navigation, route}) => {
  return (
    <Stack.Navigator initialRouteName="Message">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Message"
        component={Message}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="News"
        component={News}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="MailBox"
        component={MailBox}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Jurnal"
        component={Jurnal}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Setting"
        component={Setting}
      />
    </Stack.Navigator>
  );
};

const BottomTab = ({navigation}) => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: '#16181a'}}
      screenOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopColor: '#ccc',
          height: 65,
          backgroundColor: '#0c0d0d',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {focused ? (
                  <>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <AntDesign name="arrowup" color={focused ? activeTabColor : tabColor} size={20} />
                      <AntDesign
                        name="arrowdown"
                        color={focused ? activeTabColor : tabColor}
                        size={20}
                        style={{marginLeft: -3}}
                      />
                    </View>

                    <Text
                      style={{
                        color: focused ? activeTabColor : tabColor,
                        fontSize: 12,
                        fontFamily: 'Inter-SemiBold',
                        fontStyle: 'normal',
                        fontWeight: '600',
                        marginTop: 3,
                      }}>
                      Quotes
                    </Text>
                  </>
                ) : (
                  <>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <AntDesign name="arrowup" color={focused ? activeTabColor : tabColor} size={20} />
                      <AntDesign
                        name="arrowdown"
                        color={focused ? activeTabColor : tabColor}
                        size={20}
                        style={{marginLeft: -3}}
                      />
                    </View>
                    <Text
                      style={{
                        color: focused ? activeTabColor : tabColor,
                        fontSize: 12,
                        fontFamily: 'Inter-SemiBold',
                        fontStyle: 'normal',
                        fontWeight: '600',
                        marginTop: 3,
                      }}>
                      Quotes
                    </Text>
                  </>
                )}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Chart"
        component={Charts}
        initialParams={{
          symbol: {
            name: 'XAUUSD',
            description: 'Gold VS US Dollar',
          },
        }}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {focused ? (
                  <>
                    <FontAwesome name="line-chart" color={focused ? activeTabColor : tabColor} size={20} />
                    <Text
                      style={{
                        color: focused ? activeTabColor : tabColor,
                        fontSize: 12,
                        fontFamily: 'Inter-SemiBold',
                        fontStyle: 'normal',
                        fontWeight: '600',
                        marginTop: 3,
                      }}>
                      Charts
                    </Text>
                  </>
                ) : (
                  <>
                    <FontAwesome name="line-chart" color={focused ? activeTabColor : tabColor} size={20} />
                    <Text
                      style={{
                        color: focused ? activeTabColor : tabColor,
                        fontSize: 12,
                        fontFamily: 'Inter-SemiBold',
                        fontStyle: 'normal',
                        fontWeight: '600',
                        marginTop: 3,
                      }}>
                      Charts
                    </Text>
                  </>
                )}
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="MealType"
        component={NewTrade}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {focused ? (
                  <>
                    <MaterialCommunityIcons
                      name="chart-timeline-variant"
                      color={focused ? activeTabColor : tabColor}
                      size={20}
                    />
                    <Text
                      numberOfLines={1}
                      style={{
                        color: focused ? activeTabColor : tabColor,
                        fontSize: 12,
                        fontFamily: 'Inter-SemiBold',
                        fontStyle: 'normal',
                        fontWeight: '600',
                        marginTop: 3,
                      }}>
                      Trade
                    </Text>
                  </>
                ) : (
                  <>
                    <MaterialCommunityIcons
                      name="chart-timeline-variant"
                      color={focused ? activeTabColor : tabColor}
                      size={20}
                    />
                    <Text
                      numberOfLines={1}
                      style={{
                        color: focused ? activeTabColor : tabColor,
                        fontSize: 12,
                        fontFamily: 'Inter-SemiBold',
                        fontStyle: 'normal',
                        fontWeight: '600',
                        marginTop: 3,
                      }}>
                      Trade
                    </Text>
                  </>
                )}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Notification"
        // component={History}
        component={HistoryP}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {focused ? (
                  <>
                    <Entypo name="back-in-time" color={focused ? activeTabColor : tabColor} size={20} />
                    <Text
                      numberOfLines={1}
                      style={{
                        color: focused ? activeTabColor : tabColor,
                        fontSize: 12,
                        fontFamily: 'Inter-SemiBold',
                        fontStyle: 'normal',
                        fontWeight: '600',
                        marginTop: 3,
                      }}>
                      History
                    </Text>
                  </>
                ) : (
                  <>
                    <Entypo name="back-in-time" color={focused ? activeTabColor : tabColor} size={20} />
                    <Text
                      numberOfLines={1}
                      style={{
                        color: focused ? activeTabColor : tabColor,
                        fontSize: 12,
                        fontFamily: 'Inter-SemiBold',
                        fontStyle: 'normal',
                        fontWeight: '600',
                        marginTop: 3,
                      }}>
                      History
                    </Text>
                  </>
                )}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Order"
        // component={NewsStack}
        component={ManageAccountNavigationStack}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {focused ? (
                  <>
                    <IonicIcons name="person" color={focused ? activeTabColor : tabColor} size={20} />
                    <Text
                      style={{
                        color: focused ? activeTabColor : tabColor,
                        fontSize: 12,
                        fontFamily: 'Inter-SemiBold',
                        fontStyle: 'normal',
                        fontWeight: '600',
                        marginTop: 3,
                      }}>
                      Profile
                    </Text>
                  </>
                ) : (
                  <>
                    <IonicIcons name="person" color={focused ? activeTabColor : tabColor} size={20} />
                    <Text
                      style={{
                        color: focused ? activeTabColor : tabColor,
                        fontSize: 12,
                        fontFamily: 'Inter-SemiBold',
                        fontStyle: 'normal',
                        fontWeight: '600',
                        marginTop: 3,
                      }}>
                      Profile
                    </Text>
                  </>
                )}
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
