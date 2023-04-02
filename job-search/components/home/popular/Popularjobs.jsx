import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import useSWR from "swr";

import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import fetcher, { getJSearchOptions } from "../../../utils";

const Popularjobs = () => {
  const router = useRouter();
  const { data, isLoading, error } = useSWR(
    getJSearchOptions("search", {
      query: "React developer",
      num_pages: 1,
    }),
    fetcher
  );

  const [selectedJob, setSelectedJob] = useState();

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={(item, index) => item?.job_id || index}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
            nestedScrollEnabled
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
