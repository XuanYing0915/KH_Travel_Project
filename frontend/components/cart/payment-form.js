import React from "react";

class PaymentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shipping_method: '寄送到家',
            payment: '信用卡線上付款',
            receiver_name: '',
            receiver_phone: '',
            shipping_address: ''
        };
        this.changeState = this.changeState.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }
    changeState(event) {
        let changeName = event.target.id
        this.setState({ [changeName]: event.target.value })
        
    }
    
    submitForm(event) {
        event.preventDefault()
    }
    render() {
        return (
            <form onSubmit={this.submitForm}>
                <div className="my-3">
                    <label>運送方式</label>
                    <select id="shipping_method" value={this.state.shipping_method} onChange={this.changeState}>
                        <option value="寄送到家">寄送到家</option>
                        <option value="超商取貨">超商取貨</option>
                        <option value="無實體商品">無實體商品</option>
                    </select><br />
                    <label>付款方式</label>
                    <select id="payment" value={this.state.payment} onChange={this.changeState}>
                        <option value="信用卡線上付款">信用卡線上付款</option>
                        <option value="超商代碼" >超商代碼</option>
                        <option value="貨到付款" >貨到付款</option>
                    </select><br />
                    <label>收貨人姓名</label>
                    <input type="text" id="receiver_name" onChange={this.changeState}/><br />
                    <label>連絡電話</label>
                    <input type="text" id="receiver_phone" onChange={this.changeState}/><br />
                    <label>地址</label>
                    <input type="text" id="shipping_address" onChange={this.changeState}/>
                </div>
                <input type="submit" value="確定購買" />

            </form>
        )
    }

}

export default PaymentForm;

