import axios from "axios";
import React,{Component} from "react";
import "./New.css";

class newbook extends Component{
    state = {
        data:[]
    }

    componentDidMount(){
        axios.get('http://localhost:8080/show')
        .then(response =>{
            this.setState({
                data:response.data
                
            });
            console.log(response)
        })
        .catch(error =>{
            console.log(error);
        });
    }

    render(){
        return(
            <table border={1}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>booknumber</th>
                        <th>bookname</th>
                        <th>date</th>
                        <th>mobilenumber</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.data.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.booknumber}</td>
                            <td>{user.bookname}</td>
                            <td>{user.date}</td>
                            <td>{user.mobilenumber}</td>
                            <td>{user.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default newbook;