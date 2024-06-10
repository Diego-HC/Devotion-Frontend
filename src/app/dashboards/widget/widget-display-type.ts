export enum WidgetDisplayType {
  number = 0,
  numbers = 1,
  verticalBar = 2,
  horizontalBar = 3,
  line = 4,
  pie = 5,
  heatMap = 6,
  gauge = 7
}

export function getDisplayTypeName(displayType: WidgetDisplayType): string {
  return [
    "Número",
    "Números",
    "Barra vertical",
    "Barra horizontal",
    "Línea",
    "Pastel",
    "Mapa de calor",
    "Medidor"
  ][displayType.valueOf()];
}
