import React from "react";

class TicketPaymentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            receiveData: {
                shipping_method: '無實體商品',
                payment: '信用卡線上付款',
                receiver_name: '',
                receiver_phone: '',
                shipping_address: '',
                receiver_name: '',
                shipping_fee: '0',
                receiver_phone: ''
            }, userData: {
                receiver_name: this.props.username,
                shipping_address: this.props.useraddress,
                receiver_phone: this.props.userphone
            }
        };
        this.changeState = this.changeState.bind(this)
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

    submitForm(event) {
        event.preventDefault()
        console.log(this.state.receiveData); 

        // try{
        //     const response = await fetch('./')
        // }
    }
    render() {
        const product_type = this.state.product_type
        return (
            <form onSubmit={this.submitForm}>
                <div className="my-3">

                    
                    <label>付款方式</label>
                    <select id="payment" name="payment" value={this.state.receiveData.payment} onChange={this.handleInputChange}>
                        <option value="信用卡線上付款">信用卡線上付款</option>
                        <option value="ATM付款" >ATM付款</option>
                    </select><br />

                    <label>姓名</label>
                    <input type="text" id="receiver_name" value={this.state.receiveData.receiver_name} onChange={this.handleInputChange} /><br />
                    <label>連絡電話</label>
                    <input type="text" id="receiver_phone" name="receiver_phone" value={this.state.receiveData.receiver_phone} onChange={this.handleInputChange}  /><br />
                    <input type="checkbox" onChange={this.handleSyncWithUserData}  /><label>同會員資料</label>


                </div>
                <input type="submit" value="確定購買" />

            </form>
        )
    }

}

export default TicketPaymentForm;

