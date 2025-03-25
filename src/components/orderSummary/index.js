import React from 'react'
import { Button, List } from 'antd'

function OrderSummary({subTotal= 0, tax = 0}) {
  return (
    <div className='summary'>
        <h5>SUMMARY</h5>
        <div className="summaryinner">
            <List
                                itemLayout="horizontal"                           
                            >
                                <List.Item >
                                    <List.Item.Meta
                                    title={<div className='summaryList'> <span>Subtotal</span> <span>{subTotal}</span></div>}/>
                                </List.Item>
                                <List.Item  >
                                    <List.Item.Meta
                                    title={<div className='summaryList'> <span>Tax 0%</span> <span>{tax}</span></div>}/>
                                </List.Item>
                                <List.Item  >
                                    <List.Item.Meta
                                    title={<div className='summaryList'> <span>Grand Total</span> <span>{subTotal + tax}</span></div>}/>
                                </List.Item>
            </List>

            {/* <Button className='mainbtn'>Proceed To Checkout</Button> */}
        </div>
    </div>
  )
}

export default OrderSummary