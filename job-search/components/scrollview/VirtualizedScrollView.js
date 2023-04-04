import { FlatList } from "react-native";

export default VirtualizedScrollView = props => {
    return (
      <FlatList
        {...props}
        data={[]}
        keyExtractor={(e, i) => 'dom' + i.toString()}
        ListEmptyComponent={null}
        renderItem={null}
        ListHeaderComponent={() => (
          <>{props.children}</>
        )}
      />
    );
  };