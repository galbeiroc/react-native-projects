import { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useRouter, Stack, useSearchParams } from 'expo-router';
import axios from 'axios';

import { ScreenHeaderBtn } from '../../components';
import NearbyJobCard from '../../components/common/cards/nearby/NearbyJobCard';
import { COLORS, icons, SIZES } from '../../constants';
import styles from '../../styles/search';
import { rapiApiKey } from '../../hook/useFetch';

const JobSearch = () => {
  const params = useSearchParams();
  const router = useRouter();

  const [searchResult, setSearchResult] = useState([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [page, setPage] = useState(1);

  const handleSearch = async() => {
    setIsSearchLoading(true);
    setSearchResult([]);

    try {
      const options = {
        method: "GET",
        url: `https://jsearch.p.rapidapi.com/search`,
        headers: {
            "X-RapidAPI-Key": rapiApiKey,
            "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
        params: {
            query: params.id,
            page: page.toString(),
        },
      };

      const response = await axios.request(options);

      setSearchResult(response.data.data);
    } catch (error) {
      setSearchError(error);
    } finally {
      setIsSearchLoading(false);
    }
  };

  const handlePagination = (direction) => {
    if (direction === 'left' && page > 1) {
      setPage(page => page - 1);
      handleSearch();
    }
    if (direction === 'right') {
      setPage(page => page + 1);
      handleSearch();
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension='60%'
              handlePress={() => router.back()}
            />
          ),
          headerTitle: ''
        }}
      />

      <FlatList
        data={searchResult}
        renderItem={({ item }) => (
          <NearbyJobCard
            job={item}
            handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
          />
        )}
        keyExtractor={item => item.job_id}
        contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
              <Text style={styles.searchTitle}>{params.id}</Text>
              <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
            </View>
            <View>
              {isSearchLoading ? (
                <ActivityIndicator size='large' color={COLORS.primary} />
              ) : searchError && (
                <Text>Opp something went wrong</Text>
              )}
            </View>
          </>
        )}
        ListFooterComponent={() => (
          <View style={styles.footerContainer}>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination('left')}
            >
              <Image
                source={icons.chevronLeft}
                style={styles.paginationImage}
                resizeMode='contain'
              />
            </TouchableOpacity>
            <View style={styles.paginationTextBox}>
              <Text style={styles.paginationText}>{page}</Text>
            </View>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination('right')}
            >
              <Image
                source={icons.chevronRight}
                style={styles.paginationImage}
                resizeMode='contain'
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default JobSearch;
