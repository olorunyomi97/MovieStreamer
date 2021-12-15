import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, FlatList, TouchableWithoutFeedback, Image, ImageBackground, Animated,ScrollView, Touchable } from 'react-native';
import { dummyData, COLORS, SIZES, FONTS, icons, images } from '../constants';
import { Profiles, ProgressBar } from '../components';


const Home = ({ navigation }) => {

    const newSeasonScrollX =  React.useRef(new Animated.Value(0)).current

    // FUNCTION FOR RENDERING THE HEADER // 
    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: SIZES.padding
                }}
            >
                {/* PROFILE */}
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 50,
                        height: 50
                    }}
                    onPress={() => console.log('profile')}
                >
                    <Image
                        source={images.profile_photo}
                        style={{
                            width:40,
                            height:40,
                            borderRadius:20
                        }}
                    />
                </TouchableOpacity>

                {/* SCREEN MIRRORING */}
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 50,
                        height: 50
                    }}
                    onPress={() => console.log('Screen Mirror')}
                >
                    <Image
                        source={icons.airplay}
                        style={{
                            width:25,
                            height:25,
                            tintColor: COLORS.primary
                        }}
                    />
                </TouchableOpacity>


            </View>
        )
    }

     // FUNCTION FOR RENDERING THE BODY // 
     function renderNewSeasonSection() {
        return (
            <Animated.FlatList 
                horizontal
                pagingEnabled
                snapToAlignment="center"
                snapToInterval={SIZES.width}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                decelerationRate={0}
                contentContainerStyle={{
                    marginTop: SIZES.radius
                }}
                data={dummyData.newSeason}
                keyExtractor={item => `$item.id`}
                onScroll={Animated.event([
                    {nativeEvent: {contentOffset: {x:newSeasonScrollX}}}
                ], {useNativeDriver: false})}
                renderItem={({item, index}) => {
                    return (
                        <TouchableWithoutFeedback
                            onPress={() => navigation.navigate('MovieDetail', { selectedMovie: item })}
                        >
                            <View
                                style={{
                                    width: SIZES.width,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                {/* Thumbnail */}
                                <ImageBackground
                                    source={item.thumbnail}
                                    resizeMode="cover"
                                    style={{
                                        width: SIZES.width * 0.85,
                                        height: SIZES.width * 0.85,
                                        justifyContent: 'flex-end'
                                    }}
                                    imageStyle={{
                                        borderRadius : 30
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            height: 60,
                                            width: '100%',
                                            marginBottom: SIZES.radius,
                                            paddingHorizontal:SIZES.radius,
                                            // backgroundColor:COLORS.primary
                                        }}
                                    >
                                        {/* PLAY NOW */}
                                        <View
                                            style={{
                                                flex:1,
                                                flexDirection:'row',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <View
                                                style={{
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: 20,
                                                    backgroundColor: COLORS.transparentWhite
                                                }}
                                            >
                                                <Image
                                                    source={icons.play}
                                                    resizeMode='contain'
                                                    style={{
                                                        width: 15,
                                                        height: 15,
                                                        tintColor: COLORS.white
                                                    }}
                                                />
                                            </View>
                                                <Text
                                                    style={{
                                                        marginLeft: SIZES.base,
                                                        color: COLORS.white,
                                                        ...FONTS.h3
                                                    }}
                                                >
                                                    Play Now
                                                </Text>
                                        </View>

                                        {/* STILL WATCHING */}
                                        {
                                            item.stillWatching.length > 0 &&
                                            <View
                                                style={{
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                <Text style={{color: COLORS.white, ...FONTS.h4}}>Still Watching</Text>
                                                <Profiles 
                                                    profiles={item.stillWatching}
                                                />
                                            </View>
                                        }
                                    </View>
                                </ImageBackground>

                            </View>
                        </TouchableWithoutFeedback>
                    )
                }}
            />
            
        )
    }

    // FUNCTION FOR RENDERING THE ANIMATION DOTS
    function renderDots() {
        const dotPosition = Animated.divide(newSeasonScrollX, SIZES.width)
        return (
            <View
                style={{marginTop: SIZES.padding,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
                }}
            >
                {dummyData.newSeason.map((item, index) => {

                    const opacity = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: 'clamp'
                    })

                    const dotWidth = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [6, 20, 6],
                        extrapolate: 'clamp'
                    })
                    const dotColor = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [COLORS.lightGray, COLORS.primary, COLORS.lightGray],
                        extrapolate: 'clamp'
                    })

                    return (
                        <Animated.View
                            key={`dot-${index}`}
                            opacity={opacity}
                            style={{
                                borderRadius: SIZES.radius,
                                marginHorizontal: 3,
                                width: 6,
                                height: 6,
                                backgroundColor: COLORS.primary
                            }}
                        />
                    )
                })
    
                }
            </View>
        )
    }

    // FUNCTION FOR CONTINUE WATCHING SECTION
    function renderContinueWatchingSection() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding
                }}
            >
                {/* HEADER */}
                <View
                    style={{
                        flexDirection: 'row',
                        paddingHorizontal: SIZES.padding,
                        alignItems:'center'
                    }}
                >
                    <Text style={{flex: 1, color: COLORS.white, ...FONTS.h2}}>Continue Watching</Text>
                    <Image 
                        source={icons.right_arrow}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.primary
                        }}
                    />
                </View>

                {/* MOVIE LIST */}
                <FlatList 
                    horizontal
                    showsVerticalScrollIndicator
                    contentContainerStyle={{
                        marginTop: SIZES.padding
                    }}
                    data={dummyData.continueWatching}
                    keyExtractor={item=> `${item.id}`}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableWithoutFeedback
                                onPress={()=> navigate.navigate('MovieDetail', {selectedMovie: item })}
                            >
                                <View
                                    style={{
                                        marginLeft: index == 0 ? SIZES.padding : 20,
                                        marginRight: index == dummyData.continueWatching.length - 1 ? SIZES.padding : 0
                                    }}
                                >
                                    {/* MOVIE THUMBNAIL */}
                                    <Image 
                                        source={item.thumbnail}
                                        resizeMode="cover"
                                        style={{
                                            width: SIZES.width / 3,
                                            height: (SIZES.width / 3) + 60,
                                            borderRadius: 20
                                        }}
                                    />

                                    {/* MOVIE TITLE */}
                                    <Text style={{marginTop:SIZES.base, color:COLORS.white, ...FONTS.h4}}>{item.name}</Text>

                                    {/* PROGRESS BAR */}
                                    <ProgressBar 
                                        containerStyle={{
                                            marginTop: SIZES.radius
                                        }}
                                        barStyle={{
                                            height: 3
                                        }}
                                        barPercentage={item.overallProgress}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    }}
                />
            </View>
        )
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.black
            }}
        >
            {renderHeader()}

            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 100
                }}
            >
                {renderNewSeasonSection()}

                {renderDots()}

                {renderContinueWatchingSection()}
            </ScrollView>


        </SafeAreaView>
    )
}

export default Home;