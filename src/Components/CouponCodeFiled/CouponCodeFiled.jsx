 
import React from 'react';

const CouponCodeFiled = ({ value, onChange, onApplyCoupon }) => {
    return (
        <div>
            <div>
                <label className='block mb-2'>Coupon Code:</label>
                <div className='flex'>
                    <input className='outline-none p-2 w-full border-2 border-blue-100 rounded-l-md' type="text" value={value} onChange={onChange} />
                    <button type="button" className='bg-green-500 font-bold text-white p-2 rounded-r-md' onClick={onApplyCoupon}>Apply Coupon</button>
                </div>
            </div>
        </div>
    );
};

export default CouponCodeFiled;