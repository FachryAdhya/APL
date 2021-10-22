import React, {useState,useEffect} from 'react';
import { useIsFocused } from '@react-navigation/native';
import { View, SafeAreaView, Text, FlatList, TouchableOpacity, TextInput, ActivityIndicator, Modal,Pressable } from 'react-native';
import filter from 'lodash.filter';
import styles from '../styles';
import axios from 'axios';

const ListScreen = () => {
    const urlGetDataProvinsi = 'https://api.kawalcorona.com/indonesia/provinsi/';
    const [dataProvinsi, setDataProvinsi] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isRefresh, setIsRefresh] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [dataModal, setDataModal] = useState([])
    const [query, setQuery] = useState('');
    const [fullData, setFullData] = useState([]);
    const isFocused = useIsFocused();
    
    const fetchDataProvinsi = async () => {
        const response= await axios.get(urlGetDataProvinsi)
        const {data,status} = response
        if (status === 200 && data){
            setDataProvinsi(data);
            setFullData(data);
            setLoading(false)
            setIsRefresh(false)
        }
    };

    useEffect(()=>{
        setQuery('')
        fetchDataProvinsi()
    },[isFocused])

    const onRefresh = () => {
        setQuery('')
        setIsRefresh(true)
        setLoading(true)
        fetchDataProvinsi();
    }

    const openModal = (id) =>{
        setLoading(true)
        for(let i = 0; i<fullData.length;i++){
            if(fullData[i].attributes.Kode_Provi === id){
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
            setDataProvinsi(filteredData);
            setQuery(text);
    };

    const contains = ({ attributes }, query) => {
        const { Provinsi } = attributes;

        if (Provinsi.toLowerCase().includes(query)) {
            return true;
        }

        return false;
    };

    return (
        <SafeAreaView style={[styles.container,styles.bgDark]}>
            <View style={[styles.fullWidth]}>
                <FlatList
                    data={dataProvinsi}
                    renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity 
                                        style={styles.card} 
                                        onPress={() => {
                                            openModal(item.attributes.Kode_Provi);
                                        }} 
                                >
                                    <View style={[styles.cardContent]}>
                                        <Text style={[styles.cardTitle,styles.textLight]}>{item.attributes.Provinsi}</Text>
                                    </View>
                                    <View style={[styles.cardContent]}>
                                        <Text style={[styles.cardCount,styles.textLight]}>
                                            {`Positif:
                                            ${formatNumber(item.attributes.Kasus_Posi)}`}
                                        </Text>
                                    </View>
                                    {/* <View style={[styles.cardButton]}>
                                        <View style={styles.followButton}>
                                            <Text style={styles.textDark}>Detail</Text>  
                                        </View>
                                    </View> */}
                                </TouchableOpacity>
                            )
                    }}
                    keyExtractor={(item) => item.attributes.FID}
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
                            <Text style={[styles.modalTitle,styles.textDark]}>{modalVisible? dataModal.attributes.Provinsi : '-'}</Text>
                            <Text style={[styles.modalText,styles.textDark]}>{modalVisible? 'Kasus Positif: ' + formatNumber(dataModal.attributes.Kasus_Posi) : '-'}</Text>
                            <Text style={[styles.modalText,styles.textDark]}>{modalVisible? 'Kasus Sembuh: ' + formatNumber(dataModal.attributes.Kasus_Semb) : '-'}</Text>
                            <Text style={[styles.modalText,styles.textDark]}>{modalVisible? 'Kasus Meninggal: ' + formatNumber(dataModal.attributes.Kasus_Meni) : '-'}</Text>
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