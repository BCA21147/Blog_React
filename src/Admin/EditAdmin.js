import React, { useEffect, useState } from 'react'
import HeaderAdmin from './HeaderAdmin';
import FooterAdmin from './FooterAdmin';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditAdmin = () => {

    const { id } = useParams();

    var nav = useNavigate();

    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [pass, setpass] = useState('');
    const [cpass, setcpass] = useState('');

    useEffect(() => {
        axios.get(`https://cute-gray-ant-suit.cyclic.app/admin/get_single_admin/${id}`, {
            headers: {
                Authorization: document.cookie.split('=')[1]
            }
        })
            .then((res) => {
                setname(res.data.data.username); setemail(res.data.data.email); setpass(res.data.data.password); setcpass(res.data.data.password);
            })
    }, [])

    const handleInput = (e) => {
        if (e.target.name == "name") { setname(e.target.value); }
        if (e.target.name == "email") { setemail(e.target.value); }
        if (e.target.name == "pass") { setpass(e.target.value); }
        if (e.target.name == "cpass") { setcpass(e.target.value); }
    }
    const submitData = (e) => {
        e.preventDefault();
        if (pass == cpass) {
            axios.post(`https://cute-gray-ant-suit.cyclic.app/admin/update_admin/${id}`,
                {
                    name: name,
                    email: email,
                    password: pass
                }, {
                headers: {
                    Authorization: document.cookie.split('=')[1]
                }
            }
            )
                .then((res) => {
                    if (res.data.data = [] && res.data.Token == 'Expire') {
                        nav('/admin');
                    }
                    alert("ADMIN - EDIT Successfully."); setname(''); setemail(''); setpass(''); setcpass('');
                })
                .catch((err) => { console.log(err); })
            nav('/admin/view_admin');
        }
        else {
            alert('PassWord Are Not Match..!');
        }
    }

    return (
        <div className='hold-transition sidebar-mini'>
            <div class="wrapper">
                <HeaderAdmin active={'edit_admin'} />
                <div className="content-wrapper d-flex justify-content-center flex-column">

                    <div className="row m-0 p-5 d-flex justify-content-center">
                        <div className="col-md-7">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title w-100 text-center">EDIT-ADMIN Example</h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                <form onSubmit={submitData} autoComplete='off'>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Name</label>
                                            <input type="text" value={name} name='name' onChange={handleInput} required className="form-control" id="exampleInputEmail1" placeholder="Enter Name" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Email Id</label>
                                            <input type="email" value={email} name='email' onChange={handleInput} required className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword1">Password</label>
                                            <input type="password" minLength={8} value={pass} name='pass' onChange={handleInput} required className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword1">Confirm Password</label>
                                            <input type="password" minLength={8} value={cpass} name='cpass' onChange={handleInput} required className="form-control" id="exampleInputPassword1" placeholder="Confirm Password" />
                                        </div>
                                    </div>
                                    {/* /.card-body */}
                                    <div className="card-footer d-flex justify-content-center">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
                <FooterAdmin />
            </div>
        </div>
    )
}

export default EditAdmin