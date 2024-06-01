import React from 'react';


const ApartmentDetails = () => {
    //     const data = useLoaderData()
    // console.log(data)
    // Dummy data for demonstration
    const apartmentDetails = {
        image: 'apartment-image.jpg',
        floorNo: 3,
        blockName: 'Block A',
        apartmentNo: 302,
        rent: 1500,

    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8">Apartment Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <img src={apartmentDetails.image} alt={`Apartment ${apartmentDetails.apartmentNo}`} className="w-full h-48 object-cover rounded-t-lg mb-4" />
                    <p className="text-lg font-semibold">Floor No: {apartmentDetails.floorNo}</p>
                    <p className="text-lg font-semibold">Block Name: {apartmentDetails.blockName}</p>
                    <p className="text-lg font-semibold">Apartment No: {apartmentDetails.apartmentNo}</p>
                    <p className="text-lg font-semibold">Rent: ${apartmentDetails.rent}</p>

                </div>

            </div>
        </div>
    );
};

export default ApartmentDetails;
