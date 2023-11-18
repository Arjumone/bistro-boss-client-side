
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/UseMenu";


const PopularMenu = () => {
    const [menu]=useMenu();
    const popular = menu.filter(item=>item.category==='popular')

    return (
        <section className=" mb-8">
            <SectionTitle
            subHeading={"Check it out"}
            heading={"FROM OUR MENU"}
            ></SectionTitle>
            <div className=" gap-10 grid md:grid-cols-2">
                {
                    popular.map(item=><MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
        </section>
    );
};

export default PopularMenu;