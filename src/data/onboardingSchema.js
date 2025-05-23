import * as yup from "yup";

export const onboardingSchema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  nextOfKinName: yup.string().required("Next of Kin is required"),
  nextOfKinAddress: yup.string().required("Next of Kin Address is required"),
  nextOfKinContact: yup.number().required("Next of Kin Contact is required"),
  phone: yup.number().required("Phone number is required"),
  address: yup.string().required("Address is required"),
  maritalStatus: yup.string().required("Marital status is required"),
  dob: yup.date().required("Date of birth is required"),
  genotype: yup.string().required("Genotype is required"),
  bloodGroup: yup.string().required("Blood group is required"),
  allergies: yup.array().of(yup.string()).required("Allergies are required"),
  image: yup.mixed().required("Image is required"),
});
