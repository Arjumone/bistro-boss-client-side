import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";

import img from '../../../assets/menu/banner3.jpg'
import dessertImg from '../../../assets/menu/dessert-bg.jpeg';
import pizzaImg from '../../../assets/menu/pizza-bg.jpg';
import soupImg from '../../../assets/menu/soup-bg.jpg';
import saladImg from '../../../assets/menu/salad-bg.jpg';
import useMenu from "../../../hooks/UseMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";

const Menu = () => {
    const [menu]=useMenu();
    const desserts = menu.filter(item=>item.category === 'dessert')
    const soup = menu.filter(item=>item.category === 'soup')
    const salad = menu.filter(item=>item.category === 'salad')
    const pizza = menu.filter(item=>item.category === 'pizza')
    const offered = menu.filter(item=>item.category === 'offered')
    return (
        <div>
            
            <Helmet>
            <title>Bistro Boss | Menu</title>
            </Helmet>
           <Cover img={img} title="Our Menu"></Cover>
           {/* main cover */}
            <SectionTitle
            subHeading={"Don't miss"}
            heading={"Today's offered"}
            ></SectionTitle>
            {/* offered menu items */}
            <MenuCategory items={offered}></MenuCategory>
            {/* dessert menu items */}
            <MenuCategory items={desserts} img={dessertImg} title="dessert"></MenuCategory>
            {/* pizza menu items */}
            <MenuCategory items={pizza} img={pizzaImg} title="pizza"></MenuCategory>
            {/* soup menu items */}
            <MenuCategory items={soup} img={soupImg} title="soup"></MenuCategory>
            {/* salad menu items */}
            <MenuCategory items={salad} img={saladImg} title="salad"></MenuCategory>
        </div>
    );
};

export default Menu;