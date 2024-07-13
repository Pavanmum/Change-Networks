import React, { useState } from 'react'
import { Button,Flex } from 'antd'
import './Filter.css'



const Filter = ({title,size}) => {
  
    const boxStyle = {
        width: '100%',
        height: 90,
        borderRadius: 6,
        paddingTop: 0,
          // alignItems: 'center',
          // borderRadius: 6,
          // border: '1px solid #E0E0E0',
          paddingLeft: size,
        
      };

  return (
    <Flex style={boxStyle} justify="flex-start" gap="small" wrap align="center" >
        <Button   className="custom-button">{title}</Button>
        <Button  className="custom-button">{title}</Button>
        <Button  className="custom-button">{title}</Button>
        <Button  className="custom-button">{title}</Button>
       
      

    </Flex>
  )
}

export default Filter