export interface Task {
  id: number;
  boardId: number;
  description: string;
  dueDate: string;
  priority: string;
  finished: boolean;
}

export interface TaskData {
  description: string;
  dueDate: string;
  priority: string;
  finished: boolean;
}
