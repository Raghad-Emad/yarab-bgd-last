import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../Components/CustomButton";
import CustomInput from "../../Components/CustomInput";
import OverlayConfirm from "../../Components/OverlayConfirm";
import { editPasswordTeachers } from "../../http_Requests/operationRequests";
import styles from "./OverlayPassword.module.css";

const OverlayPassword = ({ close }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isChanged, setIsChanged] = useState(false);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const changePassword = async () => {
    if (oldPassword == null || oldPassword == "") {
      setOldPasswordError("Please enter a password");
    } else if (oldPassword.length < 8) {
      setOldPasswordError("Password must be 8 or more characters");
    } else {
      setOldPasswordError(null);
    }
    if (newPassword == null || newPassword == "") {
      setNewPasswordError("Please enter a password");
    } else if (newPassword.length < 8) {
      setNewPasswordError("Password must be 8 or more characters");
    } else {
      setNewPasswordError(null);
    }
    if (confirmPassword == null || confirmPassword == "") {
      setConfirmPasswordError("Please enter a password");
    } else if (confirmPassword.length < 8) {
      setConfirmPasswordError("Password must be 8 or more characters");
    } else if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Password not matching");
    } else {
      setConfirmPasswordError(null);
    }
    if (
      oldPassword != null &&
      oldPassword != "" &&
      confirmPassword != null &&
      confirmPassword != "" &&
      newPassword != null &&
      newPassword != "" &&
      oldPassword.length >= 8 &&
      confirmPassword.length >= 8 &&
      newPassword.length >= 8 &&
      newPassword === confirmPassword
    ) {
      const data = await editPasswordTeachers({
        oPassword: oldPassword,
        nPassword: newPassword,
      });
      if (data.status === "success") {
        setIsChanged(true);
      } else {
        setError(data.status);
      }
    }
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.message_box}>
        <h2>Change Password</h2>
        <div className={styles.error}>{error}</div>
        <h3>Current Password</h3>
        <div className={styles.error}>{oldPasswordError}</div>
        <CustomInput
          setValue={setOldPassword}
          value={oldPassword}
          password={true}
        />
        <h3>New Password</h3>
        <div className={styles.error}>{newPasswordError}</div>
        <CustomInput
          setValue={setNewPassword}
          value={newPassword}
          password={true}
        />
        <h3>Confirm New Password</h3>
        <div className={styles.error}>{confirmPasswordError}</div>
        <CustomInput
          setValue={setConfirmPassword}
          value={confirmPassword}
          password={true}
        />
        <div>
          <CustomButton text={"Confirm"} onClick={changePassword} />
          <CustomButton text={"Back"} type={2} onClick={close} />
        </div>
      </div>
      {isChanged ? (
        <OverlayConfirm
          message={"Password Changed"}
          type={2}
          yes={() => {
            setIsChanged(false);
            close();
            navigate("/", {});
            sessionStorage.clear();
            window.location.reload();
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default OverlayPassword;
