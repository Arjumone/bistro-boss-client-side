import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/home/featured.jpg'
import './Featured.css'
const Featured = () => {
    return (
        <section className="featured-item my-6 pt-4 bg-fixed text-white ">
            <SectionTitle
            subHeading={"Check it out"}
            heading={"Featured item"}
            ></SectionTitle>
            <div className="bg-slate-500 bg-opacity-60  md:flex justify-center items-center pb-20 pt-12 px-36">
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className=" md:ml-10">
                    <p>Aug 20, 2029</p>
                    <p className="uppercase">Where can i get some</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui earum possimus consectetur unde. Natus numquam quasi velit vero officiis nisi facilis neque in at animi accusamus, beatae delectus consectetur iure eligendi aut porro quod aliquid id! Quae ab corporis veritatis, asperiores harum, fugiat maiores placeat reiciendis minus cumque iste recusandae.</p>
                    <button className=" btn btn-outline border-0 border-b-4 mt-3 text-white">order Now</button>
                </div>
            </div>
        </section>
    );
};

export default Featured;