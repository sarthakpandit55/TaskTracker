const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getTasks = async () => {
    const res = await fetch(BASE_URL);
    return res.json();
};

export const createTask = async (task) => {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
    });
    return res.json();
};

export const updateTask = async (id, data) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
};

export const deleteTaskApi = async (id) => {
    await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });
};
