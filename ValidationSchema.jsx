import * as Yup from "yup";
import { messageConfig } from "./Config/messageConfig";

// Regex patterns
const nameRegex = /^[A-Za-z\s]+$/;
const phoneRegex = /^\+?[0-9]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

export const MentorValidation = Yup.object().shape({
  fullName: Yup.string()
    .matches(nameRegex, "Full name can only contain letters and spaces")
    .required("This field is required!"),
  userRole: Yup.string()
    .matches(nameRegex, "User role can only contain letters and spaces")
    .required("This field is required!"),
  phoneNumber: Yup.string()
    .matches(
      phoneRegex,
      'Phone number can only contain digits and an optional "+" at the beginning'
    )
    .required("This field is required!"),
  emailAddress: Yup.string()
    .required("This field is required!")
    .email("Please enter a valid email address!"),
  profileSummary: Yup.string().required("This field is required!"),
  // certificates: Yup.string().required('This field is required!'),
});

export const CourseUploadSchema = Yup.object().shape({
  course_title: Yup.string()
    .required("This field is required!")
    .min(5, "Course title should be at least 5 characters"),
  course_type: Yup.string().required("This field is required!"),
  level: Yup.string().required("This field is required!"),
  actual_price: Yup.number()
    .required("Price is required")
    .positive("Price should be a positive number"),
  // discounted_price: Yup.number()
  //   .required("Discounted price is required")
  //   .positive("Discounted price should be a positive number"),
  course_description: Yup.string().required("This field is required!"),
  thumbnail: Yup.mixed().required("This field is required!"),
  course_preview: Yup.string().required("This field is required!")
});

export const LoginPageValidations = Yup.object().shape({
  userType: Yup.string().required(messageConfig?.msg_field_is_required),
  email: Yup.string()
    .required(messageConfig?.msg_field_is_required)
    .email("Please enter a valid email address!"),
  password: Yup.string()
    // .matches(passwordRegex, 'Password must be at least 6 characters, contain an uppercase letter, a lowercase letter, and a special character')
    .required(messageConfig?.msg_field_is_required),
});

export const SignupValidations = Yup.object().shape({
  firstname: Yup.string().required(messageConfig?.msg_field_is_required),
  // lastname: Yup.string().required(messageConfig?.msg_field_is_required),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address!"
    )
    .required(messageConfig?.msg_field_is_required),
  password: Yup.string()
    // .min(8, "Password should be greater than 8 characters!")
    // .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    // .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    // .matches(/\d/, 'Password must contain at least one number')
    // .matches(/[@$!%*?&]/, 'Password must contain at least one special character')
    // .max(16, "Password should be less than 16 characters!")
    .required(messageConfig?.msg_field_is_required),
  confirmPassword: Yup.string()
    .required(messageConfig?.msg_field_is_required)
    .oneOf(
      [Yup.ref("password"), null],
      "Confirm password should match with password!"
    ),
});

export const ForgotPasswordValidation = Yup.object().shape({
  resetCode: Yup.string()
    .required(messageConfig?.msg_field_is_required)
    .matches(/^\d{6}$/, "OTP length should be 6 digits"),
  newPassword: Yup.string()
    // .min(8, "Password should be greater than 8 characters!")
    // .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    // .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    // .matches(/\d/, 'Password must contain at least one number')
    // .matches(/[@$!%*?&]/, 'Password must contain at least one special character')
    // .max(16, "Password should be less than 16 characters!")
    .required(messageConfig?.msg_field_is_required),
  confirmPassword: Yup.string()
    .required(messageConfig?.msg_field_is_required)
    .oneOf(
      [Yup.ref("newPassword"), null],
      "Confirm password should match with password!"
    ),
});


export const changePasswordForm = Yup.object().shape({
  current_password: Yup.string().required(messageConfig?.msg_field_is_required),
  new_password: Yup.string().required(messageConfig?.msg_field_is_required),
  confirm_password: Yup.string().required(messageConfig?.msg_field_is_required).oneOf(
    [Yup.ref("new_password"), null],
    "Confirm password should match with new password!"
  ),
});



export const JoinMeetingValidation = Yup.object({
  meetingNumber: Yup.string()
    .required(messageConfig?.msg_field_is_required)
    // .matches(/^\d+$/, 'Meeting number should only contain digits')
    .min(9, 'Meeting number must be at least 9 digits')
    .max(11, 'Meeting number must be no more than 11 digits'),
  passCode: Yup.string()
    .required(messageConfig?.msg_field_is_required)
    .min(6, 'Passcode must be at least 6 characters'),
})


export const meetingLInk = Yup.object({
  meetingLink: Yup.string()
    .required(messageConfig?.msg_field_is_required)
})

//admin
export  const MenuFormValidation = Yup.object({
  name: Yup.string().required(messageConfig?.msg_field_is_required)
})