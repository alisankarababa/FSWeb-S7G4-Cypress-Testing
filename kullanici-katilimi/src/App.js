import './App.css';
import SignUp from './page/SignUp';
import HomePage from './page/HomePage';
import Header from './components/Header';
import { Route } from "react-router-dom";
import { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const initialTeamList = [];

function App() {
    const [teamList, setTeamList] = useState(initialTeamList);
    const [memberToBeEdited, setMemberToBeEdited] = useState(null);
    const history = useHistory();

    function hTeamList(member) {
        const newTeamList = [...teamList];
        newTeamList.push({...member});
        setTeamList(newTeamList);
    }

    function markMemberForEdit(member)
    {
        setMemberToBeEdited(member);
        if(member)
            history.push("/signup");
    }

    function deleteUser(id) {

        const idxFound = teamList.findIndex((user) => user.id === id);

        const newTeamList = [...teamList];
        newTeamList.splice(idxFound, 1);
        setTeamList(newTeamList);
    }
    

    function hEditMember(member)
    {
        setMemberToBeEdited(null);
        const newTeamList = [...teamList];
        const idxFound = newTeamList.findIndex(teamMember => teamMember.id === member.id);
        
        try {

            newTeamList.splice(idxFound, 1, member);

        } catch (error) {
            
            console.log("Error", error, "note: Member id should be found in newTeamList. There has to be some error where id is set.");

        }

        setTeamList(newTeamList);
    }


    return (
    <div className="App">
        <Route exact path="/">
            <Header/>
            <HomePage
                deleteUser={deleteUser}
                markMemberForEdit={markMemberForEdit} 
                teamList={teamList}/>
        </Route>
        <Route exact path="/signup">
            <SignUp 
                memberToBeEdited={memberToBeEdited}
                eMailList={teamList.map(member => member.email).filter(email => email !== memberToBeEdited?.email)} 
                hEditMember={hEditMember}
                hTeamList={hTeamList}
            />
        </Route>
    </div>
    );
}

export default App;
