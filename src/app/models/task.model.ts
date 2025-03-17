export interface Task {
  id: number;
  boardId: number;
  description: string;
  dueDate: string;
  priority: string;
}

export interface addTaskData {
  description: string;
  dueDate: string;
  priority: string;
}
