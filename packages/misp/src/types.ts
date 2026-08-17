// TODO: model the real MISP Event JSON shape (Attributes, Objects, Object
// References, Tags, Galaxies, ...). See the MISP core format docs:
// https://www.misp-project.org/documentation/
export interface MispEvent {
  [key: string]: unknown
}
