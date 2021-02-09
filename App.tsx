import React from "react";
import { SafeAreaView, Text, Animated, Easing, FlatList } from "react-native";

export default function App() {
  const numbers = Array(50).fill("*");
  const DATA = numbers.map((_n, i) => {
    return {
      id: Number(i).toString(),
      title: `Item ${i}`,
    };
  });

  const [visibleItems, setVisibleItems] = React.useState<{
    [key: string]: any;
  }>([]);

  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 1 });
  const onViewChangeRef = React.useRef(({ viewableItems }: any) => {
    setVisibleItems(viewableItems);
  });

  const renderItem = (prop: { item: { id: string; title: string } }) => {
    return (
      <ListItem
        pos={parseInt(prop.item.id)}
        title={prop.item.title}
        visibleItems={visibleItems}
      />
    );
  };

  return (
    <>
      <SafeAreaView>
        <FlatList
          data={DATA}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          viewabilityConfig={viewConfigRef.current}
          onViewableItemsChanged={onViewChangeRef.current}
        />
      </SafeAreaView>
    </>
  );
}

function ListItem(props: {
  title: string;
  pos: number;
  visibleItems: { [key: string]: any };
}) {
  const [isVisible, setVisible] = React.useState(false);
  const opacityAnim = React.useRef(new Animated.Value(0)).current;
  const transformAnim = React.useRef(new Animated.Value(50)).current;
  const DURATION = 500;

  React.useEffect(() => {
    Animated.timing(transformAnim, {
      duration: DURATION,
      toValue: isVisible ? 0 : 50,
      easing: Easing.linear,
      useNativeDriver: true,
      delay: props.pos === 0 ? undefined : 10 * props.pos,
    }).start();

    Animated.timing(opacityAnim, {
      duration: DURATION,
      toValue: isVisible ? 1 : 0,
      easing: Easing.linear,
      useNativeDriver: true,
      delay: props.pos === 0 ? undefined : 10 * props.pos,
    }).start();
  }, [isVisible]);

  React.useEffect(() => {
    for (let i = 0; i < props.visibleItems.length; i++) {
      const item = props.visibleItems[i];

      if (item.index === props.pos) {
        setVisible(true);
        break;
      } else {
        setVisible(false);
      }
    }
  }, [props.visibleItems]);

  return (
    <Animated.View
      style={{
        padding: 20,
        borderBottomColor: "lightgray",
        borderBottomWidth: 1,
        borderStyle: "solid",
        opacity: opacityAnim,
        transform: [{ translateY: transformAnim }],
      }}
    >
      <Text>{props.title}</Text>
    </Animated.View>
  );
}
