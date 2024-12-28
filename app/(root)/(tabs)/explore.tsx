import { Cards, FeaturedCards } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { useAppwrite } from "@/lib/useAppwrite";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Text, View , Image, TouchableOpacity, ScrollView, FlatList , Button, ActivityIndicator} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



// We have scrollview for scrolling 
// We also have what is called FlatList for scrolling list of items , Note: one can't have two flat list in different direction on the same screen


export default function Explore() {



  const params = useLocalSearchParams<{query?: string; filter?: string  }>();


  const {data: properties, loading, refetch} = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 20
    },
    skip: true,
  })

  const handleCardPress = (id: string) => router.push(`/properties/${id}`)


  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 20
    })
  }, [params.query, params.filter])
  
  return (
    <SafeAreaView className="bg-white  h-full">

      <FlatList 
        data={properties} 
          renderItem={({item}) => <Cards item={item} onPress={() => handleCardPress(item.$id)} /> } 
          keyExtractor={(item) => item.$id}
          numColumns={2}
          contentContainerClassName="pb-32"
          columnWrapperClassName="flex gap-5 px-5"
          ListEmptyComponent={
            loading ? (
              <ActivityIndicator size='large' className="text-primary-300 mt-5" />
            ): <NoResults />
          }
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View className='px-5'>
              <View className="flex flex-row items-center justify-between mt-5">
                <TouchableOpacity onPress={() => router.back()} className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center">
                  <Image source={icons.backArrow} className="size-5" />

                </TouchableOpacity>

                <Text className="text-base mr-2 font-rubik-medium text-center text-black-300">Search for Your Ideal Home</Text>

                <Image source={icons.bell} className="w-6 h-6" />
              </View>


              <Search />

              <View className="mt-5">
                <Filters />
                <Text className="text-xl font-rubik-bold mt-5 text-black-300">
                  Found {properties?.length} properties
                </Text>
              </View>
            </View>
          }
      />

      

    </SafeAreaView>
  );
}

      
        

