import * as React from 'react';
import { Text, View, SafeAreaView, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import firestore from '@react-native-firebase/firestore';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class App extends React.Component {

     constructor(props, {navigation, route}) {
         //console.log(' LOOK HERE   ',props.kuvat)
         super(props);
         this.state = {
             activeIndex: 0,
             carouselItems: this.props.kuvat 
        }
     }


    _renderItem({ item, index }) {
        return (
            <View style={{
                backgroundColor: 'floralwhite',
                flex: 1,
                
            }}>
                <Image
                style={{width: '100%', height: '100%'}}
                source={{ uri: item}}
                /> 
            </View>

        )
    }

    

    render() {
        return (
            <SafeAreaView style={{ flex: 1, paddingTop: 0, }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                    <Carousel
                        layout={"default"}
                        ref={ref => this.carousel = ref}
                        data={this.props.kuvat}
                        //data={this.props.kuvat}
                        sliderWidth={viewportWidth}
                        itemWidth={(viewportWidth*0.5)}
                        sliderHeight={viewportHeight}
                        renderItem={this._renderItem}
                        onSnapToItem={index => this.setState({ activeIndex: index })} />
                </View>
            </SafeAreaView>
        );
    }
}