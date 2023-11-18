

export const SectionTitle = ({heading,subHeading}) => {
    return (
        <div className=" mx-auto text-center my-3 md:w-4/12">
            <p className=" text-yellow-500">----{subHeading}----</p>
            <p className=" uppercase text-4xl font-semibold mt-2 border-y-4 py-2 ">{heading}</p>
        </div>
    );
};

export default SectionTitle;