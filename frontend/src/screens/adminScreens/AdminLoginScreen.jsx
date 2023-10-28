import React, { useEffect } from "react";
import FormContainer from "../../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useAdminLoginMutation } from "../../slices/adminApiSlice";
import { useDispatch ,useSelector} from "react-redux";
import { setCredentials } from "../../slices/adminAuthSlice";6                                                                                                                                                                                                                                               
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



function AdminLoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useAdminLoginMutation();
  const {adminInfo}=useSelector((state)=>state.adminAuth)

  useEffect(() => {
    if(adminInfo){
      navigate('/admin/get-user')
    }
  },[adminInfo,navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const responceFromApiCall = await login({ email, password }).unwrap();
      console.log("responceFromApiCall",responceFromApiCall);
      dispatch(setCredentials({ ...responceFromApiCall }));
      navigate("/admin/get-user");
    } catch (error) {
      toast.error("An error ocooured,try again ");
    }
  };

  return (
    <FormContainer>
      <h1> Admin Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Sign In
        </Button>
      </Form>
    </FormContainer>
  );
}

export default AdminLoginScreen;
