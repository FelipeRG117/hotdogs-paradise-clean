import { VERTICAL_CONFIG } from "@/lib/constants/verticals";

describe("Configuración Inicial", () => {
  it("debe tener 3 verticales definidas", () => {
    expect(Object.keys(VERTICAL_CONFIG)).toEqual(["restaurant", "service", "creative"]);
  });
});