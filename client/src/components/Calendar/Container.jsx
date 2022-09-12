// main libraries
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';

const getMonthData = () => {
  //let loadingData = true;
  let dataToReturn = {
    '2022-09-01': [{ name: 'item 1 - any js object' }],
    '2022-09-03': [{ name: 'item 2 - any js object' }],
    '2022-09-06': [{ name: 'item 3 - any js object' }, { name: 'any js object' }],
  };
  return dataToReturn;
};

const Container = () => {
  // const [today, setToday] = useState();
  // const monthData = getMonthData();
  const [items, setItems] = useState({
    // '2022-09-01': [{ name: 'item 1 - any js object' }],
    // '2022-09-03': [{ name: 'item 2 - any js object' }],
    // '2022-09-06': [{ name: 'item 3 - any js object' }, { name: 'any js object' }],
  });
  // const [items, setItems] = useState({
  //   '2022-09-04': [{ name: '1' }, { name: '2' }],
  //   '2022-09-03': [{ name: '3' }],
  // });

  // useState(() => {
  //   const td = new Date().toISOString().slice(0, 10);
  //   console.log(td);
  //   setToday(td);
  // }, []);

  const renderItem = (item) => {
    return (
      <TouchableOpacity onPress={() => Alert.alert(item.name)}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  const loadItems = (day) => {
    const items = items || {};
    setTimeout(() => {
      for (let i = 0; i < 25; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000; // "1日"をmsの秒数で表しているだけ。
        const strTime = timeToString(time); //  多分、これで2022-09-12みたいになっているはず。

        if (!items[strTime]) {
          items[strTime] = []; // 日付ごとのkey value pairが作られる。　'2022-09-12': []

          // const numItems = Math.floor(Math.random() * 3 + 1);
          // for (let j = 0; j < numItems; j++) {
          //   items[strTime].push({
          //     name: 'Item for ' + strTime + ' #' + j,
          //     height: Math.max(50, Math.floor(Math.random() * 150)),
          //     day: strTime,
          //   });
          // }
        }
      }
      // 2022-09-12から10ぶんまでのitemを作っただけ。
      // items
      //{'2022-09-12': [{value: '2022-09-12'}], '2022-09-13': [{value: '2022-09-13'], '2022-09-14': [{value: '2022-09-14'}],...}
      const newItems = {};
      // Object.keys -> ['2022-09-12', '2022-09-13', '2022-09-14',....]
      Object.keys(items).forEach((key) => {
        // {'2022-09-12':
        newItems[key] = items[key];
      });
      setItems(items);
    }, 1000);
  };

  // const renderItem = (reservation, isFirst) => {
  //   const fontSize = isFirst ? 16 : 14;
  //   const color = isFirst ? 'black' : '#43515c';

  //   return (
  //     <TouchableOpacity
  //       // style={[styles.item, {height: reservation.height}]}
  //       onPress={() => Alert.alert(reservation.name)}
  //     >
  //       <Text style={{ fontSize, color }}>{reservation.name}</Text>
  //     </TouchableOpacity>
  //   );
  // };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  // とりあえず、'何もない日'を全部renderしておいて、特定の予定のある日だけ、日付: [{何かの予定}]、って感じであればいいか。
  return (
    // <SafeAreaView>
    <View style={{ flex: 1 }}>
      {/* <Agenda
        testID={testIDs.agenda.CONTAINER}
        items={items}
        renderItem={renderItem}
        loadItemsForMonth={loadItems}
        selected={'2020-11-20'}
        renderEmptyDate={this.renderEmptyDate}
        rowHasChanged={this.rowHasChanged}
        showClosingKnob={true}
      /> */}
      {/* <Text>Hello</Text> */}
      <Agenda
        items={items}
        // renderItem={(item) => {
        //   return renderItem(item);
        // }}
        loadItemsForMonth={loadItems}
        // selected={'2022-09-03'}
        // pastScrollRange={0}
        // futureScrollRange={0}
        //renderEmptyData={renderEmptyItem}
        // renderEmptyDate={renderEmptyDate}
        //theme={calendarTheme}
      />
    </View>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});

export default Container;
