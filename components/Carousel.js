import * as React from 'react';
import { Text, View, SafeAreaView, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import styles from '../styles';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            carouselItems: [
                {
                    title: "Item 1",
                    text: "Text 1",
                },
                {
                    title: "Item 2",
                    text: "Text 2",
                },
                {
                    title: "Item 3",
                    text: "Text 3",
                },
                {
                    title: "Item 4",
                    text: "Text 4",
                },
                {
                    title: "Item 5",
                    text: "Text 5",
                },
            ]
        }
    }

    _renderItem({ item, index }) {
        return (
            <View style={styles.carouselBackground}>
                <Text style={styles.carouselFontSize}>{item.title}</Text>
                <Text>{item.text}</Text>
            </View>

        )
    }

    render() {
        return (
            <SafeAreaView style={styles.carouselSafeAreaView}>
                <View style={styles.carouselLayout}>
                    <Carousel
                        layout={"default"}
                        ref={ref => this.carousel = ref}
                        data={this.state.carouselItems}
                        sliderWidth={viewportWidth}
                        itemWidth={viewportWidth}
                        sliderHeight={viewportHeight}
                        renderItem={this._renderItem}
                        onSnapToItem={index => this.setState({ activeIndex: index })} />
                </View>
            </SafeAreaView>
        );
    }
}