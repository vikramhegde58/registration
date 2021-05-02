import { Field, Form, FormikProps, withFormik } from "formik";
import React from "react";
import styled from "styled-components";
import { primaryColors } from "../../colorUtility";
import * as Yup from "yup";

const FormCard = styled(Form)`
  width: 100%;
  background: white;
  padding: 16px;
  margin: auto;
  -webkit-box-shadow: 0px 0px 34px -7px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 34px -7px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 34px -7px rgba(0, 0, 0, 0.75);

  @media (max-width: 425px) {
    margin: 16px;
  }

  @media (min-width: 768px) {
    max-width: 600px;
  }
`;

const InputField = styled(Field)`
  font-size: 12px;
  height: 30px;
  width: -webkit-fill-available;
  border-radius: 4px;
  background: #f7f7f7;
  box-shadow: 5px 5px 10px #ededed, -5px -5px 10px #ffffff;
  border: none;
  :focus,
  :active,
  :focus-within {
    outline: none;
    border: none;
  }
`;

const Title = styled.h1`
  text-align: center;
  margin: 0;
`;

const Label = styled.h5`
  margin: 0;
`;

const InputGroup = styled.div`
  margin: 15px 20px;
`;

const SubmitButton = styled.button<{ colorKey?: string }>`
  font-size: 18px;
  padding: 6px 20px;
  cursor: pointer;
  margin: 20px;
  width: -webkit-fill-available;
  ${({ colorKey }) =>
    colorKey &&
    `
      border: 1px solid ${primaryColors[colorKey]}; 
      color: ${primaryColors[colorKey]}; 
      background: white;
    `}
`;

const Error = styled.div`
  color: red;
  font-size: 10px;
  position: absolute;
`;

const capitalize = (text?: string) =>
  text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

export type RegistrationFormValues = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  linkedInProfile: string;
};

type RegistrationFormSelfProps = {
  title?: string;
};

type RegistrationFormProps = RegistrationFormSelfProps &
  FormikProps<RegistrationFormValues>;

function RegistrationForm({
  touched,
  errors,
  isSubmitting,
  title,
}: RegistrationFormProps) {
  return (
    <FormCard>
      <Title>{`${capitalize(title)} Form`}</Title>

      <InputGroup>
        <Label>First Name</Label>
        <InputField type="text" name="first_name" />
        {touched.first_name && errors.first_name && (
          <Error>{errors.first_name}</Error>
        )}
      </InputGroup>

      <InputGroup>
        <Label>Last Name</Label>
        <InputField type="text" name="last_name" />
        {touched.last_name && errors.last_name && (
          <Error>{errors.last_name}</Error>
        )}
      </InputGroup>

      <InputGroup>
        <Label>Email</Label>
        <InputField type="email" name="email" />
        {touched.email && errors.email && <Error>{errors.email}</Error>}
      </InputGroup>

      <InputGroup>
        <Label>Phone Number</Label>
        <InputField type="text" name="phone" />
        {touched.phone && errors.phone && <Error>{errors.phone}</Error>}
      </InputGroup>

      <InputGroup>
        <Label>LinkedIn Profile</Label>
        <InputField type="text" name="linkedInProfile" />
        {touched.linkedInProfile && errors.linkedInProfile && (
          <Error>{errors.linkedInProfile}</Error>
        )}
      </InputGroup>

      <SubmitButton colorKey={title} type="submit" disabled={isSubmitting}>
        Register
      </SubmitButton>
    </FormCard>
  );
}

type FormikRegistrationFormProps = {
  title?: string;
  onSubmit: (values: RegistrationFormValues) => void;
};

export default withFormik<FormikRegistrationFormProps, RegistrationFormValues>({
  mapPropsToValues: (props) => {
    return {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      linkedInProfile: "",
    };
  },
  validationSchema: Yup.object().shape({
    first_name: Yup.string().required("Required"),
    last_name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phone: Yup.number()
      .required("Required")
      .test(
        "len",
        "Phone number must be 10 digits",
        (val) => String(val)?.length === 10
      )
      .typeError("Invalid phone number")
      .positive("Invalid phone number")
      .integer("Invalid phone number"),
    linkedInProfile: Yup.string().url("Invalid url").required("Required"),
  }),
  handleSubmit: (values, { props, resetForm }) => {
    props.onSubmit(values);
    resetForm();
  },
})(RegistrationForm);
