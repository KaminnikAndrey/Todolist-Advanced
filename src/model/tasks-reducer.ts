import {TasksStateType} from '../App'
import {v1} from "uuid";
import {addTodolistAC, AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
            }
        }

        case 'ADD_TASK': {
            return {
                ...state,
                [action.payload.todolistId]: [{ id: v1(), title: action.payload.title, isDone: false }, ...state[action.payload.todolistId] ]
            }
        }

        case "CHANGE_TASK_STATUS":{
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {...task, isDone: action.payload.newIsDone} : task)
            }
        }
        case "CHANGE_TASK_TITLE":{
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {...task, title: action.payload.title} : task)
            }
        }

        case "ADD-TODOLIST":{
            return {
                ...state,
                [action.payload.todolistId]: []
            }
        }

        case "REMOVE-TODOLIST": {
            const copyState = {...state}
            delete copyState[action.payload.id]
            return copyState
        }

        default:
            throw new Error("I don't understand this type")
    }
}

// Action creators
export const someAC = (todolistId: string) => {
    return {type: '', payload: {}} as const
}

export const removeTaskAC = (payload: {taskId: string, todolistId: string}) => {
    return {
        type: 'REMOVE_TASK', payload: {
            taskId: payload.taskId,
            todolistId: payload.todolistId
        }
    }as const
}

export const addTaskAC = (payload: {title: string, todolistId: string}) => {
    return {
        type: 'ADD_TASK', payload: {
            title: payload.title,
            todolistId: payload.todolistId
        }
    }as const
}

export const changeTaskStatusAC = (payload: {taskId: string, todolistId: string, newIsDone: boolean}) => {
    return {
        type: 'CHANGE_TASK_STATUS', payload: {
            taskId: payload.taskId,
            todolistId: payload.todolistId,
            newIsDone: payload.newIsDone
        }
    }as const
}

export const changeTaskTitleAC = (payload: {taskId: string, todolistId: string, title: string}) => {
    return {
        type: 'CHANGE_TASK_TITLE', payload: {
            taskId: payload.taskId,
            todolistId: payload.todolistId,
            title: payload.title
        }
    }as const
}

// Actions types
export type removeTaskActionType = ReturnType<typeof removeTaskAC>
export type addTaskActionType = ReturnType<typeof addTaskAC>
export type changeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = removeTaskActionType | addTaskActionType | changeTaskStatusActionType | changeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType
