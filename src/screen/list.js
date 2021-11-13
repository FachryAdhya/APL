import React, {useState,useEffect} from 'react';
import { useIsFocused } from '@react-navigation/native';
import { View, SafeAreaView, Text, FlatList, TouchableOpacity, TextInput, ActivityIndicator, Modal,Pressable } from 'react-native';
import filter from 'lodash.filter';
import styles from '../styles';
import { useSelector,useDispatch } from 'react-redux';
import { getProvinsi } from '../store/actions/apiActions';

const ListScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [dataModal, setDataModal] = useState([])
    const [query, setQuery] = useState('');
    const [fullData, setFullData] = useState([]);
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(true);
    const [isRefresh, setIsRefresh] = useState(false)
    const dispatch = useDispatch()
    const provinsi = useSelector(state=>state.indonesia.provinsi);
    const [data, setData] = useState(provinsi);

    useEffect(()=>{
        dispatch(getProvinsi());
    }, [dispatch]);

    useEffect(()=>{
        setQuery('')
        setData(provinsi)
        setFullData(provinsi)
        setLoading(false)
    }, [isFocused,provinsi]);

    const getDataProvinsi = () => {
        setLoading(true)
        getProvinsi()
        setData(provinsi)
        setFullData(provinsi)
        setLoading(false)
        setIsRefresh(false)
    }

    const onRefresh = () => {
        setQuery('')
        setIsRefresh(true)
        setLoading(true)
        getDataProvinsi();
    }

    const openModal = (id) =>{
        setLoading(true)
        for(let i = 0; i<fullData.length;i++){
            if(fullData[i].key === id){
                setDataModal(fullData[i])
                setLoading(false)
                setModalVisible(!modalVisible)
                return;
            }
        }
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

    const formatNumber = inputNumber => {
        let formetedNumber=(Number(inputNumber)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        let splitArray=formetedNumber.split('.');
        if(splitArray.length>1){
        formetedNumber=splitArray[0];
        }
        return(formetedNumber);
    };

    function clearInput(){
        setQuery('')
        fetchDataProvinsi()
    }

    function renderHeader(){
        return(
            <View>
                <Text style={[styles.title, styles.textLight]}>Data COVID-19 Provinsi</Text>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    blurOnSubmit={false}
                    autoFocus={true}
                    clearButtonMode="always"
                    value={query}
                    onChangeText={queryText => handleSearch(queryText)}
                    placeholder="Search"
                    style={[styles.listSearch]}
                />
                 <Pressable onPress={clearInput}>
                    <Text style={[styles.clearInput,styles.bgDark,styles.textLight]}>X</Text>
                </Pressable>
            </View>
        )
    }

    function renderEmpty(){
        return(
            <View>
                <Text style={[styles.listEmpty, styles.textLight]}>No data available.</Text>
            </View>
        )
    }

    const handleSearch = text => {
            const formattedQuery = text.toLowerCase();
            const filteredData = filter(fullData, provinsi => {
                return contains(provinsi, formattedQuery);
            });
            setData(filteredData);
            setQuery(text);
    };

    const contains = ({key}, query) => {
        if (key.toLowerCase().includes(query)) {
            return true;
        }
        return false;
    };

    return (
        <SafeAreaView style={[styles.container,styles.bgDark]}>
            <View style={[styles.fullWidth]}>
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity 
                                        style={styles.card} 
                                        onPress={() => {
                                            openModal(item.key);
                                        }} 
                                >
                                    <View style={[styles.cardContent]}>
                                        <Text style={[styles.cardTitle,styles.textLight]}>{item.key}</Text>
                                    </View>
                                    <View style={[styles.cardContent]}>
                                        <Text style={[styles.cardCount,styles.textLight]}>
                                            {`Positif:
                                            ${formatNumber(item.jumlah_kasus)}`}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                    }}
                    keyExtractor={(item) => item.key}
                    onRefresh={onRefresh}
                    refreshing={isRefresh}
                    ListHeaderComponent={renderHeader}
                    ListEmptyComponent={renderEmpty}    
                >
                </FlatList>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={[styles.modalTitle,styles.textDark]}>{modalVisible? dataModal.key : '-'}</Text>
                            <Text style={[styles.modalText,styles.textDark]}>{modalVisible? 'Kasus Positif: ' + formatNumber(dataModal.jumlah_kasus) : '-'}</Text>
                            <Text style={[styles.modalText,styles.textDark]}>{modalVisible? 'Kasus Sembuh: ' + formatNumber(dataModal.jumlah_sembuh) : '-'}</Text>
                            <Text style={[styles.modalText,styles.textDark]}>{modalVisible? 'Kasus Meninggal: ' + formatNumber(dataModal.jumlah_meninggal) : '-'}</Text>
                            <Text style={[styles.modalText,styles.textDark]}>{modalVisible? 'Sedang Dirawat: ' + formatNumber(dataModal.jumlah_dirawat) : '-'}</Text>
                            <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textLight}>Close</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    )
}

export default ListScreen;