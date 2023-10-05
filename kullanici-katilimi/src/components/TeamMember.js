function TeamMember(props) {
    const { member, deleteUser, markMemberForEdit} = props;

    return (
        <div className="row my-2">
            <div data-cy="first-name" className="border border-primary-subtle col-2">{member.first_name}</div>
            <div data-cy="last-name" className="border border-primary-subtle col-2">{member.last_name}</div>
            <div data-cy="position" className="border border-primary-subtle col-3">{member.position}</div>
            <div data-cy="email" className="border border-primary-subtle col-3">{member.email}</div>
            <div data-cy="btn-edit" className="p-0 border border-primary-subtle col-1"><button onClick={()=>markMemberForEdit(member)} type="button" className="w-100 rounded-0 btn btn-success">Edit</button></div>
            <div data-cy="btn-delete" className="p-0 border border-primary-subtle col-1"><button onClick={()=>deleteUser(member.id)} type="button" className="w-100 rounded-0 btn btn-danger">Delete</button></div>
        </div>
    );
}

export default TeamMember;

/* <Card
          className="text-start"
          style={{
            width: "20%",
          }}
        >
          <CardBody>
            <CardTitle tag="h5">
              Firstname: {member["first-name"]} <br />
              Lastname: {member["last-name"]} <br />
            </CardTitle>
          </CardBody>

          <ListGroup flush>
            <ListGroupItem>E-mail: {member.email}</ListGroupItem>
            <ListGroupItem>Position: {member.position}</ListGroupItem>
          </ListGroup>

          <CardBody>
            <button onClick={()=>hMemberToBeEdited(member)} type="button" className="btn btn-success">Edit</button>
          </CardBody>

        </Card> */