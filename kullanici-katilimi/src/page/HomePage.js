import { useEffect } from "react";
import TeamMember from "../components/TeamMember"

function HomePage(props) {
    const {teamList, deleteUser, markMemberForEdit} = props;

    useEffect(() => {
        markMemberForEdit(null);
    }, [markMemberForEdit])
    return (
        <div className="container text-start text-break gap-5">
            <div className="row my-2">
                <div className="border border-primary-subtle col-2">Firstname</div>
                <div className="border border-primary-subtle col-2">Lastname</div>
                <div className="border border-primary-subtle col-3">Position</div>
                <div className="border border-primary-subtle col-3">E-mail</div>
                <div className="border border-primary-subtle col-1"></div>
                <div className="border border-primary-subtle col-1"></div>
            </div>

            {
                teamList.map( member =>
                            <TeamMember 
                                key={member.id}
                                deleteUser={deleteUser}
                                markMemberForEdit={markMemberForEdit} 
                                member={member}
                            />
                            )
            }
        </div>
    )
}

export default HomePage;


/* <div className="container d-flex flex-wrap justify-content-start">
{teamList.map((member) => <TeamMember hMemberToBeEdited={hMemberToBeEdited} key={member.id} member={member}/>)}
</div> */