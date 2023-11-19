import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUpload } from "react-icons/fa";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
    const {name,category,recipe,price,_id} = useLoaderData();

    const { register, handleSubmit,reset } = useForm();
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const onSubmit = async(data) => {
        console.log(data);
        // image upload to imgbb and then get an url
        const imageFile = {image:data.image[0]}
        const res = await axiosPublic.post(image_hosting_api,imageFile, {
          headers:{
            'content-type': 'multipart/form-data'
          }
        })
        if(res.data.success){
          // now send the menu item  data to the server with the imageURL
          const menuItem = {
            name: data.name,
            category: data.category,
            price: parseFloat(data.price),
            recipe: data.recipe,
            image: res.data.data.display_url
          }
          // 
          const menuRes = await axiosSecure.patch(`/menu/${_id}`,menuItem);
          console.log(menuRes.data);
         if(menuRes.data.modifiedCount> 0){
          reset()
            // show success popup
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${data.name} is updated to the menu.`,
              showConfirmButton: false,
              timer: 1500
            });
          }
        }
        console.log(res.data); //error 
      };
    return (
        <div>
            <SectionTitle heading={"Update An Item"} subHeading={"Refresh Info"}></SectionTitle>
            <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input
              {...register("name",{required:true})}
              type="text"
              defaultValue={name}
              placeholder="Recipe Name"
              className="input input-bordered w-full "
            />
          </div>

          <div className=" flex gap-6">
            {/* category */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select defaultValue={category}
                {...register("category",{required:true})}
                className="select select-bordered w-full "
              >
                <option disabled  value="default">
                  Select A Category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Desserts</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>
            {/* price */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                {...register("price",{required:true})}
                type="number"
                defaultValue={price}
                placeholder="Price"
                className="input input-bordered w-full "
              />
            </div>

          </div>
           {/* recipe details */}
          <div className="form-control">
              <label className="label">
                <span className="label-text">Recipe Details</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="Recipe"
                defaultValue={recipe}
                {...register("recipe")}
              ></textarea>
            </div>
                <div className=" my-2">
                <input {...register("image",{required:true})} type="file" className="file-input w-full max-w-xs" />
                </div>
          <button className=" btn bg-orange-500 text-white">
            Update Menu Item <FaUpload></FaUpload>
          </button>
        </form>
      </div>
        </div>
    );
};

export default UpdateItem;