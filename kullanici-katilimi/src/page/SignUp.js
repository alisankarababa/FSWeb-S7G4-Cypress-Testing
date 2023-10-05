
import SignUpForm from "../components/SignUpForm"

function SignUp(props) {
    const {memberToBeEdited, hEditMember, eMailList, hTeamList} = props;

    return (
        <SignUpForm
            memberToBeEdited={memberToBeEdited}
            hEditMember={hEditMember} 
            eMailList={eMailList}  
            hTeamList={hTeamList}
        />
    )
}

export default SignUp;