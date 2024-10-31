// import React, { useEffect, useState } from "react";
// import { Formik } from "formik";
// import { Form, Input, Checkbox, Radio, Select, Button } from "antd";
// import { useSelector } from "react-redux";
// import categories from "../utils/categories";
// import axios from "axios";

// const { Option } = Select;

// const emailFrequencyEnum = ["immediately", "hourly", "daily"];
// const notificationEnum = ["email", "push", "sms"];

// function StepForm() {
//   const user = useSelector((state) => state.auth.user);
//   const [userPreferences, setUserPreferences] = useState(null);
//   const [step, setStep] = useState(1);

//   const fetchUserPreferences = async () => {
//     const response = await axios.get(
//       `http://localhost:9001/api/preferences/get/${user._id}`
//     );
//     setUserPreferences(response.data.preferences);
//   };

//   useEffect(() => {
//     fetchUserPreferences();
//   }, []);

//   const onSubmit = async (values) => {
//     try {
//       const endpoint = userPreferences
//         ? `http://localhost:9001/api/preferences/update/${userPreferences._id}`
//         : "http://localhost:9001/api/preferences/create";
//       const response = await axios({
//         method: userPreferences ? "put" : "post",
//         url: endpoint,
//         data: {
//           user_id: user._id,
//           email_frequency: values.email_frequency,
//           notification_type: values.notification_type,
//           categories: values.categories,
//         },
//       });

//       if (response.status === 200) {
//         alert("Preferences saved successfully");
//         fetchUserPreferences();
//       } else {
//         alert("Something went wrong");
//       }
//     } catch (error) {
//       alert("Something went wrong");
//     }
//   };

//   const initialValues = {
//     email_frequency: userPreferences?.email_frequency || "",
//     notification_type: userPreferences?.notification_type || "",
//     categories: userPreferences?.categories || [],
//   };

//   const nextStep = () => setStep((prevStep) => prevStep + 1);
//   const prevStep = () => setStep((prevStep) => prevStep - 1);

//   return (
//     <div className="max-w-screen-lg mx-auto m-20 p-8 bg-white shadow-lg rounded-lg">
//       <h1 className="text-2xl font-bold mb-4">Profile</h1>
//       <Formik
//         initialValues={initialValues}
//         onSubmit={onSubmit}
//         enableReinitialize
//       >
//         {({ values, handleChange, setFieldValue, handleSubmit }) => (
//           <Form layout="vertical" onFinish={handleSubmit}>
//             {step === 1 && (
//               <>
//                 {/* Step 1: User Info */}
//                 <h2 className="text-xl font-semibold mb-4">User Info</h2>
//                 <Form.Item label="Email" required>
//                   <Input name="email" value={user.emailId} disabled />
//                 </Form.Item>
//                 <Form.Item label="Username" required>
//                   <Input name="username" value={user.userName} disabled />
//                 </Form.Item>
//                 <Button type="primary" onClick={nextStep}>
//                   Next
//                 </Button>
//               </>
//             )}

//             {step === 2 && (
//               <>
//                 {/* Step 2: Preferences */}
//                 <h2 className="text-xl font-semibold mb-4">Preferences</h2>
//                 <Form.Item label="Email Frequency" required>
//                   <Select
//                     name="email_frequency"
//                     value={values.email_frequency}
//                     onChange={(value) =>
//                       setFieldValue("email_frequency", value)
//                     }
//                     placeholder="Select frequency"
//                   >
//                     {emailFrequencyEnum.map((frequency) => (
//                       <Option key={frequency} value={frequency}>
//                         {frequency}
//                       </Option>
//                     ))}
//                   </Select>
//                 </Form.Item>
//                 <Button onClick={prevStep}>Back</Button>
//                 <Button type="primary" onClick={nextStep}>
//                   Next
//                 </Button>
//               </>
//             )}

//             {step === 3 && (
//               <>
//                 {/* Step 3: Notifications */}
//                 <h2 className="text-xl font-semibold mb-4">Notifications</h2>
//                 <Form.Item label="Notification Type" required>
//                   <Radio.Group
//                     name="notification_type"
//                     value={values.notification_type}
//                     onChange={(e) =>
//                       setFieldValue("notification_type", e.target.value)
//                     }
//                   >
//                     {notificationEnum.map((type) => (
//                       <Radio key={type} value={type}>
//                         {type}
//                       </Radio>
//                     ))}
//                   </Radio.Group>
//                 </Form.Item>
//                 <Form.Item label="Categories" required>
//                   <Checkbox.Group
//                     options={categories}
//                     value={values.categories}
//                     onChange={(checkedValues) =>
//                       setFieldValue("categories", checkedValues)
//                     }
//                   />
//                 </Form.Item>
//                 <Button onClick={prevStep}>Back</Button>
//                 <Button type="primary" htmlType="submit">
//                   Submit
//                 </Button>
//               </>
//             )}
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// }

// export default StepForm;
