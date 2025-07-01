import React from "react";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div onSubmit={handleSubmit(onSubmit)} className="card-body">
      <h1 className="text-5xl font-bold">Register now!</h1>
      <form>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is reqired</p>
          )}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password must be required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password is must be more than 6 charecter
            </p>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn w-fit btn-neutral mt-4">Login</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
