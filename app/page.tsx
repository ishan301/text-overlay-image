"use client";
import styles from "./page.module.css";
import Draggable from "react-draggable";
import { RefObject, useRef, useState } from "react";


export default function Home() {
  const containerRef: RefObject<HTMLDivElement> = useRef(null);
  const [childElements, setChildElements] = useState<JSX.Element[]>([]);
  const currentText = useRef<any | null>(null);
  const [textclicked, setTextClicked] = useState(false);
  const [id, setId] = useState(0);

  function getID():number {
    setId(id+1);
    return id;
  }

  function addText() {
    const container = containerRef.current;
    const newElement = (
      <Draggable
        defaultClassName={styles.child}
        bounds={{ left: 0, right: 1000, top: 0, bottom: 709 }}
        key={getID()}
      >
        <input
        id={`${id}`}
          type="text"
          placeholder="Enter your text"
          onClick={(event) => {            
            currentText.current = event.target;
            setTextClicked(true);             
          }}
          onChange={(event) => {
            currentText.current.style.width = `${Math.max(
              400,
              currentText.current.value.length * 40
            )}px`;
          }}
          style={{
            background: "transparent",
            padding: "1rem",
            fontSize: "3rem",
            fontWeight: "900",
            border: "none",
          }}
        />
      </Draggable>
    );
    
    setChildElements([...childElements, newElement]);    
  }

  function deleteText() {
    setChildElements(childElements.filter(child => child.key != currentText.current.id));
    setTextClicked(false);
  }

  return (
    <>
      <div className={styles.main}>
        <h1 className={styles.desciption}>Text Overlay on Image</h1>
        <div className={styles.image} ref={containerRef} style={{position:'relative'}}>
          {childElements}
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            style={{ padding: "1rem", fontSize: "large", fontWeight: "bold" }}
            onClick={() => addText()}
          >
            Add Text
          </button>
          {textclicked && (
            <button
              style={{
                padding: "1rem",
                fontSize: "large",
                fontWeight: "bold",
                background: "red",
              }}
              onClick={() => deleteText()}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </>
  );
}
