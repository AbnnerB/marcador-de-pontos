import { AiFillDelete } from "react-icons/ai";
import { BsBookmarkDash, BsBookmarkPlus } from "react-icons/bs";

export default function MarkerCard({
  item,
  deleteContainerInfo,
  lessOnePoint,
  moreOnePoint,
}) {
  return (
    <section className="containerInfo">
      <div
        className="nameAndDeletteButton"
        style={{ color: item.colorName, backgroundColor: item.backgroundName }}
      >
        <p className="titleName">{item.name}</p>
        <button
          className="deleteButton"
          style={{ color: item.colorDeleteButton }}
          onClick={() => deleteContainerInfo(item.id)}
        >
          <AiFillDelete />
        </button>
      </div>
      <div className="spots" style={{ backgroundColor: item.backgroundPoints }}>
        <div className="spotsFlex">
          <button onClick={() => lessOnePoint(item.id)}>
            <BsBookmarkDash />
          </button>
          <span>{item.spots}</span>
          <button onClick={() => moreOnePoint(item.id)}>
            <BsBookmarkPlus />
          </button>
        </div>
        {item.spots > 0 && <p>Ultima Marcação: {item.date} </p>}
      </div>
    </section>
  );
}
