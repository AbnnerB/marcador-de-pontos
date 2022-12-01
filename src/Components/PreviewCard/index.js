import { AiFillDelete } from "react-icons/ai";
import { BsBookmarkDash, BsBookmarkPlus } from "react-icons/bs";

export default function PreviewCard({
  nameUser,
  colorName,
  backgroundName,
  backgroundPoints,
  colorDeleteButton,
}) {
  return (
    <section className="containerInfo">
      <div
        className="nameAndDeletteButton"
        style={{ color: colorName, backgroundColor: backgroundName }}
      >
        <p className="titleName">{nameUser}</p>
        <button className="deleteButton" style={{ color: colorDeleteButton }}>
          <AiFillDelete />
        </button>
      </div>
      <div className="spots" style={{ backgroundColor: backgroundPoints }}>
        <button>
          <BsBookmarkDash />
        </button>
        <span>0</span>
        <button>
          <BsBookmarkPlus />
        </button>
      </div>
    </section>
  );
}
