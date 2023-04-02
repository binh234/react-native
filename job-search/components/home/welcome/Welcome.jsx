import React, { useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./welcome.style";
import { icons, SIZES } from "../../../constants";

const jobTypes = ["Full-time", "Part-time", "Contractor"];

const Welcome = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeJobType, setActiveJobType] = useState(jobTypes[0]);

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Welcome</Text>
        <Text style={styles.welcomeMessage}>Find your perfect jobs</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChange={(text) => setSearchTerm(text)}
            placeholder='What are you looking for?'
          />
        </View>
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => {
            if (searchTerm) {
              router.push(`/search/${searchTerm}`);
            }
          }}
        >
          <Image
            source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item);
                router.push(`/search/${item}`);
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
