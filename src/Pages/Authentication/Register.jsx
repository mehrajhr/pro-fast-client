import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";
import SocialLogin from "./SocialLogin";

const Register = () => {
  const { createUser } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email , data.password)
    .then(result => {
        console.log(result.user);
    })
    .catch(err => {
        console.log(err);
    })
  };
  return (
    <div onSubmit={handleSubmit(onSubmit)} className="card-body max-w-sm">
      <h1 className="text-4xl font-bold">Register now!</h1>
      <form>
        <fieldset className="fieldset">
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
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn w-full btn-primary mt-4">Login</button>
        </fieldset>
      </form>
       <p>Already have an account ? <Link to='/login' className="btn-link text-primary">Login</Link></p>
       <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
