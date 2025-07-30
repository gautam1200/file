import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { Field, Form, Formik } from "formik";

function Apitest() {
    const key = "YkfcmCAUg4ZkGlet";

    const [ini, setini] = useState({
        name: "",
        surname: "",
        email: "",
        number: ""
    });

    const [data, setdata] = useState([]);
    const [edit, seteditId] = useState(null);

    const handleSubmit = (values, { resetForm }) => {
        const { id, ...rest } = values;
        if (edit != null) {
            axios.patch(`https://generateapi.onrender.com/api/Apitest/${edit}`, rest, {
                headers: {
                    Authorization: key
                }
            })
                .then((res) => {
                    setini({
                        name: "",
                        surname: "",
                        email: "",
                        number: ""
                    })
                    console.log("hello");
                    dataView()
                    resetForm()
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        else {
            axios
                .post("https://generateapi.onrender.com/api/Apitest", values, {
                    headers: {
                        Authorization: key
                    }
                })
                .then((res) => {
                    console.log(res.data.Status);
                    dataView()
                    resetForm();
                })
                .catch((err) => {
                    console.log(err);
                });
        };
    }

    const dataView = () => {
        axios.get('https://generateapi.onrender.com/api/Apitest', {
            headers: {
                Authorization: key
            }
        })
            .then((res) => {
                console.log(res.data.Data);

                setdata(res.data.Data)
            })
            .catch((error) => {
                console.log(error);
                console.log("ppppp");

            })
    }

    const deleteData = (id) => {
        axios.delete(`https://generateapi.onrender.com/api/Apitest/${id}`, {
            headers: {
                Authorization: key
            }
        })
            .then((res) => {
                console.log(res.data.Status);
                dataView()

            })
            .catch((error) => {
                console.log(error);

            })
    }

    const updateData = (item) => {
        setini(item)
        seteditId(item._id)
    }

    useEffect(() => {
        dataView()
    }, [])


    return (
        <>
            <Formik
                enableReinitialize
                initialValues={ini}
                onSubmit={handleSubmit}>
                <Form>
                    <Field name="name" component="input" type="text" /> <br /><br />
                    <Field name="surname" component="input" type="text" /> <br /> <br />
                    <Field name="email" component="input" type="email" /> <br /> <br />
                    <Field name="number" component="input" type="number" /> <br /> <br />
                    <Button type="submit" variant="contained">
                        SUBMIT
                    </Button><br /><br />
                </Form>
            </Formik>
            <table border={5}>
                <tr>
                    <th>Id</th>
                    <th>NAME</th>
                    <th>SURNAME</th>
                    <th>EMAIL</th>
                    <th>NUMBER</th>
                    <th>DELETE</th>
                    <th>EDIT</th>
                </tr>
                {data.map((i, index) => (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{i.name}</td>
                        <td>{i.surname}</td>
                        <td>{i.email}</td>
                        <td>{i.number}</td>
                        <td><button onClick={() => deleteData(i._id)}>delete</button></td>
                        <td><button onClick={() => updateData(i)}>edit</button></td>
                    </tr>
                ))}
            </table>
        </>
    );
}

export default Apitest;




// YkfcmCAUg4ZkGlet


// https://generateapi.onrender.com/api/Apitest