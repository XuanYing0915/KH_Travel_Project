import React from "react";

class FoodPaymentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            receiveData: {
                shipping_method: '寄送到家',
                payment: '信用卡線上付款',
                receiver_name: '',
                receiver_phone: '',
                shipping_address: '',
                receiver_name: '',
                shipping_fee: '100',
                receiver_phone: ''
            }, userData: {
                receiver_name: this.props.username,
                shipping_address: this.props.useraddress,
                receiver_phone: this.props.userphone
            }
        };
        this.changeState = this.changeState.bind(this)
        this.memberState = this.memberState.bind(this)
        this.submitForm = this.submitForm.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)

    }
    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState((prevState) => ({
            receiveData: {
                ...prevState.receiveData,
                [name]: value,
            },
        }));
    };

    handleSyncWithUserData = () => {
        this.setState((prevState)=>({
            receiveData: { ...prevState.receiveData,
                receiver_name:this.state.userData.receiver_name ,
                receiver_phone:this.state.userData.receiver_phone ,
                shipping_address:this.state.userData.shipping_address },
        }));
    };

    changeState(event) {
        let changeName = event.target.id
        this.setState({ [changeName]: event.target.value })

    }
    memberState() {
        this.setState({ receiver_name: this.props.username })
    }

    submitForm(event) {
        event.preventDefault()
        // console.log(this.state)
        console.log(this.state.receiveData); // 打印 formData 对象，实际应用中需要发送到后端

        // try{
        //     const response = await fetch('./')
        // }
    }
    render() {
        const product_type = this.state.product_type
        // console.log({type})
        return (
            <form onSubmit={this.submitForm}>
                <div className="my-3">

                    {/* 美食商品 */}

                    <label>運送方式</label><br />
                    <select id="shipping_method" name="shipping_method" value={this.state.receiveData.shipping_method} onChange={this.handleInputChange}>
                        <option value="寄送到家">寄送到家(100元)</option>
                        <option value="超商取貨">超商取貨(60元)</option>
                    </select><br />
                    <label>付款方式</label><br />
                    <select id="payment" name="payment" value={this.state.receiveData.payment} onChange={this.handleInputChange}>
                        <option value="信用卡線上付款">信用卡線上付款</option>
                        <option value="超商代碼" >超商代碼付款</option>
                        <option value="貨到付款" >貨到付款</option>
                    </select><br />

                    <label>地址</label><br />
                    <input type="text" id="shipping_address" name="shipping_address" value={this.state.receiveData.shipping_address} onChange={this.handleInputChange} />
                    <br />

                    <label>姓名</label><br />
                    <input type="text" id="receiver_name" name="receiver_name"  value={this.state.receiveData.receiver_name} onChange={this.handleInputChange} /><br />
                    <label>連絡電話</label><br />
                    <input type="text" id="receiver_phone" name="receiver_phone" value={this.state.receiveData.receiver_phone} onChange={this.handleInputChange} /><br />
                    <input type="checkbox" onChange={this.handleSyncWithUserData} /><label>同會員資料</label>


                </div>
                <input type="submit" value="確定購買" />

            </form>
        )
    }

}

export default FoodPaymentForm;

