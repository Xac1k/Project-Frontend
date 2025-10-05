import type { Presentation, SelectionElt } from "./store/types";
import { WorkSpace } from "./views/workSpace/WorkSpace";
import HotBar from "./views/toolbar/Toolbar";

const TestPresentation: Presentation = {
  title: "TestMaximalDataSet",
  slides: [
    {
      id: "0",
      background: {
        src: "https://s1.1zoom.me/big3/399/339975-svetik.jpg",
        type: "image",
      },
      slideObjects: [
        {
          type: "text",
          text: "Enter your text",
          font_family: "Courier New",
          font_size: 14,
          x: 0,
          y: 100,
          w: 50,
          h: 100,
          id: "0",
        },
        {
          type: "image",
          x: 100,
          y: 100,
          w: 100,
          h: 100,
          id: "1",
          src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Amur_Leopard_Pittsburgh_Zoo.jpg/1118px-Amur_Leopard_Pittsburgh_Zoo.jpg",
        },
        {
          type: "text",
          text: "Enter your text",
          font_size: 14,
          font_family: "Arial",
          x: 450,
          y: 500,
          w: 100,
          h: 100,
          id: "2",
        },
        {
          type: "text",
          text: "Enter your text",
          font_size: 14,
          font_family: "Arial",
          x: 400,
          y: 500,
          w: 100,
          h: 100,
          id: "3",
        },
        {
          type: "text",
          text: "Enter your text",
          font_size: 14,
          font_family: "Arial",
          x: 300,
          y: 500,
          w: 100,
          h: 100,
          id: "4",
        },
        {
          type: "image",
          x: 200,
          y: 500,
          w: 200,
          h: 500,
          id: "5",
          src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Amur_Leopard_Pittsburgh_Zoo.jpg/1118px-Amur_Leopard_Pittsburgh_Zoo.jpg",
        },
      ],
    },
    {
      id: "1",
      background: { color: "white", type: "color" },
      slideObjects: [
        {
          type: "text",
          text: "Enter your text",
          font_family: "Courier New",
          font_size: 14,
          x: 0,
          y: 100,
          w: 50,
          h: 100,
          id: "0",
        },
      ],
    },
    {
      id: "2",
      background: { color: "white", type: "color" },
      slideObjects: [
        {
          type: "text",
          text: "Enter your text",
          font_family: "Courier New",
          font_size: 14,
          x: 0,
          y: 100,
          w: 50,
          h: 100,
          id: "0",
        },
      ],
    },
    {
      id: "3",
      background: { color: "white", type: "color" },
      slideObjects: [
        {
          type: "text",
          text: "Enter your text",
          font_family: "Courier New",
          font_size: 14,
          x: 0,
          y: 100,
          w: 50,
          h: 100,
          id: "0",
        },
      ],
    },
    {
      id: "4",
      background: { color: "white", type: "color" },
      slideObjects: [
        {
          type: "text",
          text: "Enter your text",
          font_family: "Courier New",
          font_size: 14,
          x: 0,
          y: 100,
          w: 50,
          h: 100,
          id: "0",
        },
      ],
    },
    {
      id: "5",
      background: { color: "white", type: "color" },
      slideObjects: [
        {
          type: "text",
          text: "Enter your text",
          font_family: "Courier New",
          font_size: 14,
          x: 0,
          y: 100,
          w: 50,
          h: 100,
          id: "0",
        },
      ],
    },
    {
      id: "6",
      background: { color: "white", type: "color" },
      slideObjects: [
        {
          type: "text",
          text: "Enter your text",
          font_family: "Courier New",
          font_size: 14,
          x: 0,
          y: 100,
          w: 50,
          h: 100,
          id: "0",
        },
      ],
    },
    {
      id: "7",
      background: { color: "white", type: "color" },
      slideObjects: [
        {
          type: "text",
          text: "Enter your text",
          font_family: "Courier New",
          font_size: 14,
          x: 0,
          y: 100,
          w: 50,
          h: 100,
          id: "0",
        },
      ],
    },
    {
      id: "8",
      background: { color: "white", type: "color" },
      slideObjects: [
        {
          type: "text",
          text: "Enter your text",
          font_family: "Courier New",
          font_size: 14,
          x: 0,
          y: 100,
          w: 50,
          h: 100,
          id: "0",
        },
      ],
    },
    {
      id: "9",
      background: { color: "white", type: "color" },
      slideObjects: [
        {
          type: "text",
          text: "Enter your text",
          font_family: "Courier New",
          font_size: 14,
          x: 0,
          y: 100,
          w: 50,
          h: 100,
          id: "0",
        },
      ],
    },
  ],
  selection: {
    selectedObjectID: [],
    selectedSlideID: ['0', '1', '2'],
  }
};

function App() {
  return (
    <>
      <HotBar></HotBar>
      <WorkSpace selection={TestPresentation.selection} slides={TestPresentation.slides}></WorkSpace>
    </>
  );
}

export default App;

//заменить на json file подтягивать в объект
