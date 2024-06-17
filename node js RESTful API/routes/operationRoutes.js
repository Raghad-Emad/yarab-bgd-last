if (process.env.NODE_ENV != "production") {
    const dotenv = require("dotenv").config({ path: "./.env" });
  }
  
  const express = require("express");
  const router = express.Router();
  const pool = require("../config/db");
  const bcrypt = require("bcrypt");
  const { check, validationResult } = require("express-validator");
  const JWT = require("jsonwebtoken");
  const checkAuth = require("../middleware/checkAuth");
  
  // Get operation details
  router.route("/").get(checkAuth, async (req, res) => {
    const email = req.user.email;
    const password = req.user.password;
  
    const query = `CALL details_operation("${email}", "${password}")`;
    const [[[details]]] = await pool.query(query).catch((err) => {
      return res.status(400).json({ status: "failure", reason: err });
    });
    return res.status(200).json({
      status: "success",
      details,
    });
  });
  
  router.route("/login").post(async (req, res) => {
    const data = {
      email: req.body.email,
      password: req.body.password,
    };
  
    const query = `SELECT * FROM operations WHERE email = "${data.email}"`;
    const [results] = await pool.query(query).catch((err) => {
      console.log("something went wrong");
      return res.status(400).json({ status: "failure", reason: err });
    });
  
    if (!results[0]) {
      return res.status(401).json({ status: "Email not found" });
    } else {
      try {
        if (await bcrypt.compare(req.body.password, results[0].Password)) {
          data.password = results[0].Password;
          const token = await JWT.sign({ data }, process.env.SECURE_KEY, {
            expiresIn: parseInt(process.env.EXPIRES_IN),
          });
          return res.status(200).json({
            status: "success",
            message: "Successful login",
            token: token,
          });
        } else {
          return res.status(401).json({ status: "Password not matching" });
        }
      } catch {
        return res.status(404).json({ status: "error occurred" });
      }
    }
  });
  
  router
    .route("/update")
    .put(
      [
        check("email", "Invalid email").isEmail(),
        check("firstname", "First name is required").not().isEmpty(),
        check("lastname", "Last name is required").not().isEmpty(),
        check("phonenumber", "Phone number is required").not().isEmpty(),
      ],
      checkAuth,
      async (req, res) => {
        const oEmail = req.user.email;
        const oPassword = req.user.password;
  
        const data = {
          email: req.body.email,
          fName: req.body.firstname,
          lName: req.body.lastname,
          phonenumber: req.body.phonenumber,
        };
        const query = `CALL update_operation ( "${oEmail}", "${oPassword}", "${data.fName}", "${data.lName}", "${data.email}","${data.phonenumber}")`;
        const [results] = await pool.query(query).catch((err) => {
          console.log("something went wrong");
          return res.status(400).json({ status: "failure", reason: err });
        });
        return res.status(200).json({ status: "success", data: data });
      }
    )
    .delete(checkAuth, async (req, res) => {
      const email = req.user.email;
      const password = req.user.password;
  
      const query = `CALL delete_operation ( "${email}", "${password}")`;
      const [results] = await pool.query(query).catch((err) => {
        console.log("something went wrong");
        return res.status(400).json({ status: "failure", reason: err });
      });
      return res.status(200).json({
        status: "success",
        message: `Deleted user: ${req.params.id}`,
      });
    });
  
  router
    .route("/update/password")
    .put(
      [
        check("oPassword", "Password < 6").isLength({ min: 6 }),
        check("nPassword", "Password < 6").isLength({ min: 6 }),
      ],
      checkAuth,
      async (req, res) => {
        try {
          const errs = validationResult(req);
          if (!errs.isEmpty()) {
            return res.status(400).json({
              errors: errs.array(),
            });
          }
  
          const tEmail = req.user.email;
          const tPassword = req.user.password;
          const hashedPassword = await bcrypt.hash(req.body.nPassword, 10);
  
          const data = {
            oldPassword: req.body.oPassword,
            newPassword: hashedPassword,
          };
  
          let query = `SELECT * FROM operations WHERE email = "${tEmail}"`;
          const [[result]] = await pool.query(query).catch((err) => {
            return res.status(400).json({ status: "failure", reason: err });
          });
  
          try {
            if (await bcrypt.compare(data.oldPassword, result.Password)) {
              data.oldPassword = result.Password;
            } else {
              return res.status(401).json({ status: "Password incorrect" });
            }
          } catch {
            return res.status(404).json({ status: "error occurred" });
          }
  
          query = `CALL operation_edit_password ("${tEmail}","${data.oldPassword}", "${data.newPassword}")`;
          const [result2] = await pool.query(query).catch((err) => {
            return res.status(400).json({ status: "failure", reason: err });
          });
          return res.status(200).json({ status: "success" });
        } catch (err) {
          return res.status(500).send(err);
        }
      }
    );
  
  // Create operation
  router
    .route("/create")
    .post(
      [
        check("email", "Invalid email").isEmail(),
        check("password", "Password < 6").isLength({ min: 6 }),
        check("firstname", "First name is required").not().isEmpty(),
        check("lastname", "Last name is required").not().isEmpty(),
        check("phonenumber", "Phone number is required").not().isEmpty(),
      ],
      async (req, res) => {
        try {
          const errs = validationResult(req);
          if (!errs.isEmpty()) {
            return res.status(400).json({
              errors: errs.array(),
            });
          }
  
          const hashedPassword = await bcrypt.hash(req.body.password, 10);
          const data = {
            email: req.body.email,
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            password: hashedPassword,
            phoneNumber: req.body.phonenumber,
          };
  
          const query = `CALL create_operation ("${data.firstName}", "${data.lastName}", "${data.email}", "${data.password}","${data.phoneNumber}")`;
          const [result] = await pool.query(query).catch((err) => {
            return res.status(400).json({ status: "failure", reason: err });
          });
          return res.status(201).json({ status: "success" });
        } catch (err) {
          return res.status(500).send(err);
        }
      }
    );
  
  // Assign student to class
  router.route("/classes/assign").post(checkAuth, async (req, res) => {
    const email = req.user.email;
    const password = req.user.password;
    try {
      const data = {
        classID: req.body.classID,
        studentID: req.body.studentID,
      };
  
      const query = `CALL add_student_to_class (${data.classID}, ${data.studentID}, "${email}", "${password}")`;
      const [result] = await pool.query(query).catch((err) => {
        return res.status(400).json({ status: "failure", reason: err });
      });
      return res.status(201).json({
        status: "success",
        data: data,
        message: "Student added to class",
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  });
  
  // Remove student from class
  router.route("/classes/remove").delete(checkAuth, async (req, res) => {
    const email = req.user.email;
    const password = req.user.password;
    try {
      const data = {
        classID: req.body.classID,
        studentID: req.body.studentID,
      };
  
      const query = `CALL remove_student_from_class (${data.classID}, ${data.studentID}, "${email}", "${password}")`;
      const [results] = await pool.query(query).catch((err) => {
        return res.status(400).json({ status: "failure", reason: err });
      });
      return res.status(201).json({
        status: "success",
        data: data,
        message: "Student removed from class",
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  });
  
  // Get all students
  router.route("/students/all").get(checkAuth, async (req, res) => {
    try {
      const email = req.user.email;
      const password = req.user.password;
      const query = `CALL get_all_students ("${email}", "${password}")`;
  
      const [students] = await pool.query(query).catch((err) => {
        return res.status(400).json({ status: "failure", reason: err });
      });
      return res.status(200).json({
        status: "success",
        students,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  });
  
  // Search students
  router.route("/search").post(checkAuth, async (req, res) => {
    const email = req.user.email;
    const password = req.user.password;
    try {
      const data = {
        sTerm: req.body.searchTerm,
      };
  
      const query = `CALL search_students ("${email}", "${password}", "${data.sTerm}")`;
      const [students] = await pool.query(query).catch((err) => {
        return res.status(400).json({ status: "failure", reason: err });
      });
      return res.status(200).json({
        status: "success",
        students,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  });
  
  // Get students by class
  router
    .route("/class")
    .post(
      [check("classID", "ClassID is required").not().isEmpty()],
      checkAuth,
      async (req, res) => {
        const errs = validationResult(req);
        if (!errs.isEmpty()) {
          return res.status(400).json({
            errors: errs.array(),
          });
        }
  
        const email = req.user.email;
        const password = req.user.password;
        const data = {
          classID: req.body.classID,
        };
  
        const query = `CALL operation_get_students_by_class (${data.classID}, "${email}", "${password}")`;
        const [results] = await pool.query(query).catch((err) => {
          return res.status(400).json({ status: "failure", reason: err });
        });
        if (results === null) {
          return res.status(204).json({ status: "Not found" });
        } else {
          return res.status(200).json({ status: "success", data: results[0] });
        }
      }
    );
  
  module.exports = router;
  