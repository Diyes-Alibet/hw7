import {useState} from "react";

function TaskItem({task, onDelete, onUpdateStatus, onUpdateDescription}) {
    const [editMode, setEditMode] = useState(false);
    const [newDescription, setNewDescription] = useState(task.description);

    const handleUpdate = () => {
        onUpdateDescription(newDescription, task.id);
        setEditMode(false);
    };

    return (
        <li>
            <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={(e) => onUpdateStatus(e.target.checked, task.id)}
            />
            {editMode ? (
                <>
                    <input
                        type="text"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                    />
                    <button onClick={handleUpdate}>SAVE</button>
                    <button onClick={() => setEditMode(false)}>CANCEL</button>
                </>
            ) : (
                <>
                    <span className={task.isCompleted ? "completed" : ""}>
                        {task.description}
                    </span>
                    <button onClick={() => setEditMode(true)}>UPDATE</button>
                </>
            )}
            <button onClick={() => onDelete(task.id)}>DELETE</button>
        </li>
    );
}

export default TaskItem;
