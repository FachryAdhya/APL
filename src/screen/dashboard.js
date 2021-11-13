import React, {useState,useEffect} from 'react';
import { View, SafeAreaView, Text, ScrollView, ActivityIndicator, RefreshControl} from 'react-native';
import styles from '../styles';
import { useSelector,useDispatch } from 'react-redux';
import { getIndonesia } from '../store/actions/apiActions';

const DashboardScreen = () => {
    const [loading, setLoading] = useState(true);
    const [isRefresh, setIsRefresh] = useState(false)
    const dispatch = useDispatch()
    const indonesia = useSelector(state=>state.indonesia);
    const [data, setData] = useState(indonesia);

    useEffect(()=>{
        dispatch(getIndonesia());
    }, [dispatch]);

    useEffect(()=>{
        setData(indonesia);
        setLoading(false)
    }, [indonesia]);

    const getDataIndonesia = () => {
        setLoading(true)
        dispatch(getIndonesia())
        setData(indonesia);
        setLoading(false)
        setIsRefresh(false)
    }

    const onRefresh = () => {
        setIsRefresh(true)
        getDataIndonesia();
        setLoading(false)
    }

    const formatNumber = inputNumber => {
        let formetedNumber=(Number(inputNumber)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        let splitArray=formetedNumber.split('.');
        if(splitArray.length>1){
        formetedNumber=splitArray[0];
        }
        return(formetedNumber);
    };

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
                <Text style={[styles.title, styles.textLight]}>Data COVID-19 Indonesia</Text>
                <View style={[styles.center]}>
                    <View style={[styles.box,styles.bgRed,styles.borderDark]}>
                        <Text style={[styles.boxTitle,styles.textLight]}>Positif</Text>
                        <Text style={[styles.boxValue,styles.textLight]}>{formatNumber(data.indonesia.jumlah_positif)}</Text>
                    </View>
                    <View style={[styles.box,styles.bgGreen,styles.borderDark]}>
                        <Text style={[styles.boxTitle,styles.textDark]}>Sembuh</Text>
                        <Text style={[styles.boxValue,styles.textDark]}>{formatNumber(data.indonesia.jumlah_sembuh)}</Text>
                    </View>
                    <View style={[styles.box,styles.bgBlue,styles.borderDark]}>
                        <Text style={[styles.boxTitle,styles.textDark]}>Sedang Dirawat</Text>
                        <Text style={[styles.boxValue,styles.textDark]}>{formatNumber(data.indonesia.jumlah_dirawat)}</Text>
                    </View>
                    <View style={[styles.box,styles.bgDarkRed,styles.borderDark]}>
                        <Text style={[styles.boxTitle,styles.textLight]}>Meninggal</Text>
                        <Text style={[styles.boxValue,styles.textLight]}>{formatNumber(data.indonesia.jumlah_meninggal)}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default DashboardScreen;