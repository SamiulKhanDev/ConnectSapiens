import React from 'react';
import styles from './StepName.module.css';
import Button from '../../../Components/SharedComponents/Button/Button'
const StepName = ({onClick}) => {
  return (
    <>
    <div>StepName</div>
    <Button text={"Next"} onClick={onClick} />
  </>
  )
}

export default StepName