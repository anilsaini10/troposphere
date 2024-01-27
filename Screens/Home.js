import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Picker } from '@react-native-picker/picker';
import styles from "./Home.style";
import { ALL_COURSE, ALL_LEVELS, COURSES_LIST, FEES } from "../helper/constant";


const Home = () => {

    const [ExamFeesList, setExamFeesList] = useState([]);
    const [ApplicationFeesList, setApplicationFeesList] = useState([]);
    const [CountryList, setCountryList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [selectedFee, setSelectedFee] = useState();
    const [selectedCountry, setSelectedCountry] = useState();
    const [selectedType, setSelectedType] = useState();
    const [selectedCourse, setSelectedCourse] = useState();

    const [totalFee, setTotalFee] = useState(0);


    const handleInitialStates = () => {

        const Exams_List = [];
        const Country_List = [];
        const Application_List = [];
        const currentExamFeeList = COURSES_LIST[0]["Exam Fee"];
        const currentApplicationFeeList = COURSES_LIST[0]["Application Fee"];
        for (let j in currentExamFeeList) {
            let country_obj = {
                label: j,
                value: j
            }
            Country_List.push(country_obj);
            const exam_obj = {
                label: ""
            }
        }
        setCountryList(Country_List);

        for (let j in currentApplicationFeeList) {
            let curr_obj = {
                country: j,
                list: currentApplicationFeeList[j]?.["ALL_COURSES"]
            }
            Application_List.push(curr_obj);
        };
        setApplicationFeesList(Application_List);
    };

    const handleFinalFees = (course) => {

        // If course type is ALL_LEVELS
        if (selectedType == "ALL_LEVEL") {
            console.log(course)
            for (let i in ApplicationFeesList) {
                if (ApplicationFeesList[i].country == selectedCountry) {
                    let finalSum = parseInt(selectedFee) + ApplicationFeesList[i]?.list?.[course]?.amount;
                    setTotalFee(finalSum);
                }
            };
        } else {  // If course type is SPECIFIC DEGREE
            for (let i in ALL_COURSE) {

                if (ALL_COURSE[i].label == course) {
                    let finalSum = parseInt(selectedFee) + ALL_COURSE[i]?.amount;
                    setTotalFee(finalSum);
                };

            };
        }
    };

    useEffect(() => {
        handleInitialStates();
    }, []);


    return (
        <>
            <View style={styles.container} >

                <Text style={styles.heading} >Fee To Be Paid</Text>

                <View style={styles.box} >

                    <Text style={styles.title} >Select Fee</Text>
                    <View style={styles.pickerContainer} >
                        <Picker
                            mode="dropdown"
                            selectedValue={selectedFee}
                            onValueChange={(itemValue, itemIndex) => {
                                setSelectedFee(itemValue);
                                setCurrentIndex(1);
                            }}>
                            <Picker.Item enabled={false} label={"Select Fee"} value={null} />
                            {FEES.map((item, index) => {
                                return <Picker.Item key={index} label={item?.label} value={item?.value} />
                            })}
                        </Picker>

                    </View>
                </View>

                {/* Select FEE */}
                {currentIndex > 0 && <View style={styles.box} >

                    <Text style={styles.title} >Select Country</Text>
                    <View style={styles.pickerContainer} >
                        <Picker
                            mode="dropdown"
                            selectedValue={selectedCountry}
                            onValueChange={(itemValue, itemIndex) => {
                                setSelectedCountry(itemValue);
                                setCurrentIndex(2);
                            }}>
                            <Picker.Item enabled={false} label={"Select Country"} value={null} />
                            {CountryList.map((item, index) => {
                                return <Picker.Item key={index} label={item?.label} value={item?.value} />
                            })}
                        </Picker>

                    </View>
                </View>}

                {/* Select ALL COURSE TYPE / ALL LEVEL  */}
                {currentIndex > 1 && <View style={styles.box} >

                    <Text style={styles.title} >Select All Course / Type </Text>
                    <View style={styles.pickerContainer} >
                        <Picker
                            mode="dropdown"
                            selectedValue={selectedType}
                            onValueChange={(itemValue, itemIndex) => {
                                setSelectedType(itemValue);
                                setCurrentIndex(3);
                            }}>
                            <Picker.Item enabled={false} label={"Select Course"} value={null} />
                            <Picker.Item label={"All Course"} value={"ALL_COURSE"} />
                            <Picker.Item label={"All Level"} value={"ALL_LEVEL"} />
                        </Picker>

                    </View>
                </View>}

                {/* Select specific DEGREE / COURSE */}
                {currentIndex > 2 && <View style={styles.box} >

                    <Text style={styles.title} >Select Degree </Text>
                    <View style={styles.pickerContainer} >
                        <Picker
                            mode="dropdown"
                            selectedValue={selectedCourse}
                            onValueChange={(itemValue, itemIndex) => {
                                setSelectedCourse(itemValue);
                                setCurrentIndex(4);
                                handleFinalFees(itemValue);
                            }}>
                            <Picker.Item enabled={false} label={"Select Degree"} value={null} />
                            {(selectedType === "ALL_COURSE" ? ALL_COURSE : ALL_LEVELS).map((item, index) => {
                                return <Picker.Item key={index} label={item?.label} value={item?.value} />
                            })}
                        </Picker>

                    </View>
                </View>}

                {/* Final OUTPUT / ANSWER */}
                {currentIndex > 3 &&
                    <Text style={styles.answerText} >Final Amount - <Text style={styles.amountText} >{totalFee}</Text></Text>
                }


            </View>
        </>
    );
};


export default Home;