import { useEffect, useState } from "react";

import "./styles.css";

import { AiFillDelete } from "react-icons/ai";
import { BsBookmarkDash, BsBookmarkPlus } from "react-icons/bs";

export default function Content() {
  const [names, setNames] = useState("");
  const [points, setPoints] = useState(0);
  //   let points = 0;
  const [ids, setIds] = useState(0);

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
    setShowContainer(!showContainer);
  }

  function addContainerInfo() {
    if (names.length < 1) {
      alert("Digite um nome");
      return;
    }

    const newObj = {
      id: ids,
      name: names,
      spots: points,
    };
    setIds(ids + 1);

    setArrayContainerInfo([...arrayContainerInfo, newObj]);
    setShowContainer(!showContainer);
  }

  function deleteContainerInfo(id) {
    let filtered = arrayContainerInfo.filter((item) => item.id !== id);
    setArrayContainerInfo(filtered);

    localStorage.setItem("arrayContainerInfoLocal", JSON.stringify(filtered));
  }

  function moreOnePoint(id) {
    let mapping = arrayContainerInfo.map((item) => {
      if (item.id === id) {
        item.spots += 1;
      }
      return item;
    });

    setArrayContainerInfo(mapping);
    localStorage.setItem("arrayContainerInfoLocal", JSON.stringify(mapping));
  }
  function lessOnePoint(id) {
    let mapping = arrayContainerInfo.map((item) => {
      if (item.id === id) {
        item.spots = item.spots - 1;
      }
      return item;
    });

    setArrayContainerInfo(mapping);
    localStorage.setItem("arrayContainerInfoLocal", JSON.stringify(mapping));
  }

  return (
    <>
      <article
        style={showContainer ? { display: "flex" } : { display: "none" }}
        className="backgroundContainerCreate"
      >
        <section className="containerCreateMarker">
          <h2>Adicione um novo participante!</h2>

          <input
            type="text"
            placeholder="Digite um nome..."
            value={names}
            onChange={(e) => setNames(e.target.value)}
            autoFocus
          />
          <div>
            <button onClick={addContainerInfo}>Criar</button>
            <button onClick={showContainerCreateMarker}>Cancelar</button>
          </div>
        </section>
      </article>

      <header>
        <h1>Contador de Pontos</h1>
        <button onClick={showContainerCreateMarker}>Adicionar</button>
      </header>
      <main className="container">
        {arrayContainerInfo.map((item, index) => (
          <section key={index} className="containerInfo">
            <div className="nameAndDeletteButton">
              <p className="titleName">{item.name}</p>
              <button
                className="deleteButton"
                onClick={() => deleteContainerInfo(item.id)}
              >
                <AiFillDelete />
              </button>
            </div>
            <div className="spots">
              <button onClick={() => lessOnePoint(item.id)}>
                <BsBookmarkDash />
              </button>
              <span>{item.spots}</span>
              <button onClick={() => moreOnePoint(item.id)}>
                <BsBookmarkPlus />
              </button>
            </div>
          </section>
        ))}
      </main>
    </>
  );
}