import React, { useEffect, useState } from "react";
import CustomButton from "../../Components/CustomButton";
import ClassList from "../../Components/TeacherProfile/ClassList/ClassList";
import styles from "./Classes.module.css";
import { useNavigate } from "react-router-dom";

import {
  AiOutlineExpandAlt,
  AiOutlineShrink,
  AiOutlineClose,
} from "react-icons/ai";
import AddClass from "../../Components/OperationProfile/DetailsBox/AddClass";
import ClassDetails from "../../Components/OperationProfile/DetailsBox/ClassDetails";
import {
  getTeachersClasses,
  getTeachersDetails,
} from "../../http_Requests/operationRequests";

export const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState();
  const [classSuccess, setClassSuccess] = useState(false);
  const [showDetailBox, setShowDetailBox] = useState(false);
  // current right view
  const [addingClass, setAddingClass] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isShowStudents, setIsShowStudents] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
    classChanged();
  }, [selectedClass]);

  const classChanged = () => {
    setClassSuccess(!classSuccess);
    setIsUpdating(false);
    setIsSearching(false);
    setIsShowStudents(false);
  };

  useEffect(async () => {
    let data = await getTeachersClasses();
    console.log(data);
    if (data.hasOwnProperty("data")) {
      setClasses(data.data);
    }
  }, [classSuccess]);

  const flipAddClass = () => {
    setAddingClass(!addingClass);
  };

  return (
    <div className="content-box">
      <h1>Classes</h1>
      {/* <div className="container"> */}
      <div className={styles.container}>
        <h2>Classes</h2>
        <ClassList
          classes={classes}
          flipAddClass={flipAddClass}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
        />
        {addingClass || selectedClass ? (
          <div
            className={styles.details_box}
            style={isExpanded ? { width: "100%", height: "100%", top: 0 } : {}}
          >
            <div className={styles.control_bar}>
              <CustomButton
                text={<AiOutlineClose />}
                type={4}
                onClick={() => {
                  setAddingClass(false);
                  setSelectedClass(false);
                }}
              />
              <CustomButton
                text={isExpanded ? <AiOutlineShrink /> : <AiOutlineExpandAlt />}
                type={4}
                onClick={() => {
                  setIsExpanded(!isExpanded);
                }}
              />
            </div>
            <div className={styles.content}>
              {addingClass ? (
                <AddClass
                  flipAddClass={flipAddClass}
                  classChanged={classChanged}
                />
              ) : selectedClass ? (
                <ClassDetails
                  setSelectedClass={setSelectedClass}
                  selectedClass={selectedClass}
                  classID={selectedClass.id}
                  name={selectedClass.name}
                  yearGroup={selectedClass.yearGroup}
                  classChanged={classChanged}
                  setIsSearching={setIsSearching}
                  isSearching={isSearching}
                  setIsUpdating={setIsUpdating}
                  isUpdating={isUpdating}
                  setIsShowStudents={setIsShowStudents}
                  isShowStudents={isShowStudents}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
      
      </div>
    </div>
  );
};
