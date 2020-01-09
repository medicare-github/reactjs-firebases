import React from 'react';

const Button = ({title,onClick,loading}) => {
    if (loading) {
        return <button >Lagi Loading</button>
    }
    return (
        <button onClick={onClick}>{title}</button>
    )
}
export default Button;