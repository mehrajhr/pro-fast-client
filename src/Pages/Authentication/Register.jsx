import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import axios from "axios";
import useAxios from "../../hooks/useAxios";

const Register = () => {
  const { createUser , updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [profilePic , setProfilePic] = useState('');
  const axiosInstance = useAxios();
  const location = useLocation();
  const from = location.state?.from || '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then(async(result) => {

        const userInfo = {
          email : data.email,
          role: 'user',
          created_at : new Date().toISOString(),
          last_login: new Date().toISOString(),
        }

        const userInsertRes = await axiosInstance.post('/users', userInfo);
        console.log(userInsertRes.data);

        const userProfile = {
          displayName : data.name,
          photoURL : profilePic
        }

        updateUserProfile(userProfile)
        .then(() =>{
          console.log('userprofile success')
        })
        .catch(err => {
          console.log(err);
        })

        console.log(result.user);

        navigate(from);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleImageUpload = async(e) => {
    const image = e.target.files[0];
    // console.log(image);
    const formData = new FormData();
    formData.append('image', image);

    const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_KEY}` , formData);
    setProfilePic(res?.data?.data?.url);
  }
  return (
    <div onSubmit={handleSubmit(onSubmit)} className="card-body max-w-sm">
      <h1 className="text-4xl font-bold">Register now!</h1>
      <form>
        <fieldset className="fieldset">

          {/* name field */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input w-full"
            placeholder="Your Name"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Name is reqired</p>
          )}

          {/* image field */}
          <label className="label">Your Image</label>
          <input
            type="file"
            className="input"
            placeholder="Your Image"
            onChange={handleImageUpload}
          />

          {/* email field */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input w-full"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is reqired</p>
          )}

          {/* password field */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input w-full"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password must be required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password is must be more than 6 charecter{" "}
            </p>
          )}
          <button className="btn w-full btn-primary mt-4">Register</button>
        </fieldset>
      </form>
      <p>
        Already have an account ?{" "}
        <Link to="/login" className="btn-link text-primary">
          Login
        </Link>
      </p>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
