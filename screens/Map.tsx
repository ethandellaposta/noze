import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import * as Location from 'expo-location';
import request from '../utils/request';

export default function Map({ navigation }: RootTabScreenProps<'Map'>) {
  const [posts, setPosts] = useState<any[]>([]);
  const [location, setLocation] = useState<Location.LocationObject>();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      const posts = await request('posts')
      setPosts(posts);
    })();
  }, [])
 
  if (location && posts) {
    let latitude, longitude;
    latitude = location.coords.latitude;
    longitude = location.coords.longitude

    return (
      <View>
        <View style={styles.map}>
          <MapView 
            initialRegion={{
              latitude,
              longitude,
              latitudeDelta: 1,
              longitudeDelta: 1
            }}
            style={styles.map}
          >
            <>
              <Marker
                coordinate={{
                  latitude,
                  longitude
                }}
                title={"You"}
                description={"Where you are"}
              />
              {posts.map(post => {
                <Marker
                  coordinate={{
                    latitude: post.location.x,
                    longitude: post.location.y
                  }}
                  title={post.items[0].data}
                />
              })}
            </>
          </MapView>
        </View>
      </View>
    );
  } else {
    return <Text>Loading ...</Text>
  }
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
