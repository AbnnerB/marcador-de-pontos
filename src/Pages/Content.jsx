import { useEffect, useState } from "react";

import "./styles.css";

import MarkerCard from "../Components/MarkerCard/MarkerCard";
import PreviewCard from "../Components/PreviewCard";

export default function Content() {
  const [names, setNames] = useState("");
  // const [points, setPoints] = useState(0);
  const points = 0;
  const [ids, setIds] = useState(0);

  const [colorName, setColorName] = useState("");
  const [backgroundName, setBackgroundName] = useState("");
  const [backgroundPoints, setBackgroundPoints] = useState("");
  const [colorDeleteButton, setColorDeleteButton] = useState("");

  const [showContainer, setShowContainer] = useState(false);

  const [arrayContainerInfo, setArrayContainerInfo] = useState(
    () => JSON.parse(localStorage.getItem("arrayContainerInfoLocal")) || []
  );

  useEffect(() => {
    localStorage.setItem(
      "arrayContainerInfoLocal",
      JSON.stringify(arrayContainerInfo)
    );
  }, [arrayContainerInfo]);

  useEffect(() => {
    let storedArray = JSON.parse(
      localStorage.getItem("arrayContainerInfoLocal")
    );
    let getId = storedArray.map((task) => {
      return task.id;
    });

    let lastId = getId[getId.length - 1];

    setIds(lastId + 1 || 0);
  }, []);

  function showContainerCreateMarker() {
    if (showContainer === false) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    setShowContainer(!showContainer);
  }

  function addContainerInfo() {
    if (names.length < 1) {
      alert("Preencha o campo de textos");
      return;
    }

    const newObj = {
      id: ids,
      name: names,
      spots: points,
      colorName: colorName,
      backgroundName: backgroundName,
      backgroundPoints: backgroundPoints,
      colorDeleteButton: colorDeleteButton,
    };
    setIds(ids + 1);

    setArrayContainerInfo([...arrayContainerInfo, newObj]);
    showContainerCreateMarker();
    setNames("");
  }

  function deleteContainerInfo(id) {
    let confirm = window.confirm("Deseja realmente deletar esse item?");

    let filtered = arrayContainerInfo.filter((item) => item.id !== id);

    if (confirm === true) {
      setArrayContainerInfo(filtered);
      localStorage.setItem("arrayContainerInfoLocal", JSON.stringify(filtered));
    }
  }

  function moreOnePoint(id) {
    let mapping = arrayContainerInfo.map((item) => {
      if (item.id === id) {
        if (item.spots < 1000) {
          item.spots += 1;
        }
      }
      return item;
    });

    setArrayContainerInfo(mapping);
    localStorage.setItem("arrayContainerInfoLocal", JSON.stringify(mapping));
  }

  function lessOnePoint(id) {
    let mapping = arrayContainerInfo.map((item) => {
      if (item.id === id) {
        if (item.spots > 0) {
          item.spots = item.spots - 1;
        }
      }

      return item;
    });

    setArrayContainerInfo(mapping);
    localStorage.setItem("arrayContainerInfoLocal", JSON.stringify(mapping));
  }

  return (
    <div className="body">
      <article
        style={showContainer ? { display: "flex" } : { display: "none" }}
        className="backgroundContainerCreate"
      >
        <section className="containerCreateMarker">
          <h2>Adicione um novo participante!</h2>

          <input
            type="text"
            maxLength="20"
            placeholder="Digite um nome..."
            value={names}
            onChange={(e) => setNames(e.target.value)}
            autoFocus
          />
          <input
            type="color"
            value={colorName}
            onChange={(e) => setColorName(e.target.value)}
          />
          <input
            type="color"
            value={backgroundName}
            onChange={(e) => setBackgroundName(e.target.value)}
          />
          <input
            type="color"
            value={colorDeleteButton}
            onChange={(e) => setColorDeleteButton(e.target.value)}
          />
          <input
            type="color"
            value={backgroundPoints}
            onChange={(e) => setBackgroundPoints(e.target.value)}
          />

          {names.length > 0 && (
            <PreviewCard
              nameUser={names}
              colorName={colorName}
              backgroundName={backgroundName}
              backgroundPoints={backgroundPoints}
              colorDeleteButton={colorDeleteButton}
            />
          )}

          <div>
            <button onClick={addContainerInfo}>Criar</button>
            <button onClick={showContainerCreateMarker}>Cancelar</button>
          </div>
        </section>
      </article>

      <header>
        <div className="headerContent">
          <h1>Contador de Pontos</h1>
          <button onClick={showContainerCreateMarker}>Adicionar</button>
        </div>
      </header>
      <main className="containerMain">
        {arrayContainerInfo.map((item, index) => (
          <div key={index}>
            <MarkerCard
              index={index}
              item={item}
              deleteContainerInfo={deleteContainerInfo}
              lessOnePoint={lessOnePoint}
              moreOnePoint={moreOnePoint}
              // nameUser={item.name}
              // idButton={item.id}
              // pontos={item.spots}
            />
          </div>

          // <section key={index} className="containerInfo">
          //   <div className="nameAndDeletteButton">
          //     <p className="titleName">{item.name}</p>
          //     <button
          //       className="deleteButton"
          //       onClick={() => deleteContainerInfo(item.id)}
          //     >
          //       <AiFillDelete />
          //     </button>
          //   </div>
          //   <div className="spots">
          //     <button onClick={() => lessOnePoint(item.id)}>
          //       <BsBookmarkDash />
          //     </button>
          //     <span>{item.spots}</span>
          //     <button onClick={() => moreOnePoint(item.id)}>
          //       <BsBookmarkPlus />
          //     </button>
          //   </div>
          // </section>
        ))}
      </main>
    </div>
  );
}
