import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles';

export default class AboutScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { id: 1, name: "Andika", position: "Technical Lead", image: "https://bootdey.com/img/Content/avatar/avatar7.png", part: "Lead"},
                { id: 2, name: "Fachry", position: "Senior Programmer", image: "https://bootdey.com/img/Content/avatar/avatar1.png", part: "UI" },
                { id: 3, name: "Fikih", position: "Senior Programmer", image: "https://bootdey.com/img/Content/avatar/avatar6.png", part: "Back-end" },
                { id: 4, name: "Irfan", position: "Senior Programmer", image: "https://bootdey.com/img/Content/avatar/avatar5.png", part: "Back-end" },
                { id: 5, name: "Rahardian", position: "Senior Programmer", image: "https://bootdey.com/img/Content/avatar/avatar4.png", part: "UI" },
            ]
        };
    }

    clickEventListener(item) {
        Alert.alert(item.name, 'Part : ' + item.part)
    }

    render() {
        return (
            <SafeAreaView style={[styles.container, styles.bgDark]}>
                <FlatList style={[styles.listDev, styles.bgDark]}
                    contentContainerStyle={styles.listContainerDev}
                    data={this.state.data}
                    horizontal={false}
                    numColumns={2}
                    keyExtractor={(item) => {
                        return item.id;
                    }}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.cardDev}>
                                <View style={styles.cardDevHeader}>
                                    <Image style={styles.icon} source={{ uri: "https://img.icons8.com/flat_round/64/000000/hearts.png" }} />
                                </View>
                                <Image style={styles.userImage} source={{ uri: item.image }} />
                                <View style={styles.cardDevFooter}>
                                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                                        <Text style={styles.devName}>{item.name}</Text>
                                        <Text style={styles.devPosition}>{item.position}</Text>
                                        <TouchableOpacity style={styles.devFollowButton} onPress={() => this.clickEventListener(item)}>
                                            <Text style={styles.devFollowButtonText}>Detail</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )
                    }} 
                    ListHeaderComponent={() => <Text style={[styles.title, styles.textLight]}>About Developer</Text>}/>
            </SafeAreaView>
        );
    }
}