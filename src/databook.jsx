import React, { Component } from "react";
import axios from "axios";
import './Table.css';

class Databook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:"",
            bName:"",
            bNum:"",
            date:"",
            mob:"",
            name:"",       
            Data: [], 
        };
    }

    componentDidMount() {
        axios.get("http://localhost:8080/show").then((response) => {
            this.setState({ Data: response.data });
        });
    }

    handleid = (event) =>{
        this.setState({ id : event.target.value});
    };
    handlebName = (event) =>{
        this.setState({ bName: event.target.value});
    };
    handlebNum= (event) =>{
        this.setState({ bNum : event.target.value});
    };
    handledate = (event) =>{
        this.setState({ date : event.target.value});
    };
    handlemob = (event) =>{
        this.setState({ mob: event.target.value});
    };
    handlename = (event) =>{
        this.setState({ name : event.target.value});
    };



    handleSubmit = (event) => {
        event.preventDefault();
        const data ={
            id :this.state.id,
            bName :this.state.bName,
            bNum: this.state.bNum,
            date: this.state.date,
            mob: this.state.mob,
            name: this.state.name,
        };


        console.log(data);
        axios.post("http://localhost:8080/addStudent", data).then((response) => {
            this.setState({
                Data: [...this.state.Data, response.data],
                id:"",
                bName:"",
                bNum:"",
                date:"",
                mob:"",
                name:"", 
            });
        });
    };

    handleUpdate = (id, data) => {
        // Send PUT request to update fuel data with the given ID
        axios.put(`http://localhost:8080/update/${id}`, data).then((response) => {
            // Update the state to reflect the updated fuel data
            const updatedData = this.state.Data.map((Books) => {
                if (Books.id === response.data.id) {
                    return response.data;
                } else {
                    return Books;
                }
            });
            this.setState({ Data: updatedData });
        });
    };

    handleDelete = (id) => {
        // Send DELETE request to remove fuel data with the given ID
        axios.delete(`http://localhost:8080/delete/${id}`)
        window.location.reload().then((response) => {
            // Update the state to remove the deleted fuel data
            const updatedData = this.state.Data.filter(
                (Books) => Books.id !== id
            );
            this.setState({ Data: updatedData });
        });
    };

    handleEdit = (data) => {
        this.setState({
            id: data.id,
            bName: data.bName,
            bNum: data.bNum,
            date: data.date,
            mob: data.mob,
            name: data.name,
            isEdit: true,
        });
        console.log(this.state.id);
    };

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value,
        });
    };


    handleUpdate = (event) => {
        event.preventDefault();
        const data = {
            id: this.state.id,
            bName: this.state.bName,
           bNum: this.state.bNum,
           date: this.state.date,
            mob: this.state.mob,
            name: this.state.name,
        };
        const id = this.state.id;
        axios
            .put(`http://localhost:8080/update/${id}`, data)
            window.location.reload()
            .then((res) => {
                console.log(res.data);
                this.setState({
                    id:"",
                    bName:"",
                    bNum:'',
                    date:'',
                    mob:'',

                });
                this.props.history.push("/");
            })
            .catch((err) => console.log(err));
    };






    render() {
        return (

            <div>
               <form onSubmit={this.handleSubmit} className="books" >
               <label className="library management">id</label>

               <input
               className="books"
               type="number"
               value={this.state.handleid}
               onChange={this.handleid}
               />

               <br></br><br></br>

               <label className="login-label">bookname</label>
               <input
               className="books"
               type="text"
               value={this.state.bName}
               onChange={this.handlebName}
               />
                
                <br></br><br></br>

               <label className="login-label">book number</label>
               <input
               className="books"
               type="number"
               value={this.state.bNum}  
               onChange={this.handlebNum}
               />

<br></br><br></br>

               <label className="login-label">date</label>
               <input
               className="books"
               type="date"
               value={this.state.date}
               onChange={this.handledate}
               />

<br></br><br></br>

               <label className="login-label">mobilenumber</label>
               <input
               className="books"
               type="text"
               value={this.state.mobilenumber}
               onChange={this.handlemob}
               />

<br></br><br></br>

               <label className="login-label">name</label>
               <input
               className="books"
               type="text"
               value={this.state.name}
               onChange={this.handlename}
               />

<br></br><br></br>

               <button className="submitt" type="submit" id="asd">
Submit
               </button>
               <br></br><br></br>
               </form>

                <table className="output">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Book Name</th>
                            <th>book Number</th>
                            <th>Date</th>
                            <th>Mobile Number</th>
                            <th>Name</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.Data.map((data) => (
                            <tr key={data.id}>
                                <td>{data.id}</td>
                                <td>{data.bName}</td>
                                <td>{data.bNum}</td>
                                <td>{data.date}</td>
                                <td>{data.mob}</td>
                                <td>{data.name}</td>
                                <td>
                                    <button onClick={() => this.handleEdit(data)}>Edit</button>
                                </td>

                                <td>
                                    <button
                                        onClick={() => this.handleDelete(data.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br></br><br></br><br></br><br></br>
                <form onSubmit={this.handleUpdate}>
                    <input type="hidden" name="id" value={this.state.id} />
                    <label>Book Name:</label>
                    <input
                        type="text"
                        name="bName"
                        value={this.state.bName}
                        onChange={this.handleInputChange}
                    />
                    <br />
                    <label>Book Number:</label>
                    <input
                        type="text"
                        name="bNum"
                        value={this.state.bNum}
                        onChange={this.handleInputChange}
                    />
                    <br />
                    <label>Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={this.state.date}
                        onChange={this.handleInputChange}
                    />
                    <br />
                    <label>Mobile Number:</label>
                    <input
                        type="text"
                        name="mob"
                        value={this.state.mob}
                        onChange={this.handleInputChange}
                    />
                    <br />
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleInputChange}
                    />
                    <br />
                    <button type="submit">Save</button>
                    <button onClick={this.handleCancel}>Cancel</button>
                </form>        </div>

        );
    }
}
export default Databook;