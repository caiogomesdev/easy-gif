type Position = {
  x: number;
  y: number
}

type Size = {
  width: number,
  height: number,
}

export const getCenterPositionAxis =
(image: Size, screen: Size,  scale: number): Position => {
  return {
    x: screen.width/2 - (image.width * scale)/2,
    y: screen.height/2 - (image.height * scale)/2,
  }
}
