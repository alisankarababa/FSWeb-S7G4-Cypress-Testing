import { useEffect, useState} from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Form, FormGroup, Label, Input,  Col } from "reactstrap";
import * as Yup from "yup"
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";



const initialFormData = {
    first_name: "",
    last_name: "",
    position: "",
    email: "",
    password: "",
    terms: false,
}

function SignUpForm(props) {

    const [formData, setFormData] = useState(initialFormData);
    const [formErrors, setFormErrors] = useState({
        first_name: false,
        last_name: false,
        position: false,
        email: false,
        password: false,
        terms: false,
    });
    const [isFormDataValid, setIsFormDataValid] = useState(false);
    const {memberToBeEdited, hEditMember, eMailList, hTeamList} = props;
    
    
    const formSchema = Yup.object().shape({
        first_name: Yup
            .string()
            .required("Firstname cannot be empty.")
            .min(3, "Firstname cannot be shorter than 3 characters."),
        last_name: Yup
            .string()
            .required("Lastname cannot be empty.")
            .min(3, "Lastname cannot be shorter than 3 characters."),
        position: Yup
            .string()
            .required("Position is required.")
            .oneOf(["Backend Engineer", "Frontend Engineer", "Design Engineer"], "You must a select position."),
        email: Yup
          .string()
          .required("E-mail cannot be empty.")
          .email("Must be a valid email address.")
          .notOneOf(eMailList,"This email is already taken"),
        password: Yup
          .string()
          .required("Password cannot be empty.")
          .min(6, "Passwords must be at least 6 characters long."),
        terms: Yup
          .boolean()
          .oneOf([true], "You must accept Terms and Conditions.")
          // required isn't required for checkboxes.
    });
    
    useEffect(() => {
        formSchema
            .isValid(formData)
            .then((valid) => {setIsFormDataValid(valid)});
    }, [formSchema, formData]);


    const history = useHistory();

    function hChange(event) {
        const key = event.target.name;
        const value = ("checkbox" === event.target.type ?  event.target.checked : event.target.value);
        const newFormData = {...formData, [key]: value}
        
        Yup.reach(formSchema, key)
		.validate(value)
		.then(valid => { setFormErrors({ ...formErrors, [key]: false }); })
		.catch(err => { setFormErrors({ ...formErrors, [key]: err.errors[0] }); });

        // console.log({[key]: value});
        // formSchema.validate({[key]: value})
        // .then((valid) => {setFormErrors((prevErrors) => ({ ...prevErrors, [key]: "" }));})
        // .catch((error) => {
        //     console.log(error.name);
        //     console.log(error.errors);
        //     setFormErrors({ ...formErrors, [key]: error.errors[0] });
        // });

        setFormData(newFormData);
    }

    function hSubmit(event)
    {
        event.preventDefault();
        
        if(!isFormDataValid)
        {
            toast.error("INPUT IS NOT VALID");
            return;
        }
        if(!memberToBeEdited) {
            axios.post("https://reqres.in/api/users", formData)
            .then((response) => {
                hTeamList(response.data);
                toast.success(`Signed up: ${response.data.first_name} ${response.data.last_name}`);
            })
            .catch((error) => {
                toast.error(error.message);
            });
        }
        else {
            toast.success(`Updated: ${formData.first_name} ${formData.last_name}`);
            hEditMember(formData);
        }
        setFormData(initialFormData);
    }

    useEffect(() => {
        if(memberToBeEdited) {
            setFormData(memberToBeEdited);
        }
    }, [memberToBeEdited])

    return (
        // <form onSubmit={hSubmit} className="container w-50 m-auto mt-5 text-start">
        //     <div className="row">
        //         <label className="col-4" htmlFor="first-name">Firstname: </label>
        //         <input className="col-8" onChange={hChange} type="text" id="first-name" name="first-name" value={formData["first-name"]}/><br/>
        //     </div>

        //     <div className="row">
        //         <label className="col-4" htmlFor="last-name">Lastname: </label>
        //         <input className="col-8" onChange={hChange} type="text" id="last-name" name="last-name" value={formData["last-name"]}/><br/>
        //     </div>

        //     <div className="row">
        //         <label className="col-4" htmlFor="email">E-mail: </label>
        //         <input className="col-8" onChange={hChange} type="email" id="email" name="email" value={formData["email"]}/><br/>
        //     </div>

        //     <div className="row">
        //         <input className="col-4" onChange={hChange} type="radio" id="backend-engineer" name="position" value="backend-engineer" checked={formData["position"] === "backend-engineer"}/>
        //         <label className="col-8" htmlFor="backend-engineer">Backend Engineer</label><br/>
        //     </div>
        //     <div className="row">
        //         <input className="col-4" onChange={hChange} type="radio" id="frontend-engineer" name="position" value="frontend-engineer" checked={formData["position"] === "frontend-engineer"}/>
        //         <label className="col-8" htmlFor="frontend-engineer">Frontend Engineer</label><br/>
        //     </div>
        //     <div className="row">
        //         <input className="col-4" onChange={hChange} type="radio" id="designer" name="position" value="designer" checked={formData["position"] === "designer"}/>
        //         <label className="col-8" htmlFor="designer">Designer</label><br/>
        //     </div>

        //     <div className="row">
        //         <div className="col-8"></div>
        //         <input className="col-2 btn btn-success" type="submit" value="Submit"/>
        //         <Link className="col-2" to="/"><button onClick={() => hMemberToBeEdited(null)} type="button" className="btn btn-primary">Home Page</button></Link>
        //     </div>
        // </form>
        <>
        <ToastContainer/>
        <Form onSubmit={hSubmit} className="container col-sm-12 col-md-10 col-lg-8 col-xl-6 col-xxl-4 mt-5 text-start">
            <FormGroup row>
                <Label sm={2} htmlFor="first_name">Firstname: </Label>
                <Col sm={10}>
                    <Input data-cy="input-first-name" onChange={hChange} type="text" id="first_name" name="first_name" value={formData.first_name}/>
                </Col>
                <Col sm={{offset: 2, size: 10}}>
                {formErrors.first_name && <div data-cy="error" className="text-danger">{formErrors.first_name}</div>}
                </Col>
            </FormGroup>
            
            <FormGroup row>
                <Label sm={2} htmlFor="last_name">Lastname: </Label>
                <Col sm={10}>
                    <Input data-cy="input-last-name" onChange={hChange} type="text" id="last_name" name="last_name" value={formData.last_name}/>
                </Col>
                <Col sm={{offset: 2, size: 10}}>
                    {formErrors.last_name && <div data-cy="error" className="text-danger">{formErrors.last_name}</div>}
                </Col>
            </FormGroup>
            
            <FormGroup row>
                <Label htmlFor="position" sm={2}> Position </Label>
                <Col sm={10}>
                    <Input
                        data-cy="input-position"
                        id="position"
                        name="position"
                        type="select"
                        value={formData.position}
                        onChange={hChange}
                    >
                      <option>Please select a position</option>
                      <option>Backend Engineer</option>
                      <option>Frontend Engineer</option>
                      <option>Design Engineer</option>
                    </Input>
                </Col>
                <Col sm={{offset: 2, size: 10}}>
                        
                {formErrors.position && <div data-cy="error" className="text-danger">{formErrors.position}</div>}
                </Col>
            </FormGroup>

            <FormGroup row>
                <Label sm={2} htmlFor="email">E-mail: </Label>
                <Col sm={10}>
                    <Input data-cy="input-email" onChange={hChange} type="email" id="email" name="email" value={formData.email}/>
                </Col>
                <Col sm={{offset: 2, size: 10}}>
                {formErrors.email && <div data-cy="error" className="text-danger">{formErrors.email}</div>}
                </Col>
            </FormGroup>

            <FormGroup row>
                <Label sm={2} htmlFor="password">Password: </Label>
                <Col sm={10}>
                    <Input data-cy="input-password" onChange={hChange} type="password" id="password" name="password" value={formData.password}/>
                </Col>
                <Col sm={{offset: 2, size: 10}}>
                {formErrors.password && <div data-cy="error" className="text-danger">{formErrors.password}</div>}
                </Col>
            </FormGroup>

            <FormGroup row>
                <Col sm={{offset:2, size:10}}>
                    <Input data-cy="input-terms" onChange={hChange} type="checkbox" id="terms" name="terms" value="terms" checked={formData.terms}/>
                    {' '}
                    <Label htmlFor="terms">Terms</Label>
                </Col>
                <Col sm={{offset: 2, size: 10}}>
                    {formErrors.terms && <div data-cy="error" className="text-danger">{formErrors.terms}</div>}
                </Col>
            </FormGroup>

            <FormGroup row>
                <Col sm={{ offset: 2, size: 10}}>
                    <div className="d-grid gap-1 col-12">
                        <input data-cy="submit" disabled={!isFormDataValid} className="btn btn-success" type="submit" value="Submit"/>
                        <button data-cy="btn-homepage" onClick={() => history.push("/")}type="button" className="btn btn-primary">Home Page</button>
                    </div>
                </Col>
            </FormGroup>
        </Form>
        </>
    )
}


export default SignUpForm;