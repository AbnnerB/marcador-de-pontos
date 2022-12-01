import { AiFillDelete } from "react-icons/ai";
import { BsBookmarkDash, BsBookmarkPlus } from "react-icons/bs";

export default function MarkerCard({
  index,
  nameUser,
  idButton,
  pontos,
  deleteContainerInfo,
  lessOnePoint,
  moreOnePoint,
}) {
  return (
    <section key={index} className="containerInfo">
      <div className="nameAndDeletteButton">
        <p className="titleName">{nameUser}</p>
        <button
          className="deleteButton"
          //   onClick={() => deleteContainerInfo(idButton)}
        >
          <AiFillDelete />
        </button>
      </div>
      <div className="spots">
        <button
        // onClick={lessOnePoint(idButton)}
        >
          <BsBookmarkDash />
        </button>
        <span>{pontos}</span>
        <button
        // onClick={moreOnePoint(idButton)}
        >
          <BsBookmarkPlus />
        </button>
      </div>
    </section>
  );
}
