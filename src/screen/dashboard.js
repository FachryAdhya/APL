import React, {useState,useEffect} from 'react';
import { View, SafeAreaView, Text, ScrollView, ActivityIndicator, RefreshControl} from 'react-native';
import styles from '../styles';
import axios from 'axios';

const DashboardScreen = () => {

    const urlGetDataIndonesia = 'https://api.kawalcorona.com/indonesia/';
    const [dataIndonesia, setDataIndonesia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isRefresh, setIsRefresh] = useState(false)

    const fetchDataIndonesia = async () => {
        setLoading(true)
        const response= await axios.get(urlGetDataIndonesia)
        const {data,status} = response
        if (status === 200 && data){
            setDataIndonesia(data[0]);
            setLoading(false)
            setIsRefresh(false)
        }
    };

    useEffect(() => {
        fetchDataIndonesia();
    }, []);

    const onRefresh = () => {
        setIsRefresh(true)
        fetchDataIndonesia();
    }

    if (loading){
        return (
            <SafeAreaView style={[styles.fill,styles.bgLoading]}>
                <View style={[styles.fill, styles.center,styles.bgLoading]}>
                    <ActivityIndicator size={'large'} />
                </View>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={[styles.container,styles.bgDark]}>
            <ScrollView 
                refreshControl={
                    <RefreshControl
                        onRefresh={onRefresh}
                        refreshing={isRefresh}    
                    />
                }
                style={[styles.sView]}
            >
                <Text style={[styles.title, styles.textLight]}>Data COVID-19 {dataIndonesia.name}</Text>
                <View style={[styles.center]}>
                    <View style={[styles.box,styles.bgRed,styles.borderDark]}>
                        <Text style={[styles.boxTitle,styles.textLight]}>Positif</Text>
                        <Text style={[styles.boxValue,styles.textLight]}>{dataIndonesia.positif}</Text>
                    </View>
                    <View style={[styles.box,styles.bgGreen,styles.borderDark]}>
                        <Text style={[styles.boxTitle,styles.textDark]}>Sembuh</Text>
                        <Text style={[styles.boxValue,styles.textDark]}>{dataIndonesia.sembuh}</Text>
                    </View>
                    <View style={[styles.box,styles.bgBlue,styles.borderDark]}>
                        <Text style={[styles.boxTitle,styles.textDark]}>Sedang Dirawat</Text>
                        <Text style={[styles.boxValue,styles.textDark]}>{dataIndonesia.dirawat}</Text>
                    </View>
                    <View style={[styles.box,styles.bgDarkRed,styles.borderDark]}>
                        <Text style={[styles.boxTitle,styles.textLight]}>Meninggal</Text>
                        <Text style={[styles.boxValue,styles.textLight]}>{dataIndonesia.meninggal}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default DashboardScreen;