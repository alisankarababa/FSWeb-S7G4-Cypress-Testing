import { Link } from "react-router-dom/cjs/react-router-dom.min";


function Header() {
    return (

        <header className="my-4">
            <Link data-cy="btn-signuppage" to="/signup"><button data-cy="add-member" type="button" className="btn btn-success">Add Member</button></Link>
        </header>
    )
}

export default Header;