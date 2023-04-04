import React from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import useSWR from "swr";

import styles from "./nearbyjobs.style";
import { COLORS, SIZES } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import fetcher, { getJSearchOptions } from "../../../utils";

const Nearbyjobs = () => {
  const router = useRouter();
  const { data, isLoading, error } = useSWR(
    getJSearchOptions("search", {
      query: "React developer",
      num_pages: 1,
    }),
    fetcher
  );
  // console.log(data)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <NearbyJobCard
                job={item}
                handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
              />
            )}
            keyExtractor={(item) => `nearby-job-${item.job_id}`}
            contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
          />
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
