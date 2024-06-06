import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const ManageCoupons = () => {
    const [coupons, setCoupons] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [currentCoupon, setCurrentCoupon] = useState({
        _id: '',
        code: '',
        discount: '',
        description: ''
    });

    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        try {
            const response = await fetch('https://jolly-home-server.vercel.app/coupons');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCoupons(data);
        } catch (error) {
            console.error('Error fetching coupons:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentCoupon({ ...currentCoupon, [name]: value });
    };

    const handleAddCoupon = async () => {
        const { _id, ...couponData } = currentCoupon;
        try {
            const response = await fetch('https://jolly-home-server.vercel.app/coupons', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(couponData)
            });

            const result = await response.json();
            if (result.acknowledged === true) {
                setShowAddModal(false);
                resetCurrentCoupon();
                Swal.fire({
                    title: "Success",
                    text: "Your coupon has been successfully added.",
                    icon: "success"
                });
                fetchCoupons();
            }
        } catch (error) {
            console.error('Error adding coupon:', error);
            Swal.fire({
                title: "Error",
                text: `Error adding coupon: ${error.message}`,
                icon: "error"
            });
        }
    };

    const handleDeleteCoupon = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`https://jolly-home-server.vercel.app/coupons/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const result = await response.json();
                if (result.acknowledged === true) {
                    fetchCoupons();
                    Swal.fire({
                        title: "Success",
                        text: "The coupon has been successfully deleted.",
                        icon: "success"
                    });
                }
            } catch (error) {
                console.error('Error deleting coupon:', error);
                Swal.fire({
                    title: "Error",
                    text: `Error deleting coupon: ${error.message}`,
                    icon: "error"
                });
            }
        }
    };

    const handleUpdateCoupon = async () => {
        try {
            const response = await fetch(`https://jolly-home-server.vercel.app/coupons/${currentCoupon._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(currentCoupon)
            });

            const result = await response.json();
            if (result.acknowledged === true) {
                setShowUpdateModal(false);
                resetCurrentCoupon();
                Swal.fire({
                    title: "Success",
                    text: "Your coupon has been successfully updated.",
                    icon: "success"
                });
                fetchCoupons();
            } else {
                throw new Error('Failed to update the coupon');
            }
        } catch (error) {
            console.error('Error updating coupon:', error);
            Swal.fire({
                title: "Error",
                text: `Error updating coupon: ${error.message}`,
                icon: "error"
            });
        }
    };

    const resetCurrentCoupon = () => {
        setCurrentCoupon({ _id: '', code: '', discount: '', description: '' });
    };

    return (
        <div className="p-2 md:p-6 w-full">
            <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">Manage Coupons</h1>
            <div className="flex justify-center mb-6">
                <button
                    className="btn btn-primary"
                    onClick={() => setShowAddModal(true)}
                >
                    Add Coupon
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full mx-auto max-w-6xl bg-white shadow-md rounded-lg">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Discount</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coupons.map((coupon) => (
                            <tr key={coupon._id}>
                                <td>{coupon.code}</td>
                                <td>{coupon.discount}%</td>
                                <td>{coupon.description}</td>
                                <td className='flex flex-wrap gap-2'>
                                    <button
                                        className="btn btn-outline btn-error btn-sm mr-2"
                                        onClick={() => handleDeleteCoupon(coupon._id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="btn btn-outline btn-primary btn-sm"
                                        onClick={() => {
                                            setCurrentCoupon(coupon);
                                            setShowUpdateModal(true);
                                        }}
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showAddModal && (
                <div className="modal modal-open">
                    <div className="modal-box w-11/12 max-w-4xl">
                        <h2 className="font-bold text-2xl mb-4 text-center">Add Coupon</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleAddCoupon();
                            }}
                        >
                            <div className="form-control mb-4">
                                <label className="label font-semibold">Coupon Code:</label>
                                <input
                                    type="text"
                                    name="code"
                                    value={currentCoupon.code}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="form-control mb-4">
                                <label className="label font-semibold">Discount Percentage:</label>
                                <input
                                    type="number"
                                    name="discount"
                                    value={currentCoupon.discount}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="form-control mb-4">
                                <label className="label font-semibold">Description:</label>
                                <textarea
                                    name="description"
                                    value={currentCoupon.description}
                                    onChange={handleInputChange}
                                    className="textarea textarea-bordered w-full"
                                    required
                                ></textarea>
                            </div>
                            <div className="modal-action flex justify-end">
                                <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                <button
                                    type="button"
                                    className="btn btn-outline"
                                    onClick={() => {
                                        setShowAddModal(false);
                                        resetCurrentCoupon();
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showUpdateModal && (
                <div className="modal modal-open">
                    <div className="modal-box w-11/12 max-w-4xl">
                        <h2 className="font-bold text-2xl mb-4 text-center">Update Coupon</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleUpdateCoupon();
                            }}
                        >
                            <div className="form-control mb-4">
                                <label className="label font-semibold">Coupon Code:</label>
                                <input
                                    type="text"
                                    name="code"
                                    value={currentCoupon.code}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="form-control mb-4">
                                <label className="label font-semibold">Discount Percentage:</label>
                                <input
                                    type="number"
                                    name="discount"
                                    value={currentCoupon.discount}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="form-control mb-4">
                                <label className="label font-semibold">Description:</label>
                                <textarea
                                    name="description"
                                    value={currentCoupon.description}
                                    onChange={handleInputChange}
                                    className="textarea textarea-bordered w-full"
                                    required
                                ></textarea>
                            </div>
                            <div className="modal-action flex justify-end">
                                <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                <button
                                    type="button"
                                    className="btn btn-outline"
                                    onClick={() => {
                                        setShowUpdateModal(false);
                                        resetCurrentCoupon();
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageCoupons;
