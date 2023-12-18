export type Todo = {
  id: number;
  text: string;
};

export type Todos = {
  [Key: string]: Todo[];
};
