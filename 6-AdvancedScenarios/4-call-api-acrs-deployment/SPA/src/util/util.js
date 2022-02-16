import { deleteTask, postTask, editTask } from '../fetch';

export const callAPI = (options, id) => {
    switch(options["method"]){
        case "POST":
            let task =  JSON.parse(options.body);
            return postTask(task)
                    .then(res => res);
        case "PUT":
            let taskItem =  JSON.parse(options.body);
            let taskId = taskItem["_id"];
            return editTask(taskId, taskItem)
                    .then(res => res)
        case "DELETE":
            return deleteTask(id)
                    .then(res => res);
    }
}