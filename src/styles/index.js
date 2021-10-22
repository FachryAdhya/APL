import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    fill:{
        flex:1,
    },
    center:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    sView:{
        flex: 1,
        alignSelf: 'stretch',
    },
    title:{
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    itemContainer: {
        marginBottom: 12,
    },
    box:{
        height: 100,
        width: 200,
        borderRadius: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bgDark:{
        backgroundColor: '#334756',
    },
    bgLight:{
        backgroundColor: '#F6F6F6',
    },
    bgRed:{
        backgroundColor: '#FF7171',
    },
    bgDarkRed:{
        backgroundColor: '#b30000',
    },
    bgGreen:{
        backgroundColor: '#77D970'
    },
    bgBlue:{
        backgroundColor: '#A1CAE2'
    },
    textLight:{
        color:'#F6F6F6'
    },
    textDark:{
        color:'#212121'
    },
    boxTitle:{
        fontSize: 16,
        fontWeight: 'bold'
    },
    boxValue:{
        fontSize: 28,
        padding: 12,
        fontWeight: 'bold',
    },
        listDev: {
        paddingHorizontal: 5,
    },
    listContainerDev: {
        alignItems: 'center'
    },
     cardDev: {
        // shadowColor: '#00000021',
        // shadowOffset: {
        //     width: 0,
        //     height: 6,
        // },
        // shadowOpacity: 0.37,
        // shadowRadius: 7.49,
        // elevation: 12,
        // backgroundColor: "#4b6a81",
        marginVertical: 5,
        backgroundColor: 'rgba(66, 92, 112, 0.5)',
        flexBasis: '46%',
        marginHorizontal: 5,
        borderRadius: 10,
        borderColor: 'rgba(38, 53, 64, 0.5)',
        borderWidth: 2.5
    },
    cardDevFooter: {
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    },
    cardDevContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
    },
    cardDevHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    userImage: {
        height: 120,
        width: 120,
        borderRadius: 60,
        alignSelf: 'center',
        borderColor: "#DCDCDC",
        borderWidth: 3,
    },
    devName: {
        fontSize: 18,
        flex: 1,
        alignSelf: 'center',
        color: "#F6F6F6",
        fontWeight: 'bold'
    },
    devPosition: {
        fontSize: 14,
        flex: 1,
        alignSelf: 'center',
        color: "#F6F6F6"
    },
    devFollowButton: {
        marginTop: 10,
        height: 35,
        width: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: "#334756",
    },
    devFollowButtonText: {
        color: "#FFFFFF",
        fontSize: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        marginTop: 10,
        borderRadius: 5,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#334756",
    },
    modalTitle: {
        marginBottom: 25,
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 18
    },
    modalText: {
        marginBottom: 15,
    },
    cardContent: {
        marginLeft:20,
        flex: 1,
    },
    card:{
        // height: 170,
        height: 120,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15,
        backgroundColor: 'rgba(66, 92, 112, 0.5)',
        padding: 10,
        flex: 1,
        flexDirection:'row',
        flexWrap: 'wrap',
        borderRadius:10,
        borderColor: 'rgba(38, 53, 64, 0.5)',
        borderWidth: 2.5
    },
    cardTitle:{
        fontSize:22,
        flex:1,
        alignSelf:'center',
        fontWeight:'bold',
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    cardCount:{
        fontSize:16,
        fontWeight:'bold',
        flex:1,
        alignSelf:'center',
        backgroundColor: '#FF7171',
        textAlignVertical: 'center',
        borderRadius: 50,
        padding: 10,
        width: 100,
        textAlign:'center',
        lineHeight: 12.5,
        borderColor: 'rgba(38, 53, 64, 0.5)',
        borderWidth: 2.5
    },
    fullWidth:{
        alignSelf: 'stretch',
    },
    listSearch:{
        backgroundColor: '#fff', 
        paddingHorizontal: 20,
        borderRadius: 10,
        opacity: 0.75,
        width: '90%',
        alignSelf:'center'
    },
    listEmpty:{
        marginTop: 50,
        padding: 10,
        textAlign: 'center',
        fontSize: 16,
    },
    clearInput:{
        textAlign: 'center',
        marginRight: '7.5%',
        marginTop: -35,
        marginBottom: 15,
        width: 20,
        alignSelf: 'flex-end',
        borderRadius: 50,
    },
    bgLoading:{
        backgroundColor: 'rgba(51, 71, 86, 0.9)'
    },
    borderDark:{
        borderColor: 'rgba(38, 53, 64, 0.5)',
        borderWidth: 2.5,
    }
})

export default styles;