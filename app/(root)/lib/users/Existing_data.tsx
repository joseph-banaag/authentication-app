import React from 'react'

interface Existing_dataProps {
    existing_info: {
        username: string;
        email: string;
    };
}
export const Existing_data: React.FC<Existing_dataProps> = ({existing_info}) => {

    console.log(existing_info.username)
    console.log(existing_info.email)
    return (
        <div>Existing_data</div>
    )
}
