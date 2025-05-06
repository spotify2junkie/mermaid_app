export interface GenerateMermaidRequest {
  inputText: string;
  diagramType: 'Structure' | 'Time-Structure' | 'Concept Map';
}

export interface GenerateMermaidResponse {
  mermaidCode: string;
}

export interface ErrorResponse {
  error: string;
}