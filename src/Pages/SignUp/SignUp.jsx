import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const SignUp = () => {

  const axiosPublic = useAxiosPublic()

  const {createUser,updateUserProfile,logout} = useContext(AuthContext)

  const navigate =useNavigate()

  const {register,formState: { errors },handleSubmit,reset} = useForm();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email,data.password)
    .then(result=>{
        const loggedUser= result.user;
        console.log(loggedUser);
        updateUserProfile(data.name,data.photoURL)
        .then(()=>{
            // create user entry in the database
            const userInfo = {
              name:data.name,
              email:data.email
            }
            axiosPublic.post("/users",userInfo)
            .then(res=>{
              if(res.data.insertedId){
                console.log("User added to the database");
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User created successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
                //   navigate('/')
                logout()
                .then(()=>{
                    navigate("/login")
                })
              }
            })
           

        })
        .catch(error=>console.log(error))
    })
  };

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Sign Up</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left md:w-1/2">
            <h1 className="text-5xl font-bold">Sign Up Now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card flex-shrink-0 max-w-sm shadow-2xl bg-base-100 w-1/2">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label"></label>
                <input
                  type="text"
                  name="name"
                  {...register("name", { required: true })}
                  placeholder="Name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className=" text-red-600">Name is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label"></label>
                <input
                  type="text"
                  name="photoURL"
                  {...register("photoURL", { required: true })}
                  placeholder="PhotoURL"
                  className="input input-bordered"
                />
                {errors.photoURL && (
                  <span className=" text-red-600">PhotoURL is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label"></label>
                <input
                  type="email"
                  name="email"
                  {...register("email", { required: true })}
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className=" text-red-600">Email is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label"></label>
                <input
                  type="password"
                  name="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  placeholder="password"
                  className="input input-bordered"
                />
                {errors.password?.type === "required" && (
                  <span className=" text-red-600">Password is required</span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className=" text-red-600">
                    Password must be 6 characters
                  </span>
                )}
                {errors.password?.type === "maxLength" && (
                  <span className=" text-red-600">
                    Password must be less then 20 characters
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className=" text-red-600">
                    Password must have one uppercase one lower case,one number
                    and one special character
                  </span>
                )}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Sign Up"
                />
              </div>
            </form>
            <p className=" text-center my-2">
              <small>
                Already have an Account?
                <Link to="/login" className=" text-blue-500 font-bold">
                  Login
                </Link>
              </small>
            </p>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
