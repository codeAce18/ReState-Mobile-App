import { settings } from '@/constants/data'
import icons from '@/constants/icons'
import images from '@/constants/images'
import { logout } from '@/lib/appwrite'
import { useGlobalContext } from '@/lib/global-provider'
import { View, Text, ScrollView , Image, TouchableOpacity, ImageSourcePropType, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type SettingsItemsProps = {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingsItems = ({icon , title , onPress , textStyle, showArrow = true}: SettingsItemsProps ) => (
  <TouchableOpacity className='flex flex-row items-center justify-between py-3' onPress={onPress}>
    <View className='flex flex-row items-center gap-3'>
      <Image source={icon} className='size-6' />
      <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>{title}</Text>
    </View>

    {showArrow && <Image source={icons.rightArrow} className='size-5' />}
  </TouchableOpacity>
)

const Profile = () => {

  const {user , refetch} = useGlobalContext();

  const handleLogout = async () => {
    const result = await logout();

    if (result) {
      Alert.alert("Logged out successfully");
      
      refetch({});
    }else {
      Alert.alert("Failed to logout");
    }
  }

  return (
    <SafeAreaView className='bg-white h-full'>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName='pb-32 px-5'

      >
        <View className='flex flex-row items-center justify-between mt-5'>
          <Text className='text-xl font-rubik-bold'>Profile</Text>
          <Image  source={icons.bell}  className='size-5'/>
        </View>

        <View className='flex flex-row justify-center  mt-5'>
          <View className='flex flex-col items-center relative mt-5'>

            <Image 
              source={images.avatar}
              className='size-44 relative rounded-full' 
            />
              

            <TouchableOpacity className='absolute bottom-11 right-2'>
              <Image source={icons.edit} className='size-9' />
            </TouchableOpacity>

            <Text className='text-2xl font-rubik-bold mt-2'>{user?.name}</Text>
          </View>
        </View>

        <View className='flex flex-col mt-10'>
          <SettingsItems icon={icons.calendar} title='My Bookings'/>
          <SettingsItems icon={icons.wallet} title='Payments'/>
        </View>

        <View className='flex flex-col mt-5 border-t pt-5 border-primary-200'>
          {settings.slice(2).map((item , index) => (
            <SettingsItems key={index} {...item} />
          ))}
        </View>

        <View className='flex flex-col mt-5 border-t pt-5 border-primary-200'>
          <SettingsItems icon={icons.logout} title='Logout' onPress={handleLogout} textStyle='text-danger' showArrow={false}/>
        </View>
      </ScrollView>

    </SafeAreaView>

    
  )
}

export default Profile