import * as yup from "yup";

export const onboardingSchema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  nextOfKinName: yup.string().required("Next of Kin is required"),
  nextOfKinAddress: yup.string().required("Next of Kin Address is required"),
  nextOfKinContact: yup.number().required("Next of Kin Contact is required"),
  phone: yup.number().required("Phone number is required"),
  address: yup.string().required("Address is required"),
  maritalStatus: yup.string().required("Marital status is required"),
  medicalStatus: yup.string().required("Medical status is required"),
  dob: yup.date().required("Date of birth is required"),
  image: yup.string().required("Image URL is required"),
  // reportingOfficer: yup.string().required("Reporting Officer is required"),
  medicalDescription: yup.string().required("Medical Description is required"),
});
