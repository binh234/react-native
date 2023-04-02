import React, { useCallback, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useSWR from "swr";
import fetcher, { getJSearchOptions } from "../../utils";

const tabs = ["About", "Qualification", "Responsibilities"];

const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const { data, isLoading, error, mutate } = useSWR(
    getJSearchOptions("job-details", {
      job_id: params.id,
    }),
    fetcher
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    mutate();
    setRefreshing(false);
  });

  const displayTabContent = useCallback(() => {
    switch (activeTab) {
      case tabs[0]:
        return (
          <JobAbout info={data[0].job_description ?? "No data provided"} />
        );
      case tabs[1]:
        return (
          <Specifics
            title={tabs[1]}
            points={data[0].job_hightlights?.Qualifications ?? ["N/A"]}
          />
        );
      case tabs[2]:
        return (
          <Specifics
            title={tabs[2]}
            points={data[0].job_hightlights?.Responsibilities ?? ["N/A"]}
          />
        );
      default:
        break;
    }
  }, [activeTab]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension='60%'
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension='60%' />
          ),
          headerTitle: "",
        }}
      />
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size='large' color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>Can't find this job</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />
              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>
        <JobFooter
          url={
            data[0]?.job_google_link ??
            "https://careers.google.com/jobs/results"
          }
        />
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
