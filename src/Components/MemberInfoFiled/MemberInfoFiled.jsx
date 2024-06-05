import React from 'react';

const MemberInfoFiled = ({ label, value }) => {
    return (
        <div>
            <div>
                <label className='block mb-2'>{label}:</label>
                <input className='outline-none p-2 w-full border-2 border-blue-100 rounded-md' type="text" value={value || ''} readOnly />
            </div>

        </div>
    );
};

export default MemberInfoFiled;