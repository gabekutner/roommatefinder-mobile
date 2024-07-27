import React, {useState, useRef, useEffect} from "react";
import {
  Animated,
  LayoutAnimation,
} from "react-native";
import {useTheme} from "react-native-paper";
import Empty from "../../../components/Empty";
import useStore from "../../../zustand/store";
import { DeckSwiper } from "./deck.view";
import useBearStore from "../../../libs/store";
import { CardSwipeContainer } from "../Card";

/*global console */
/*eslint no-undef: "error"*/

function DeckView() {

  const theme = useTheme();

  const opacity = useRef(new Animated.Value(0)).current;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const swipeProfiles = useBearStore((state) => state.swipeProfiles)

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const fetchData = async (page) => {
    try {
      const response = await swipeProfiles(page);
      if (response.status === 404) {
        const response = await swipeProfiles(1);
        const userData = await response.data.results;
        setData(userData);
      } else {
        const userData = await response.data.results;
        setData(userData);
      }
    } catch (error) {
      console.log(error);
    };
  };

  const removeItem = () => {
    setData((prevData) => {
      // remove the first item from the previous data array
      const newData = prevData.slice(1);
      LayoutAnimation.easeInEaseOut();
      // if newData.length is 0, we ran out of users so fetch
      // more data on the next page
      if (newData.length === 0) {
        setPage((prevPage) => prevPage + 1);
      }
      return newData;
    });
  };

  if (data.length === 0) {
    return (
      <Empty
        icon="hourglass"
        message="You ran out of people."
      />
    );
  };

  return (
    <DeckSwiper theme={theme} opacity={opacity}>
      {data.length !== 0 ? (
        <>
          {data.map((item, index) => (
            <CardSwipeContainer 
              theme={theme}
              key={item.id}
              item={item}
              data={data}
              index={index}
              removeItem={removeItem}
            />
          ))}
        </>
      ) : null}
    </DeckSwiper>
  );
};

export {DeckView};