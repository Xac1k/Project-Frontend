import type React from "react";
import type { TextPlain } from "../../store/types";

type TextObjectProps = {
  textObject: TextPlain;
  scale: number;
};

export function TextPlain(props: TextObjectProps) {
  const textObj = props.textObject;
  const style: React.CSSProperties = {
    position: `absolute`,
    top: `${textObj.y * props.scale}px`,
    left: `${textObj.x * props.scale}px`,
    width: `${textObj.w * props.scale}px`,
    height: `${textObj.h * props.scale}px`,
    fontFamily: `${textObj.font_family}`,
    fontSize: `${textObj.font_size * props.scale}px`,
  };

  return (
    <div
      style={style}
      onClick={() => {
        console.log("Нажатие на slideObj", textObj.id);
      }}
    >
      {textObj.text}
    </div>
  );
}
