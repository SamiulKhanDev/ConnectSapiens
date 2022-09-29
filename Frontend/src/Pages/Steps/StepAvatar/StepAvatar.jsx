import React from 'react';
import styles from './StepAvatar.module.css';
import Button from '../../../Components/SharedComponents/Button/Button'
const StepAvatar = ({onClick}) => {
  return (
    <>
    <div>StepName</div>
    <Button text={"Next"} onClick={onClick} />
  </>
  )
}

export default StepAvatar